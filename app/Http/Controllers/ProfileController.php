<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status'          => session('status'),
        ]);
    }

    /**
     * Update profile milik user sendiri (name, email).
     *
     * FIX: Ganti fill()+save() → update() agar Eloquent dirty-tracking
     * konsisten dan AuditObserver::updated() selalu terpanggil.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $data = $request->validated();

        // Reset verifikasi email jika email berubah
        if (isset($data['email']) && $data['email'] !== $user->email) {
            $data['email_verified_at'] = null;
        }

        // update() → trigger Eloquent 'updating'+'updated' event → AuditObserver jalan ✅
        $user->update($data);

        return Redirect::route('profile.edit');
    }

    /**
     * Update role user — HANYA boleh dilakukan owner.
     *
     * Dipisah dari update() biasa karena:
     * 1. Butuh otorisasi berbeda (hanya owner)
     * 2. Target user bukan diri sendiri, tapi user lain
     * 3. Field 'role' tidak boleh ikut ProfileUpdateRequest
     */
    public function updateRole(Request $request, User $user): RedirectResponse
    {
        // Hanya owner yang boleh ubah role
        abort_unless(auth()->user()->role === 'owner', 403, 'Hanya Owner yang dapat mengubah role.');

        // Cegah owner mengubah role dirinya sendiri
        abort_if($user->id === auth()->id(), 403, 'Tidak dapat mengubah role akun sendiri.');

        $request->validate([
            'role' => ['required', 'string', 'in:owner,admin,pembukuan'],
        ]);

        // update() memastikan observer updated() terpanggil → masuk audit log ✅
        $user->update(['role' => $request->role]);

        return back()->with('message', "Role {$user->name} berhasil diubah ke {$request->role}.");
    }

    /**
     * Hapus akun user sendiri.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}