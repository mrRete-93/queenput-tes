<?php

namespace App\Http\Controllers;

use App\Models\AppGuest;
use App\Models\Guest;
use App\Models\Pengeluaran;
use App\Services\LaporanPdfBuilder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LaporanController extends Controller
{
    public function __construct(private readonly LaporanPdfBuilder $pdfBuilder)
    {
        //
    }

    public function downloadPdf(Request $request): Response
    {
        $validated = $request->validate([
            'month' => ['nullable', 'integer', 'between:1,12'],
            'year'  => ['nullable', 'integer', 'min:2000', 'max:2099'],
            'start' => ['nullable', 'date_format:Y-m-d'],
            'end'   => ['nullable', 'date_format:Y-m-d', 'after_or_equal:start'],
        ]);

        Carbon::setLocale('id');

        [$guests, $appGuests, $pengeluarans, $judulPeriode] = $this->fetchData($validated);

        $totalPendapatan  = (int) $guests->sum('total_bayar');
        $totalPengeluaran = (int) $pengeluarans->sum('harga');
        $saldoBersih      = $totalPendapatan - $totalPengeluaran;

        $html = $this->pdfBuilder->build(
            judulPeriode    : $judulPeriode,
            guests          : $guests,
            appGuests       : $appGuests,
            pengeluarans    : $pengeluarans,
            totalPendapatan : $totalPendapatan,
            totalPengeluaran: $totalPengeluaran,
            saldoBersih     : $saldoBersih,
        );

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadHTML($html)->setPaper('a4', 'portrait');

        $filename = 'laporan-pembukuan-' . now()->format('Ymd_His') . '.pdf';

        return $pdf->download($filename);
    }

    // -------------------------------------------------------------------------

    /**
     * Ambil data sesuai mode (rentang tanggal atau bulan/tahun).
     *
     * @return array{0: \Illuminate\Support\Collection, 1: \Illuminate\Support\Collection, 2: \Illuminate\Support\Collection, 3: string}
     */
    private function fetchData(array $validated): array
    {
        if (! empty($validated['start']) && ! empty($validated['end'])) {
            return $this->fetchByDateRange($validated['start'], $validated['end']);
        }

        return $this->fetchByMonthYear(
            month: (int) ($validated['month'] ?? now()->month),
            year : (int) ($validated['year']  ?? now()->year),
        );
    }

    private function fetchByDateRange(string $start, string $end): array
    {
        $startDate = Carbon::parse($start)->startOfDay();
        $endDate   = Carbon::parse($end)->endOfDay();

        $judulPeriode = $startDate->isoFormat('D MMMM YYYY') . ' – ' . $endDate->isoFormat('D MMMM YYYY');

        return [
            Guest::whereBetween('created_at', [$startDate, $endDate])->orderBy('created_at')->get(),
            AppGuest::whereBetween('created_at', [$startDate, $endDate])->orderBy('created_at')->get(),
            Pengeluaran::whereBetween('created_at', [$startDate, $endDate])->orderBy('created_at')->get(),
            $judulPeriode,
        ];
    }

    private function fetchByMonthYear(int $month, int $year): array
    {
        $judulPeriode = Carbon::create($year, $month, 1)->isoFormat('MMMM YYYY');

        return [
            Guest::whereMonth('created_at', $month)->whereYear('created_at', $year)->orderBy('created_at')->get(),
            AppGuest::whereMonth('created_at', $month)->whereYear('created_at', $year)->orderBy('created_at')->get(),
            Pengeluaran::whereMonth('created_at', $month)->whereYear('created_at', $year)->orderBy('created_at')->get(),
            $judulPeriode,
        ];
    }
}