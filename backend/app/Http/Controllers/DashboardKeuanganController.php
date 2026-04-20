<?php

namespace App\Http\Controllers;

use App\Models\Guest;
use App\Models\AppGuest;
use Inertia\Inertia;

class DashboardKeuanganController extends Controller
{
    public function index()
    {
        $now       = now();
        $thisMonth = $now->month;
        $thisYear  = $now->year;
        $lastMonth = $now->copy()->subMonth();

        // ── Tamu bulan ini vs bulan lalu (Tetap gabungan keduanya) ──────
        $guestThisMonth = Guest::whereMonth('created_at', $thisMonth)
            ->whereYear('created_at', $thisYear)->count()
            + AppGuest::whereMonth('created_at', $thisMonth)
            ->whereYear('created_at', $thisYear)->count();

        $guestLastMonth = Guest::whereMonth('created_at', $lastMonth->month)
            ->whereYear('created_at', $lastMonth->year)->count()
            + AppGuest::whereMonth('created_at', $lastMonth->month)
            ->whereYear('created_at', $lastMonth->year)->count();

        // ── Keuangan bulan ini vs bulan lalu (Hanya dari tabel Guest) ────
        // sum('nett') pada AppGuest dihapus karena kolomnya sudah tidak ada
        $revenueThisMonth = Guest::whereMonth('created_at', $thisMonth)
            ->whereYear('created_at', $thisYear)->sum('total_bayar');

        $revenueLastMonth = Guest::whereMonth('created_at', $lastMonth->month)
            ->whereYear('created_at', $lastMonth->year)->sum('total_bayar');

        // ── Grafik mingguan (4 minggu terakhir) ──────────────────
        $weeklyGuests = collect(range(3, 0))->map(function ($weeksAgo) {
            $start = now()->startOfWeek()->subWeeks($weeksAgo);
            $end   = $start->copy()->endOfWeek();
            $label = 'Minggu ' . $start->format('d/m');

            $count = Guest::whereBetween('created_at', [$start, $end])->count()
                   + AppGuest::whereBetween('created_at', [$start, $end])->count();

            // Revenue hanya dari Guest reguler
            $revenue = Guest::whereBetween('created_at', [$start, $end])->sum('total_bayar');

            return compact('label', 'count', 'revenue');
        });

        // ── Grafik bulanan (6 bulan terakhir) ────────────────────
        $monthlyData = collect(range(5, 0))->map(function ($monthsAgo) {
            $date  = now()->subMonths($monthsAgo);
            $m     = $date->month;
            $y     = $date->year;
            $label = $date->format('M Y');

            $count = Guest::whereMonth('created_at', $m)->whereYear('created_at', $y)->count()
                   + AppGuest::whereMonth('created_at', $m)->whereYear('created_at', $y)->count();

            // Revenue hanya dari Guest reguler
            $revenue = Guest::whereMonth('created_at', $m)->whereYear('created_at', $y)->sum('total_bayar');

            return compact('label', 'count', 'revenue');
        });

        // ── Tamu hari ini ─────────────────────────────────────────
        $todayGuests = Guest::whereDate('created_at', today())->count()
                     + AppGuest::whereDate('created_at', today())->count();

        // ── Revenue hari ini (Hanya dari Guest reguler) ───────────
        $todayRevenue = Guest::whereDate('created_at', today())->sum('total_bayar');

        return Inertia::render('DashboardKeuangan', [
            'stats' => [
                'guestThisMonth'   => $guestThisMonth,
                'guestLastMonth'   => $guestLastMonth,
                'guestGrowth'      => $guestLastMonth > 0
                    ? round((($guestThisMonth - $guestLastMonth) / $guestLastMonth) * 100, 1)
                    : 0,
                'revenueThisMonth' => $revenueThisMonth,
                'revenueLastMonth' => $revenueLastMonth,
                'revenueGrowth'    => $revenueLastMonth > 0
                    ? round((($revenueThisMonth - $revenueLastMonth) / $revenueLastMonth) * 100, 1)
                    : 0,
                'todayGuests'      => $todayGuests,
                'todayRevenue'     => $todayRevenue,
            ],
            'weeklyGuests' => $weeklyGuests,
            'monthlyData'  => $monthlyData,
        ]);
    }
}