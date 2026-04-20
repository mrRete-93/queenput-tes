import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const formatTimeText = (timeStr) => {
    if (!timeStr) return '';
    return timeStr.slice(0, 5).replace(':', '.') + ' WIB';
};

const formatRupiah = (val) => {
    if (!val && val !== 0) return '';
    return 'Rp ' + Number(val).toLocaleString('id-ID');
};

const EMPTY_ROW = () => ({
    _id: Math.random().toString(36).slice(2),
    nomor_kamar: '',
    nama_tamu: '',
    jam_checkin: '',
    jam_checkout: '',
    total_bayar: '',
    alamat: '',
    nik: '',
    keterangan: '',
});

export default function Index({ auth, guests, appGuests, selectedMonth, selectedYear, sheetTitle }) {
    const [activeSheet, setActiveSheet] = useState('reguler'); // 'reguler' | 'ota'

    // State untuk Reguler
    const [rows, setRows] = useState(() => Array.from({ length: 5 }, EMPTY_ROW));
    const [saving, setSaving] = useState({});
    const [activeCell, setActiveCell] = useState(null);

    // State untuk OTA
    const [otaRows, setOtaRows] = useState(() => Array.from({ length: 5 }, EMPTY_ROW));
    const [otaSaving, setOtaSaving] = useState({});
    const [otaActiveCell, setOtaActiveCell] = useState(null);

    const updateRow = (setFn, id, field, value) =>
        setFn(prev => prev.map(r => r._id === id ? { ...r, [field]: value } : r));

    const addRows = (setFn, n) =>
        setFn(prev => [...prev, ...Array.from({ length: n }, EMPTY_ROW)]);

    const saveRow = (row, routeName, setSavingFn, setRowsFn) => {
        setSavingFn(prev => ({ ...prev, [row._id]: true }));
        router.post(route(routeName), {
            nomor_kamar:      row.nomor_kamar,
            nama_tamu:        row.nama_tamu,
            tanggal_checkin:  row.jam_checkin,
            tanggal_checkout: row.jam_checkout,
            total_bayar:      row.total_bayar,
            alamat:           row.alamat,
            nik:              row.nik,
            keterangan:       row.keterangan,
            month:            selectedMonth,
            year:             selectedYear,
        }, {
            onSuccess: () => {
                setRowsFn(prev => prev.map(r => r._id === row._id ? EMPTY_ROW() : r));
                setSavingFn(prev => { const n = { ...prev }; delete n[row._id]; return n; });
            },
            onError: () =>
                setSavingFn(prev => { const n = { ...prev }; delete n[row._id]; return n; }),
            preserveScroll: true,
        });
    };

    const cols = [
        { key: 'nama_tamu',    label: 'Nama Tamu',  width: '160px' },
        { key: 'jam_checkin',  label: 'In',          width: '106px' },
        { key: 'jam_checkout', label: 'Out',         width: '106px' },
        { key: 'total_bayar',  label: 'Harga',       width: '110px' },
        { key: 'alamat',       label: 'Alamat',      width: '180px' },
        { key: 'nik',          label: 'NIK',         width: '130px' },
        { key: 'keterangan',   label: 'Keterangan',  width: '160px' },
    ];

    const renderTable = (
        tableRows, setTableRows,
        savedData, savingState, setSavingState,
        routeName, activeCellState, setActiveCellState,
        badgeColor,statusRoute,
    ) => (
        <>
            <div className="gs-sheet-wrapper">
                <table className="gs-table">
                    <colgroup>
                        <col style={{ width: '52px' }} />
                        {cols.map(c => <col key={c.key} style={{ width: c.width, minWidth: c.width }} />)}
                        <col style={{ width: '76px' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th className="gs-th corner gs-rownum">No</th>
                            {cols.map(c => <th key={c.key} className="gs-th">{c.label}</th>)}
                            <th className="gs-th gs-th-aksi">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.map((row) => (
                            <tr key={row._id} className="gs-input-row">
                                <td className="gs-rownum" style={{ background: '#fffde7', padding: 0 }}>
                                    <input
                                        className="kmr-input"
                                        value={row.nomor_kamar}
                                        onChange={e => updateRow(setTableRows, row._id, 'nomor_kamar', e.target.value)}
                                        onFocus={() => setActiveCellState(row._id + '-kmr')}
                                    />
                                </td>
                                {cols.map(col => (
                                    <td
                                        key={col.key}
                                        className={`gs-td${activeCellState === row._id + '-' + col.key ? ' active-cell' : ''}`}
                                        onClick={() => setActiveCellState(row._id + '-' + col.key)}
                                    >
                                        <input
                                            type="text"
                                            className="gs-cell-input"
                                            value={row[col.key]}
                                            onChange={e => updateRow(setTableRows, row._id, col.key, e.target.value)}
                                            onFocus={() => setActiveCellState(row._id + '-' + col.key)}
                                        />
                                    </td>
                                ))}
                                <td className="gs-td-aksi">
                                    <button
                                        className="gs-save-btn"
                                        disabled={savingState[row._id] || !row.nama_tamu}
                                        onClick={() => saveRow(row, routeName, setSavingState, setTableRows)}
                                    >
                                        {savingState[row._id] ? '...' : 'Simpan'}
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {savedData && savedData.map((g) => (
                            <tr key={g.id} className="gs-data-row">
                                {/* Nomor kamar — warna sesuai status */}
                                <td className="gs-rownum" style={{
                                    fontWeight: 700,
                                    fontSize: 12,
                                    background: g.status === 'checkin' ? '#e6f4ea' : g.status === 'checkout' ? '#fce8e6' : '#fff',
                                    color: g.status === 'checkin' ? '#137333' : g.status === 'checkout' ? '#c5221f' : '#f9a825',
                                }}>
                                    {g.nomor_kamar || '—'}
                                </td>

                                <td className="gs-td"><div className="gs-cell-text">{g.nama_tamu}</div></td>
                                <td className="gs-td"><div className="gs-cell-text gs-cell-time">{formatTimeText(g.tanggal_checkin)}</div></td>
                                <td className="gs-td"><div className="gs-cell-text gs-cell-time">{formatTimeText(g.tanggal_checkout)}</div></td>
                                <td className="gs-td"><div className="gs-cell-text gs-cell-num">{formatRupiah(g.total_bayar)}</div></td>
                                <td className="gs-td"><div className="gs-cell-text">{g.alamat}</div></td>
                                <td className="gs-td"><div className="gs-cell-text">{g.nik}</div></td>
                                <td className="gs-td"><div className="gs-cell-text">{g.keterangan}</div></td>

                                {/* Tombol toggle status */}
                                <td className="gs-td-aksi" style={{ minWidth: 90 }}>
                                    {g.status === 'checkin' ? (
                                        <button
                                            className="gs-status-btn gs-status-checkout"
                                            onClick={() => router.patch(route(statusRoute, g.id), { status: 'checkout' }, { preserveScroll: true })}
                                        >
                                            Checkout
                                        </button>
                                    ) : (
                                        <button
                                            className="gs-status-btn gs-status-checkin"
                                            onClick={() => router.patch(route(statusRoute, g.id), { status: 'checkin' }, { preserveScroll: true })}
                                        >
                                            Checkin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="gs-add-more">
                <button className="gs-add-btn" onClick={() => addRows(setTableRows, 5)}>＋ Tambah 5 baris</button>
                <button className="gs-add-btn" onClick={() => addRows(setTableRows, 10)}>＋ Tambah 10 baris</button>
                <span style={{ fontSize: 12, color: '#bdc1c6', marginLeft: 4 }}>{tableRows.length} baris aktif</span>
            </div>

            <div className="gs-footer">
                <span>📄 {savedData ? savedData.length : 0} data tersimpan</span>
                <span>•</span>
                <span>In / Out dalam format jam WIB</span>
            </div>
        </>
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Pembukuan ${sheetTitle}`} />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap');
                * { box-sizing: border-box; }
                .gs-root { font-family: 'Google Sans','Segoe UI',sans-serif; background:#f8f9fa; min-height:100vh; }

                /* Toolbar */
                .gs-toolbar {
                    background:#fff; border-bottom:1px solid #e0e0e0;
                    padding:6px 16px; display:flex; align-items:center; gap:12px;
                    position:sticky; top:0; z-index:30;
                    box-shadow:0 1px 3px rgba(0,0,0,.08);
                }
                .gs-title { font-size:18px; font-weight:500; color:#202124; }
                .gs-badge {
                    color:#fff; font-size:11px; font-weight:600;
                    padding:2px 8px; border-radius:12px; letter-spacing:.4px;
                }

                /* Sheet Tabs — mirip Google Sheets */
                .gs-tabs-bar {
                    background:#f1f3f4; border-bottom:1px solid #e0e0e0;
                    display:flex; align-items:flex-end; padding:0 16px; gap:2px;
                    position:sticky; top:45px; z-index:29;
                }
                .gs-tab {
                    display:flex; align-items:center; gap:6px;
                    padding:7px 16px 6px; font-size:13px; font-weight:500;
                    border-radius:6px 6px 0 0; cursor:pointer; border:1px solid transparent;
                    border-bottom:none; transition:all .15s; user-select:none;
                    color:#5f6368; background:transparent;
                }
                .gs-tab:hover { background:#e8eaed; color:#202124; }
                .gs-tab.active {
                    background:#fff; color:#202124;
                    border-color:#e0e0e0; border-bottom-color:#fff;
                    margin-bottom:-1px; padding-bottom:7px;
                }
                .gs-tab-dot {
                    width:8px; height:8px; border-radius:50%; display:inline-block;
                }

                /* Table */
                .gs-sheet-wrapper {
                    overflow-x:auto; overflow-y:auto;
                    max-height:calc(100vh - 190px);
                    border:1px solid #e0e0e0; border-radius:4px;
                    margin:12px 16px 4px; background:#fff;
                    box-shadow:0 1px 4px rgba(0,0,0,.08);
                }
                .gs-table { border-collapse:collapse; min-width:100%; font-size:13px; }
                .gs-rownum {
                    width:52px; min-width:52px; background:#f8f9fa; color:#80868b; font-size:12px;
                    text-align:center; border-right:1px solid #e0e0e0; border-bottom:1px solid #e0e0e0;
                    user-select:none; position:sticky; left:0; z-index:2;
                }
                .gs-th {
                    background:#f8f9fa; color:#444746; font-weight:500; font-size:12px; text-align:center;
                    padding:6px 8px; border-right:1px solid #e0e0e0; border-bottom:2px solid #dadce0;
                    white-space:nowrap; position:sticky; top:0; z-index:10; user-select:none;
                }
                .gs-th.corner { position:sticky; left:0; z-index:20; }
                .gs-th-aksi { background:#e6f4ea; color:#137333; }
                .gs-td {
                    border-right:1px solid #e0e0e0; border-bottom:1px solid #e0e0e0;
                    padding:0; height:30px; vertical-align:middle; background:#fff;
                }
                .gs-td:hover { background:#f0f4ff; }
                .gs-td.active-cell { outline:2px solid #1a73e8; outline-offset:-2px; z-index:5; background:#fff; }
                .gs-input-row .gs-td { background:#fffde7; }
                .gs-input-row .gs-td:hover { background:#fff9c4; }
                .gs-td-aksi {
                    border-bottom:1px solid #e0e0e0; border-right:none;
                    background:#f8fff9; text-align:center; padding:0 6px;
                }
                .gs-td-aksi:hover { background:#e6f4ea; }
                .gs-cell-input {
                    width:100%; height:100%; border:none; background:transparent;
                    padding:0 8px; font-size:13px; font-family:inherit; color:#202124; outline:none;
                }
                .gs-cell-text {
                    padding:0 8px; height:30px; line-height:30px;
                    white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:#202124;
                }
                .gs-cell-time { font-size:12px; color:#1a73e8; font-family:'Roboto Mono',monospace; font-weight:500; }
                .gs-cell-num  { text-align:right; font-family:'Roboto Mono',monospace; font-size:12px; color:#188038; }
                .gs-data-row:nth-child(even) .gs-td { background:#f8f9fa; }
                .gs-data-row:nth-child(even) .gs-td:hover { background:#f0f4ff; }
                .gs-data-row:nth-child(even) .gs-td-aksi { background:#f1f8f3; }
                .gs-save-btn {
                    background:#1a73e8; color:#fff; border:none; border-radius:4px;
                    padding:4px 10px; font-size:12px; font-weight:500; cursor:pointer; font-family:inherit;
                }
                .gs-save-btn:hover { background:#1557b0; }
                .gs-save-btn:disabled { background:#a8c7fa; cursor:not-allowed; }
                .kmr-input {
                    width:100%; height:100%; border:none; background:transparent;
                    text-align:center; font-weight:700; color:#f9a825;
                    font-size:12px; font-family:'Roboto Mono',monospace; outline:none; padding:0 4px;
                }
                .gs-add-more { display:flex; align-items:center; gap:8px; margin:8px 16px 10px; }
                .gs-add-btn {
                    background:#fff; color:#1a73e8; border:1px solid #dadce0; border-radius:4px;
                    padding:5px 12px; font-size:12px; font-weight:500; cursor:pointer; font-family:inherit;
                }
                .gs-add-btn:hover { background:#e8f0fe; border-color:#1a73e8; }
                .gs-footer { padding:4px 16px 12px; color:#80868b; font-size:12px; display:flex; gap:16px; }
            `}</style>

            <div className="gs-root">

                {/* Toolbar */}
                <div className="gs-toolbar">
                    <span className="gs-title">📋 Pembukuan Reguler</span>
                    <span className="gs-badge" style={{ background: '#1a73e8' }}>{sheetTitle}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 12, color: '#80868b' }}>
                        {activeSheet === 'reguler' ? guests?.length : appGuests?.length} tamu tersimpan
                    </span>
                </div>

                {/* Sheet Tabs */}
                <div className="gs-tabs-bar">
                    <div
                        className={`gs-tab ${activeSheet === 'reguler' ? 'active' : ''}`}
                        onClick={() => setActiveSheet('reguler')}
                    >
                        <span className="gs-tab-dot" style={{ background: '#0f9d58' }}></span>
                        Reguler
                        <span style={{
                            fontSize: 11, background: '#e6f4ea', color: '#137333',
                            borderRadius: 10, padding: '1px 6px', marginLeft: 2
                        }}>
                            {guests?.length ?? 0}
                        </span>
                    </div>
                    <div
                        className={`gs-tab ${activeSheet === 'ota' ? 'active' : ''}`}
                        onClick={() => setActiveSheet('ota')}
                    >
                        <span className="gs-tab-dot" style={{ background: '#1a73e8' }}></span>
                        OTA / Aplikasi
                        <span style={{
                            fontSize: 11, background: '#e8f0fe', color: '#1a73e8',
                            borderRadius: 10, padding: '1px 6px', marginLeft: 2
                        }}>
                            {appGuests?.length ?? 0}
                        </span>
                    </div>
                </div>

                {/* Sheet Content */}
                {activeSheet === 'reguler'
                    ? renderTable(
                        rows, setRows,
                        guests, saving, setSaving,
                        'guest.store', activeCell, setActiveCell,
                        '#0f9d58'
                    )
                    : renderTable(
                        otaRows, setOtaRows,
                        appGuests, otaSaving, setOtaSaving,
                        'app-guest.store', otaActiveCell, setOtaActiveCell,
                        '#1a73e8'
                    )
                }

            </div>
        </AuthenticatedLayout>
    );
}