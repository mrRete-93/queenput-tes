<?php

namespace App\Services;

use Illuminate\Support\Collection;

/**
 * Membangun dokumen HTML siap render DomPDF.
 *
 * - Pendapatan reguler : rekap per hari (tanggal | hari | jml tamu | total)
 * - Tamu OTA           : rekap per hari (tanggal | nama tamu | platform | PAH | prepaid), diberi jarak antar hari
 * - Pengeluaran        : per item + kolom shift admin
 */
class LaporanPdfBuilder
{
    private string $namaHotel;
    private string $alamat;

    public function __construct()
    {
        $this->namaHotel = config('app.hotel_nama', 'Nama Hotel');
        $this->alamat    = config('app.hotel_alamat', 'Alamat Hotel');
    }

    // ── Entry Point ───────────────────────────────────────────────────────────

    public function build(
        string     $judulPeriode,
        Collection $guests,
        Collection $appGuests,
        Collection $pengeluarans,
        int        $totalPendapatan,
        int        $totalPengeluaran,
        int        $saldoBersih,
    ): string {
        $dicetak    = now()->isoFormat('D MMMM YYYY, HH:mm') . ' WIB';
        $saldoColor = $saldoBersih >= 0 ? '#16a34a' : '#dc2626';

        // Rekap guest reguler per hari
        $rekapHarian = $guests
            ->groupBy(fn($g) => $g->created_at->format('Y-m-d'))
            ->map(fn($group) => [
                'tanggal' => $group->first()->created_at->copy(),
                'jumlah'  => $group->count(),
                'total'   => (int) $group->sum('total_bayar'),
            ])
            ->sortKeys()
            ->values();

        // OTA dikelompokkan per hari input (created_at)
        // tanggal_checkin ditampilkan apa adanya sebagai teks (tidak di-parse)
        $otaPerHari = $appGuests
            ->groupBy(fn($ag) => $ag->created_at->format('Y-m-d'))
            ->sortKeys();

        return <<<HTML
        <!DOCTYPE html>
        <html lang="id">
        <head><meta charset="UTF-8"><style>{$this->css()}</style></head>
        <body>

        {$this->renderHeader()}
        {$this->renderJudul($judulPeriode)}
        {$this->renderRekap($totalPendapatan, $totalPengeluaran, $saldoBersih, $saldoColor)}

        {$this->renderSeksi('Rekapitulasi Pendapatan Harian', $rekapHarian->count(), 'hari')}
        {$this->renderTabelHarian($rekapHarian, $totalPendapatan)}

        {$this->renderSeksi('Tamu OTA / Platform', $appGuests->count())}
        {$this->renderTabelOta($otaPerHari)}

        {$this->renderSeksi('Pengeluaran', $pengeluarans->count(), 'item')}
        {$this->renderTabelPengeluaran($pengeluarans, $totalPengeluaran)}

        {$this->renderFooter($dicetak)}

        </body>
        </html>
        HTML;
    }

    // ── Renderers ─────────────────────────────────────────────────────────────

    private function renderHeader(): string
    {
        $logo = $this->logoTag();
        return <<<HTML
        <div class="dh">
            <table style="width:100%;border-spacing:0"><tr>
                <td style="width:44px;vertical-align:middle">{$logo}</td>
                <td style="vertical-align:middle;padding-left:10px">
                    <div class="hn">{$this->namaHotel}</div>
                    <div class="ha">{$this->alamat}</div>
                </td>
                <td style="text-align:right;vertical-align:bottom">
                    <div style="font-size:7px;color:#94a3b8;text-transform:uppercase;letter-spacing:.6px">Laporan Keuangan</div>
                </td>
            </tr></table>
        </div>
        HTML;
    }

    private function renderJudul(string $judulPeriode): string
    {
        return <<<HTML
        <div class="jd">
            <div class="jd-title">Laporan Pembukuan</div>
            <div class="jd-sub">Periode: {$judulPeriode}</div>
        </div>
        HTML;
    }

    private function renderRekap(int $totalPendapatan, int $totalPengeluaran, int $saldoBersih, string $saldoColor): string
    {
        $fmt = $this->fmt(...);
        return <<<HTML
        <table class="rk"><tr>
            <td class="rk-cell">
                <div class="lbl">&#8593; Total Pendapatan</div>
                <div class="val" style="color:#1d4ed8">{$fmt($totalPendapatan)}</div>
            </td>
            <td class="rk-divider"></td>
            <td class="rk-cell">
                <div class="lbl">&#8595; Total Pengeluaran</div>
                <div class="val" style="color:#dc2626">{$fmt($totalPengeluaran)}</div>
            </td>
            <td class="rk-divider"></td>
            <td class="rk-cell rk-saldo">
                <div class="lbl">&#9654; Saldo Bersih</div>
                <div class="val" style="color:{$saldoColor}">{$fmt($saldoBersih)}</div>
            </td>
        </tr></table>
        HTML;
    }

    private function renderSeksi(string $judul, int $count, string $satuan = 'tamu'): string
    {
        return <<<HTML
        <table class="sc"><tr>
            <td style="font-weight:bold">{$judul}</td>
            <td style="text-align:right;font-weight:normal;font-size:7.5px;opacity:.85">{$count} {$satuan}</td>
        </tr></table>
        HTML;
    }

    /** Rekap reguler: 1 baris = 1 hari */
    private function renderTabelHarian(Collection $rekapHarian, int $totalPendapatan): string
    {
        $fmt  = $this->fmt(...);
        $rows = '';

        if ($rekapHarian->isEmpty()) {
            $rows = '<tr><td colspan="5" class="c empty">Tidak ada data pada periode ini</td></tr>';
        }

        foreach ($rekapHarian as $i => $data) {
            /** @var \Carbon\Carbon $tgl */
            $tgl       = $data['tanggal'];
            $isWeekend = $tgl->isWeekend();
            $hariStyle = $isWeekend ? 'color:#dc2626;font-weight:bold' : '';

            $rows .= '<tr style="background:' . $this->rowBg($i) . '">'
                . '<td class="c">' . ($i + 1) . '</td>'
                . '<td>' . $tgl->isoFormat('D MMMM YYYY') . '</td>'
                . '<td style="' . $hariStyle . '">' . $tgl->isoFormat('dddd') . '</td>'
                . '<td class="c">' . $data['jumlah'] . ' tamu</td>'
                . '<td class="r bold">' . $fmt($data['total']) . '</td>'
                . '</tr>';
        }

        $rows .= '<tr class="tr">'
            . '<td colspan="3" class="r">Total Pendapatan Reguler Bulan Ini</td>'
            . '<td class="c">—</td>'
            . '<td class="r">' . $fmt($totalPendapatan) . '</td>'
            . '</tr>';

        return <<<HTML
        <table class="dt">
            <thead><tr>
                <th class="c" style="width:22px">#</th>
                <th>Tanggal</th>
                <th style="width:65px">Hari</th>
                <th class="c" style="width:55px">Jml Tamu</th>
                <th class="r" style="width:90px">Total Pendapatan</th>
            </tr></thead>
            <tbody>{$rows}</tbody>
        </table>
        HTML;
    }

    /**
     * Tabel OTA: dikelompokkan per hari input (created_at).
     * Setiap hari diberi baris header tanggal + jarak visual.
     * Kolom: # | Nama Tamu | Platform | PAH | Prepaid
     */
    private function renderTabelOta(Collection $otaPerHari): string
    {
        $fmt = $this->fmt(...);

        if ($otaPerHari->isEmpty()) {
            return <<<HTML
            <table class="dt">
                <thead><tr>
                    <th class="c" style="width:22px">#</th>
                    <th class="c" style="width:55px">Tgl Check-in</th>
                    <th>Nama Tamu</th>
                    <th class="c" style="width:55px">Platform</th>
                    <th class="r" style="width:75px">PAH</th>
                    <th class="r" style="width:75px">Prepaid</th>
                </tr></thead>
                <tbody>
                    <tr><td colspan="6" class="c empty">Tidak ada data tamu OTA</td></tr>
                </tbody>
            </table>
            HTML;
        }

        $rows  = '';
        $noGlobal = 1;

        foreach ($otaPerHari as $tglStr => $group) {
            $tgl       = \Carbon\Carbon::parse($tglStr);
            $isWeekend = $tgl->isWeekend();
            $hariWarna = $isWeekend ? '#dc2626' : '#1e40af';

            // Baris header per hari
            $rows .= '<tr class="ota-day-header">'
                . '<td colspan="6">'
                . '<span style="color:' . $hariWarna . ';font-weight:bold">'
                . $tgl->isoFormat('dddd, D MMMM YYYY')
                . '</span>'
                . ' <span style="color:#94a3b8;font-size:7px">(' . $group->count() . ' tamu)</span>'
                . '</td>'
                . '</tr>';

            // Baris tiap tamu dalam hari ini
            foreach ($group as $i => $ag) {
                $pah     = (int) ($ag->pah     ?? 0);
                $prepaid = (int) ($ag->prepaid ?? 0);

                $rows .= '<tr style="background:' . $this->rowBg($i) . '">'
                    . '<td class="c">' . $noGlobal . '</td>'
                    . '<td class="c">' . e($ag->tanggal_checkin ?? '-') . '</td>'
                    . '<td>' . e($ag->nama_tamu) . '</td>'
                    . '<td class="c">' . e($ag->platform ?? '-') . '</td>'
                    . '<td class="r">' . ($pah     > 0 ? $fmt($pah)     : '<span style="color:#cbd5e1">—</span>') . '</td>'
                    . '<td class="r">' . ($prepaid > 0 ? $fmt($prepaid) : '<span style="color:#cbd5e1">—</span>') . '</td>'
                    . '</tr>';
                $noGlobal++;
            }

            // Subtotal per hari
            $subPah     = (int) $group->sum('pah');
            $subPrepaid = (int) $group->sum('prepaid');
            $rows .= '<tr class="ota-subtotal">'
                . '<td colspan="4" class="r">Subtotal ' . $tgl->isoFormat('D MMM') . '</td>'
                . '<td class="r">' . $fmt($subPah) . '</td>'
                . '<td class="r">' . $fmt($subPrepaid) . '</td>'
                . '</tr>';

            // Baris jarak antar hari
            $rows .= '<tr class="ota-spacer"><td colspan="6"></td></tr>';
        }

        // Grand total
        $grandPah     = (int) $otaPerHari->flatten()->sum('pah');
        $grandPrepaid = (int) $otaPerHari->flatten()->sum('prepaid');
        $rows .= '<tr class="tr">'
            . '<td colspan="4" class="r">Total OTA Bulan Ini</td>'
            . '<td class="r">' . $fmt($grandPah) . '</td>'
            . '<td class="r">' . $fmt($grandPrepaid) . '</td>'
            . '</tr>';

        return <<<HTML
        <table class="dt">
            <thead><tr>
                <th class="c" style="width:22px">#</th>
                <th class="c" style="width:55px">Tgl Check-in</th>
                <th>Nama Tamu</th>
                <th class="c" style="width:55px">Platform</th>
                <th class="r" style="width:75px">PAH</th>
                <th class="r" style="width:75px">Prepaid</th>
            </tr></thead>
            <tbody>{$rows}</tbody>
        </table>
        HTML;
    }

    /** Pengeluaran: per item + kolom shift admin */
    private function renderTabelPengeluaran(Collection $pengeluarans, int $totalPengeluaran): string
    {
        $fmt  = $this->fmt(...);
        $rows = '';

        if ($pengeluarans->isEmpty()) {
            $rows = '<tr><td colspan="6" class="c empty">Tidak ada data pengeluaran</td></tr>';
        }

        foreach ($pengeluarans as $i => $p) {
            $rows .= '<tr style="background:' . $this->rowBg($i) . '">'
                . '<td class="c">' . ($i + 1) . '</td>'
                . '<td class="c">' . $p->created_at->isoFormat('D MMM YYYY') . '</td>'
                . '<td>' . e($p->nama_barang ?? '-') . '</td>'
                . '<td>' . e($p->keterangan ?? '-') . '</td>'
                . '<td class="c">' . e($p->shift_admin ?? '-') . '</td>'
                . '<td class="r">' . $fmt((int) $p->harga) . '</td>'
                . '</tr>';
        }

        $rows .= '<tr class="tr">'
            . '<td colspan="5" class="r">Total Pengeluaran</td>'
            . '<td class="r">' . $fmt($totalPengeluaran) . '</td>'
            . '</tr>';

        return <<<HTML
        <table class="dt">
            <thead><tr>
                <th class="c" style="width:20px">#</th>
                <th class="c" style="width:65px">Tanggal</th>
                <th style="width:90px">Nama Barang</th>
                <th>Keterangan</th>
                <th class="c" style="width:55px">Shift Admin</th>
                <th class="r" style="width:80px">Harga</th>
            </tr></thead>
            <tbody>{$rows}</tbody>
        </table>
        HTML;
    }

    private function renderFooter(string $dicetak): string
    {
        return <<<HTML
        <div class="df">
            <table style="width:100%;border-spacing:0"><tr>
                <td style="vertical-align:bottom">
                    <div style="font-size:7px;color:#94a3b8">Dicetak: {$dicetak}</div>
                    <div style="font-size:7px;color:#94a3b8">{$this->namaHotel} &mdash; Sistem Pembukuan</div>
                </td>
                <td style="width:130px;text-align:center;vertical-align:bottom">
                    <div style="font-size:8px">Mengetahui,</div>
                    <div style="margin:32px auto 3px;width:110px;border-top:1px solid #374151"></div>
                    <div style="font-size:8px;font-weight:bold">Pimpinan / Owner</div>
                </td>
            </tr></table>
        </div>
        HTML;
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private function fmt(int $n): string
    {
        return 'Rp ' . number_format($n, 0, ',', '.');
    }

    private function rowBg(int $i): string
    {
        return $i % 2 === 0 ? '#ffffff' : '#f8fafc';
    }

    private function logoTag(): string
    {
        $logoPath = public_path('images/logo.png');
        if (! file_exists($logoPath) || ! extension_loaded('gd')) return '';
        $b64 = base64_encode(file_get_contents($logoPath));
        return '<img src="data:image/png;base64,' . $b64 . '" style="width:38px;height:38px;object-fit:contain">';
    }

    // ── CSS ───────────────────────────────────────────────────────────────────

    private function css(): string
    {
        return <<<CSS
        @page { margin: 1cm 1.2cm; }
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 8.5px;
            color: #1e293b;
            line-height: 1.45;
        }

        thead { display: table-header-group; }

        /* ── Header ── */
        .dh { border-bottom: 2px solid #1e40af; padding-bottom: 8px; margin-bottom: 10px; }
        .hn { font-size: 13px; font-weight: bold; color: #1e40af; }
        .ha { font-size: 7.5px; color: #64748b; margin-top: 1px; }

        /* ── Judul ── */
        .jd { text-align: center; margin-bottom: 12px; }
        .jd-title { font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; }
        .jd-sub { font-size: 8px; color: #64748b; margin-top: 2px; }

        /* ── Rekap ── */
        .rk { width: 100%; border-collapse: collapse; margin-bottom: 14px; border: 1px solid #e2e8f0; border-radius: 6px; }
        .rk-cell { padding: 8px 14px; width: 33%; vertical-align: middle; }
        .rk-saldo { background: #f0fdf4; }
        .rk-divider { width: 1px; background: #e2e8f0; padding: 0; }
        .lbl { font-size: 7px; color: #64748b; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 2px; }
        .val { font-size: 11px; font-weight: bold; }

        /* ── Seksi label ── */
        .sc { width: 100%; border-collapse: collapse; background: #1e40af; color: #fff; font-size: 8.5px; border-radius: 4px 4px 0 0; margin-top: 8px; }
        .sc td { padding: 4px 8px; }

        /* ── Tabel data ── */
        table.dt { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
        table.dt th {
            background: #eff6ff; font-size: 7.5px; font-weight: bold;
            padding: 4px 6px; text-align: left;
            border-top: 1px solid #bfdbfe; border-bottom: 1.5px solid #bfdbfe;
            color: #1e3a8a;
        }
        table.dt td { font-size: 8px; padding: 3.5px 6px; border-bottom: 0.5px solid #f1f5f9; vertical-align: middle; }

        .r    { text-align: right; }
        .c    { text-align: center; }
        .bold { font-weight: bold; }
        .empty { color: #94a3b8; padding: 10px; font-style: italic; }

        /* ── Baris total ── */
        .tr td { background: #dbeafe !important; font-weight: bold; border-top: 1.5px solid #93c5fd; padding: 4px 6px; }

        /* ── OTA per hari ── */
        .ota-day-header td {
            background: #f1f5f9;
            padding: 5px 6px;
            border-top: 2px solid #cbd5e1;
            border-bottom: 1px solid #e2e8f0;
            font-size: 8px;
        }
        .ota-subtotal td {
            background: #fefce8;
            font-weight: bold;
            font-size: 7.5px;
            padding: 3px 6px;
            border-top: 1px solid #fde68a;
            border-bottom: 1px solid #fde68a;
            color: #92400e;
        }
        .ota-spacer td { height: 6px; background: #ffffff; border: none; }

        /* ── Footer ── */
        .df { margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 10px; }
        CSS;
    }
}