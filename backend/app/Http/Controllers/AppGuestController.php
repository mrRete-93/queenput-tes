<?php

namespace App\Http\Controllers;

use App\Models\AppGuest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AppGuestController extends Controller
{
    public function index()
    {
        $guests = AppGuest::latest()->get();

        return Inertia::render('Guest/Index', [
            'guests' => $guests,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nomor_kamar'      => 'nullable|string|max:20',
            'nama_tamu'        => 'required|string|max:255',
            'tanggal_checkin'  => 'nullable|string|max:20',
            'tanggal_checkout' => 'nullable|string|max:20',
            'total_bayar'      => 'nullable|integer|min:0',
            'alamat'           => 'nullable|string|max:255',
            'nik'              => 'nullable|string|max:20',
            'keterangan'       => 'nullable|string',
            'month'            => 'required|integer',
            'year'             => 'required|integer',
        ]);

        $date = Carbon::create(
            $request->year, $request->month,
            now()->day, now()->hour, now()->minute, now()->second
        );

        AppGuest::create([
            'nomor_kamar'      => $validated['nomor_kamar'],
            'nama_tamu'        => $validated['nama_tamu'],
            'tanggal_checkin'  => $validated['tanggal_checkin'],
            'tanggal_checkout' => $validated['tanggal_checkout'],
            'total_bayar'      => $validated['total_bayar'],
            'alamat'           => $validated['alamat'],
            'nik'              => $validated['nik'],
            'keterangan'       => $validated['keterangan'],
            'status'           => 'checkin',
            'created_at'       => $date,
            'updated_at'       => $date,
        ]);

        return redirect()->back();
    }

    public function updateStatus(Request $request, AppGuest $appGuest)
    {
        $request->validate([
            'status' => 'required|in:checkin,checkout',
        ]);

        $appGuest->update(['status' => $request->status]);

        return redirect()->back();
    }

    public function update(Request $request, AppGuest $appGuest)
    {
        $validated = $request->validate([
            'nomor_kamar'      => 'nullable|string|max:20',
            'nama_tamu'        => 'nullable|string|max:255',
            'tanggal_checkin'  => 'nullable|string|max:20',
            'tanggal_checkout' => 'nullable|string|max:20',
            'total_bayar'      => 'nullable|integer|min:0',
            'alamat'           => 'nullable|string|max:255',
            'nik'              => 'nullable|string|max:20',
            'keterangan'       => 'nullable|string',
        ]);

        $appGuest->update($validated);

        return redirect()->back();
    }

    public function destroy(AppGuest $appGuest)
    {
        $appGuest->delete();

        return redirect()->back();
    }
}