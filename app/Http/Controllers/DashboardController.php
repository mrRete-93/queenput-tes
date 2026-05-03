<?php

namespace App\Http\Controllers;

use App\Models\Pembukuan;
use App\Models\Guest;
use App\Models\AppGuest;
use App\Models\Pengeluaran;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $role = $user->role; // Asumsi field di tabel users adalah 'role'

        // 1. Cek Akses: Jika bukan admin atau owner, kirim data kosong atau blokir
        if (!in_array($role, ['admin', 'owner'])) {
            return Inertia::render('Dashboard/', [
                'files'        => [],
                'currentMonth' => now()->month,
                'currentYear'  => now()->year,
            ]);
        }

        // 2. Query Data: Admin & Owner melihat data yang sama (semua data pembukuan)
        $files = Pembukuan::with('user') // Eager load untuk helper owner name
            ->orderByDesc('year')
            ->orderByDesc('month')
            ->get()
            ->map(fn($p) => $this->formatFromModel($p));

        $now = now();

        return Inertia::render('Dashboard/Index', [
            'files'        => $files,
            'currentMonth' => $now->month,
            'currentYear'  => $now->year,
        ]);
    }

    public function createFile(Request $request)
    {
        $user = Auth::user();
        
        // Proteksi tambahan: Hanya admin/owner yang bisa buat
        if (!in_array($user->role, ['admin', 'owner'])) {
            abort(403, 'Hanya Admin atau Owner yang dapat membuat buku.');
        }

        $request->validate([
            'month'   => 'required|integer|min:1|max:12',
            'year'    => 'required|integer|min:2020|max:2099',
            'name'    => 'nullable|string|max:100',
            'catatan' => 'nullable|string|max:500',
            'status'  => 'nullable|in:aktif,selesai',
        ]);

        $month = $request->month;
        $year  = $request->year;
        $date  = Carbon::create($year, $month, 1);

        $name = $request->filled('name')
            ? $request->name
            : 'Pembukuan_' . $date->translatedFormat('F') . "_{$year}";

        // Cek duplikat secara global (karena admin & owner berbagi database yang sama)
        $exists = Pembukuan::where('month', $month)
            ->where('year', $year)
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'month' => "Buku untuk {$date->translatedFormat('F')} {$year} sudah ada.",
            ]);
        }

        Pembukuan::create([
            'user_id' => $user->id,
            'name'    => $name,
            'month'   => $month,
            'year'    => $year,
            'status'  => $request->input('status', 'aktif'),
            'catatan' => $request->input('catatan'),
        ]);

        return redirect()->route('dashboard.index')->with('message', 'Buku berhasil dibuat.');
    }

    public function updateFile(Request $request, Pembukuan $pembukuan)
    {
        // Izinkan jika user adalah admin atau owner
        if (!in_array(Auth::user()->role, ['admin', 'owner'])) {
            abort(403);
        }

        $request->validate([
            'name'    => 'required|string|max:100',
            'catatan' => 'nullable|string|max:500',
            'status'  => 'nullable|in:aktif,selesai',
        ]);

        $pembukuan->update($request->only('name', 'catatan', 'status'));

        return redirect()->route('dashboard.index')->with('message', 'Buku berhasil diperbarui.');
    }

    public function deleteFile(Request $request)
    {
        if (!in_array(Auth::user()->role, ['admin', 'owner'])) {
            abort(403);
        }

        $request->validate([
            'month' => 'required|integer|min:1|max:12',
            'year'  => 'required|integer|min:2020|max:2099',
        ]);

        $month = $request->month;
        $year  = $request->year;

        DB::transaction(function () use ($month, $year) {
            // Hapus pembukuan bulan tersebut (milik siapapun karena admin/owner shared)
            Pembukuan::where('month', $month)
                ->where('year', $year)
                ->delete();

            Guest::whereMonth('created_at', $month)->whereYear('created_at', $year)->delete();
            AppGuest::whereMonth('created_at', $month)->whereYear('created_at', $year)->delete();
            Pengeluaran::whereMonth('created_at', $month)->whereYear('created_at', $year)->delete();
        });

        return redirect()->route('dashboard.index')->with('message', 'Buku berhasil dihapus.');
    }

    private function formatFromModel(Pembukuan $p): array
    {
        return [
            'id'       => $p->id,
            'slug'     => "{$p->year}-{$p->month}",
            'name'     => $p->name,
            'month'    => $p->month,
            'year'     => $p->year,
            // Menampilkan nama pembuat asli (bisa Admin atau Owner)
            'owner'    => $p->user->name ?? 'System', 
            'status'   => $p->status,
            'catatan'  => $p->catatan,
            'is_empty' => false,
        ];
    }
}