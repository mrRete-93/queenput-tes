<?php

namespace App\Http\Controllers;

use App\Models\ActiveShift;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    /**
     * Ambil shift aktif milik user yang sedang login.
     * Juga cek apakah ada shift aktif dari user lain (untuk owner/pantauan).
     */
    public function current()
    {
        $user = auth()->user();

        if ($user->role === 'owner') {
            // Owner bisa lihat semua shift aktif
            $shifts = ActiveShift::with('user')->get()->map(function ($shift) {
                return [
                    'id'      => $shift->id,
                    'name'    => $shift->name,
                    'session' => $shift->session,
                    'date'    => $shift->date,
                    'userId'  => $shift->user_id,
                    'userName'=> $shift->user->name,
                ];
            });
            return response()->json($shifts->first()); // Ambil shift pertama yang aktif
        }

        // Admin hanya lihat shift miliknya sendiri
        $shift = ActiveShift::where('user_id', $user->id)->first();

        if (!$shift) {
            return response()->json(null);
        }

        return response()->json([
            'id'      => $shift->id,
            'name'    => $shift->name,
            'session' => $shift->session,
            'date'    => $shift->date,
            'userId'  => $shift->user_id,
        ]);
    }

    /**
     * Mulai shift baru untuk user yang sedang login.
     */
    public function start(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'session' => 'required|in:Pagi,Siang,Malam',
            'date'    => 'required|date',
        ]);

        // Hapus shift lama milik user ini jika ada
        ActiveShift::where('user_id', auth()->id())->delete();

        $shift = ActiveShift::create([
            'user_id' => auth()->id(),
            'name'    => $validated['name'],
            'session' => $validated['session'],
            'date'    => $validated['date'],
        ]);

        return response()->json([
            'id'      => $shift->id,
            'name'    => $shift->name,
            'session' => $shift->session,
            'date'    => $shift->date,
            'userId'  => $shift->user_id,
        ]);
    }

    /**
     * Akhiri shift aktif milik user yang sedang login.
     */
    public function end()
    {
        ActiveShift::where('user_id', auth()->id())->delete();
        return response()->json(['ok' => true]);
    }
}