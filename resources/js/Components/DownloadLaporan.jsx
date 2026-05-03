import { useState } from "react";
import { router } from "@inertiajs/react";

/**
 * DownloadLaporan — tombol download PDF laporan pembukuan.
 *
 * Props:
 *   mode: 'bulan' | 'range'
 *   month, year  → untuk mode bulan (default: bulan aktif)
 *   start, end   → untuk mode range (format: YYYY-MM-DD)
 *
 * Cara pakai di halaman Guest/Index:
 *   <DownloadLaporan mode="bulan" month={selectedMonth} year={selectedYear} />
 */
export default function DownloadLaporan({ mode = "bulan", month, year, start, end }) {
    const [loading, setLoading] = useState(false);
    const [modeAktif, setModeAktif] = useState(mode);

    // State untuk custom range
    const [rangeStart, setRangeStart] = useState(start ?? "");
    const [rangeEnd, setRangeEnd] = useState(end ?? "");

    const handleDownload = () => {
        setLoading(true);

        // Bangun query params sesuai mode
        const params =
            modeAktif === "bulan"
                ? { month, year }
                : { start: rangeStart, end: rangeEnd };

        // Buka URL download di tab baru agar tidak mengganggu halaman
        const url = route("laporan.pdf") + "?" + new URLSearchParams(params).toString();
        window.open(url, "_blank");

        // Reset loading setelah jeda (PDF butuh waktu generate)
        setTimeout(() => setLoading(false), 2000);
    };

    const isValid =
        modeAktif === "bulan"
            ? Boolean(month && year)
            : Boolean(rangeStart && rangeEnd && rangeStart <= rangeEnd);

    return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Toggle mode */}
        <select
            value={modeAktif}
            onChange={e => setModeAktif(e.target.value)}
            style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: '1px solid #d1d5db' }}
        >
            <option value="bulan">Bulan ini</option>
            <option value="range">Custom range</option>
        </select>

        {/* Input range jika mode range */}
        {modeAktif === 'range' && (
            <>
                <input type="date" value={rangeStart} onChange={e => setRangeStart(e.target.value)}
                    style={{ fontSize: 12, padding: '4px 6px', borderRadius: 6, border: '1px solid #d1d5db' }} />
                <span style={{ fontSize: 12, color: '#6b7280' }}>–</span>
                <input type="date" value={rangeEnd} min={rangeStart} onChange={e => setRangeEnd(e.target.value)}
                    style={{ fontSize: 12, padding: '4px 6px', borderRadius: 6, border: '1px solid #d1d5db' }} />
            </>
        )}

        {/* Tombol download */}
        <button
            onClick={handleDownload}
            disabled={!isValid || loading}
            style={{
                fontSize: 12, padding: '5px 14px', borderRadius: 6, border: 'none',
                background: isValid && !loading ? '#2563eb' : '#e5e7eb',
                color: isValid && !loading ? '#fff' : '#9ca3af',
                cursor: isValid && !loading ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', gap: 5,
            }}
        >
            {loading ? '⏳ Loading...' : '⬇ Cetak PDF'}
        </button>
    </div>
);
}