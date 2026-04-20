import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const formatRp = (val) => {
    if (!val) return 'Rp 0';
    if (val >= 1_000_000) return 'Rp ' + (val / 1_000_000).toFixed(1) + ' jt';
    return 'Rp ' + Number(val).toLocaleString('id-ID');
};

const GrowthBadge = ({ value }) => {
    const up = value >= 0;
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 3,
            fontSize: 12, fontWeight: 600,
            color: up ? '#188038' : '#d93025',
            background: up ? '#e6f4ea' : '#fce8e6',
            padding: '2px 8px', borderRadius: 10,
        }}>
            {up ? '▲' : '▼'} {Math.abs(value)}%
        </span>
    );
};

// Mini bar chart (pure CSS/SVG)
const BarChart = ({ data, valueKey, color = '#1a73e8', height = 100 }) => {
    const max = Math.max(...data.map(d => d[valueKey]), 1);
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height, paddingTop: 8 }}>
            {data.map((d, i) => {
                const pct = (d[valueKey] / max) * 100;
                return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{ fontSize: 9, color: '#80868b', fontWeight: 600 }}>
                            {d[valueKey] > 0 ? d[valueKey] : ''}
                        </div>
                        <div style={{
                            width: '100%',
                            height: `${Math.max(pct, 2)}%`,
                            background: color,
                            borderRadius: '3px 3px 0 0',
                            transition: 'height .4s ease',
                            opacity: i === data.length - 1 ? 1 : 0.55 + (i / data.length) * 0.45,
                        }} />
                        <div style={{ fontSize: 9, color: '#9aa0a6', textAlign: 'center', lineHeight: 1.2 }}>
                            {d.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default function DashboardKeuangan({ auth, stats, weeklyGuests, monthlyData }) {
    const cards = [
        {
            label: 'Tamu Hari Ini',
            value: stats.todayGuests,
            sub: 'orang',
            icon: '🏠',
            color: '#1a73e8',
            bg: '#e8f0fe',
        },
        {
            label: 'Pemasukan Hari Ini',
            value: formatRp(stats.todayRevenue),
            sub: 'total masuk',
            icon: '💵',
            color: '#188038',
            bg: '#e6f4ea',
        },
        {
            label: 'Tamu Bulan Ini',
            value: stats.guestThisMonth,
            sub: <GrowthBadge value={stats.guestGrowth} />,
            icon: '📅',
            color: '#e37400',
            bg: '#fef3e2',
        },
        {
            label: 'Revenue Bulan Ini',
            value: formatRp(stats.revenueThisMonth),
            sub: <GrowthBadge value={stats.revenueGrowth} />,
            icon: '📈',
            color: '#9334e6',
            bg: '#f3e8fd',
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Keuangan" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Roboto+Mono:wght@500&display=swap');

                .dash { padding: 24px 20px; font-family: 'Google Sans', sans-serif; }

                .dash-header { margin-bottom: 24px; }
                .dash-title { font-size: 22px; font-weight: 600; color: #202124; letter-spacing: -.3px; }
                .dash-sub { font-size: 13px; color: #80868b; margin-top: 2px; }

                .cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
                @media (max-width: 900px) { .cards { grid-template-columns: repeat(2, 1fr); } }

                .card {
                    background: #fff; border-radius: 12px;
                    padding: 18px 20px;
                    border: 1px solid #e0e0e0;
                    box-shadow: 0 1px 3px rgba(0,0,0,.05);
                    transition: box-shadow .2s, transform .2s;
                }
                .card:hover { box-shadow: 0 4px 12px rgba(0,0,0,.1); transform: translateY(-1px); }
                .card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
                .card-icon {
                    width: 40px; height: 40px; border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 18px;
                }
                .card-label { font-size: 12px; font-weight: 500; color: #80868b; letter-spacing: .2px; }
                .card-value {
                    font-size: 26px; font-weight: 700; color: #202124;
                    font-family: 'Roboto Mono', monospace;
                    letter-spacing: -1px; line-height: 1.1; margin-bottom: 6px;
                }
                .card-sub { font-size: 12px; color: #80868b; }

                .charts { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
                @media (max-width: 900px) { .charts { grid-template-columns: 1fr; } }

                .chart-card {
                    background: #fff; border-radius: 12px;
                    padding: 20px; border: 1px solid #e0e0e0;
                    box-shadow: 0 1px 3px rgba(0,0,0,.05);
                }
                .chart-title { font-size: 14px; font-weight: 600; color: #202124; margin-bottom: 4px; }
                .chart-sub { font-size: 12px; color: #80868b; margin-bottom: 16px; }

                .compare-row {
                    display: flex; gap: 14px;
                }
                .compare-box {
                    flex: 1; border-radius: 10px; padding: 16px;
                    display: flex; flex-direction: column; gap: 6px;
                }
                .compare-label { font-size: 11px; font-weight: 600; color: #80868b; text-transform: uppercase; letter-spacing: .5px; }
                .compare-val { font-size: 20px; font-weight: 700; font-family: 'Roboto Mono', monospace; letter-spacing: -.5px; }
                .compare-period { font-size: 11px; color: #9aa0a6; }
            `}</style>

            <div className="dash">
                <div className="dash-header">
                    <div className="dash-title">Keuangan</div>
                    <div className="dash-sub">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>

                {/* Stat Cards */}
                <div className="cards">
                    {cards.map((c, i) => (
                        <div key={i} className="card">
                            <div className="card-top">
                                <div className="card-label">{c.label}</div>
                                <div className="card-icon" style={{ background: c.bg, fontSize: 18 }}>{c.icon}</div>
                            </div>
                            <div className="card-value" style={{ color: c.color }}>{c.value}</div>
                            <div className="card-sub">{c.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="charts">
                    {/* Tamu mingguan */}
                    <div className="chart-card">
                        <div className="chart-title">Tamu per Minggu</div>
                        <div className="chart-sub">4 minggu terakhir</div>
                        <BarChart data={weeklyGuests} valueKey="count" color="#1a73e8" height={110} />
                    </div>

                    {/* Revenue mingguan */}
                    <div className="chart-card">
                        <div className="chart-title">Revenue per Minggu</div>
                        <div className="chart-sub">4 minggu terakhir (Rp)</div>
                        <BarChart data={weeklyGuests} valueKey="revenue" color="#188038" height={110} />
                    </div>

                    {/* Tamu bulanan */}
                    <div className="chart-card">
                        <div className="chart-title">Tamu per Bulan</div>
                        <div className="chart-sub">6 bulan terakhir</div>
                        <BarChart data={monthlyData} valueKey="count" color="#e37400" height={110} />
                    </div>

                    {/* Revenue bulanan */}
                    <div className="chart-card">
                        <div className="chart-title">Revenue per Bulan</div>
                        <div className="chart-sub">6 bulan terakhir (Rp)</div>
                        <BarChart data={monthlyData} valueKey="revenue" color="#9334e6" height={110} />
                    </div>
                </div>

                {/* Bulan ini vs bulan lalu */}
                <div className="chart-card">
                    <div className="chart-title">Perbandingan Bulan Ini vs Bulan Lalu</div>
                    <div className="chart-sub" style={{ marginBottom: 16 }}>Tamu & pemasukan</div>
                    <div className="compare-row">
                        <div className="compare-box" style={{ background: '#e8f0fe' }}>
                            <div className="compare-label">Tamu bulan ini</div>
                            <div className="compare-val" style={{ color: '#1a73e8' }}>{stats.guestThisMonth}</div>
                            <div className="compare-period">vs {stats.guestLastMonth} bulan lalu &nbsp;<GrowthBadge value={stats.guestGrowth} /></div>
                        </div>
                        <div className="compare-box" style={{ background: '#e6f4ea' }}>
                            <div className="compare-label">Revenue bulan ini</div>
                            <div className="compare-val" style={{ color: '#188038' }}>{formatRp(stats.revenueThisMonth)}</div>
                            <div className="compare-period">vs {formatRp(stats.revenueLastMonth)} bulan lalu &nbsp;<GrowthBadge value={stats.revenueGrowth} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}