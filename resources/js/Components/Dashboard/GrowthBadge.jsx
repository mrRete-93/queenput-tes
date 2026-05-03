/**
 * Badge persentase pertumbuhan.
 * Menampilkan ▲ hijau (naik), ▼ merah (turun), atau — (tidak ada data / 0).
 */
export default function GrowthBadge({ value }) {
    // Jika bulan lalu tidak ada data, tampilkan netral
    if (value === null || value === undefined) {
        return <span style={{ fontSize: 12, color: '#94a3b8' }}>— Tidak ada data bulan lalu</span>;
    }

    const isUp   = value > 0;
    const isDown = value < 0;
    const isFlat = value === 0;

    const color = isUp ? '#188038' : isDown ? '#d93025' : '#64748b';
    const icon  = isUp ? '▲' : isDown ? '▼' : '▶';

    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color }}>
            <span>{icon}</span>
            <span>{isFlat ? '0%' : `${Math.abs(value)}%`}</span>
        </span>
    );
}