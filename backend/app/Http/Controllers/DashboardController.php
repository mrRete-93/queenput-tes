<?php

namespace App\Http\Controllers;

use App\Models\Guest;
use App\Models\AppGuest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $regularMonths = DB::table('guests')
            ->select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('YEAR(created_at) as year')
            );

        $files = DB::table('app_guests')
            ->select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('YEAR(created_at) as year')
            )
            ->union($regularMonths)
            ->get()
            ->unique(fn($item) => $item->year . $item->month)
            ->sortByDesc(fn($item) => $item->year . sprintf('%02d', $item->month))
            ->values()
            ->map(fn($item) => $this->formatFile($item->month, $item->year));

        // Selalu tampilkan bulan sekarang jika belum ada
        $now = now();
        $currentExists = $files->contains(fn($f) => $f['month'] == $now->month && $f['year'] == $now->year);
        
        if (!$currentExists) {
            $files->prepend($this->formatFile($now->month, $now->year, true));
        }

        return Inertia::render('Dashboard', [
            'files' => $files,
            'currentMonth' => $now->month,
            'currentYear'  => $now->year,
        ]);
    }

    /**
     * Buat "file" baru (entry dummy agar bulan baru muncul di dashboard).
     * Karena tidak ada tabel files, kita cukup redirect ke guest.index bulan tsb.
     */
    public function createFile(Request $request)
    {
        $request->validate([
            'month' => 'required|integer|min:1|max:12',
            'year'  => 'required|integer|min:2020|max:2099',
        ]);

        // Redirect langsung ke sheet bulan yang dipilih
        return redirect()->route('guest.index', [
            'month' => $request->month,
            'year'  => $request->year,
        ]);
    }

    private function formatFile(int $month, int $year, bool $isEmpty = false): array
    {
        $date = Carbon::create($year, $month, 1);
        return [
            'id'          => "{$year}-{$month}",
            'name'        => "Pembukuan_" . $date->translatedFormat('F') . "_{$year}",
            'month'       => $month,
            'year'        => $year,
            'owner'       => 'saya',
            'last_opened' => $isEmpty ? 'Belum ada data' : $date->format('d M Y'),
            'is_empty'    => $isEmpty,
        ];
    }
}