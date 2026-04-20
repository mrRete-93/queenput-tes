<?php

namespace App\Http\Controllers;

use App\Models\Guest;
use App\Models\AppGuest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class GuestController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->input('month', now()->month);
        $year  = $request->input('year', now()->year);

        $guests = Guest::whereMonth('created_at', $month)
                    ->whereYear('created_at', $year)
                    ->latest()->get();

        $appGuests = AppGuest::whereMonth('created_at', $month)
                    ->whereYear('created_at', $year)
                    ->latest()->get();

        return Inertia::render('Guest/Index', [
            'guests'        => $guests,
            'appGuests'     => $appGuests,
            'selectedMonth' => (int)$month,
            'selectedYear'  => (int)$year,
            'sheetTitle'    => Carbon::create($year, $month, 1)->translatedFormat('F Y'),
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

        Guest::create([
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

        return redirect()->back()->with('message', 'Data berhasil ditambahkan.');
    }

    public function updateStatus(Request $request, Guest $guest)
    {
        $request->validate([
            'status' => 'required|in:checkin,checkout',
        ]);

        $guest->update(['status' => $request->status]);

        return redirect()->back();
    }

    public function update(Request $request, Guest $guest)
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

    $guest->update($validated);

    return redirect()->back();
}

    public function destroy(Guest $guest)
    {
        $guest->delete();

        return redirect()->back();
    }
}