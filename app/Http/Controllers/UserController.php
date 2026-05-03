<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class UserController extends Controller implements HasMiddleware
{
    /**
     * Hanya owner yang bisa kelola role user.
     */
    public static function middleware(): array
    {
        return [
            new Middleware(function ($request, $next) {
                if (!auth()->check() || auth()->user()->role !== 'owner') {
                    abort(403, 'Hanya Owner yang dapat mengubah role.');
                }
                return $next($request);
            }),
        ];
    }

    /**
     * Tampilkan daftar user beserta role-nya.
     */
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'role', 'created_at')
            ->orderBy('name')
            ->get();

        return Inertia::render('User/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Update role user.
     *
     * PENTING: Gunakan $user->update() bukan $user->role = ...; $user->save()
     * karena Eloquent hanya menembakkan event 'updated' (yang ditangkap
     * AuditObserver) jika ada perubahan yang di-track lewat fill/update.
     *
     * $user->update() → isDirty() = true → observer updated() terpanggil ✅
     */
    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => ['required', 'string', 'in:owner,admin,pembukuan'],
        ]);

        // Cegah owner mengubah role dirinya sendiri
        if ($user->id === auth()->id()) {
            return back()->withErrors(['role' => 'Tidak dapat mengubah role akun sendiri.']);
        }

        // update() memastikan Eloquent dirty-tracking aktif → observer terpanggil
        $user->update(['role' => $request->role]);

        return back()->with('message', "Role {$user->name} berhasil diubah ke {$request->role}.");
    }
}