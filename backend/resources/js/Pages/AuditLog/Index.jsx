import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const ACTION_COLOR = {
    created: { bg: '#e6f4ea', color: '#137333', label: '✚ Tambah' },
    updated: { bg: '#fef3e2', color: '#b06000', label: '✎ Ubah'  },
    deleted: { bg: '#fce8e6', color: '#c5221f', label: '✕ Hapus'  },
};

export default function AuditLogIndex({ auth, logs, chainValid, filters }) {
    const [form, setForm] = useState(filters || {});

    const applyFilter = () => {
        router.get(route('audit.index'), form, { preserveScroll: true });
    };

    const clearFilter = () => {
        setForm({});
        router.get(route('audit.index'), {});
    };

    const exportCsv = () => {
        const params = new URLSearchParams(form).toString();
        window.location.href = route('audit.export') + (params ? '?' + params : '');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Audit Log" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap');
                * { box-sizing: border-box; }
                .al-root { font-family: 'Google Sans','Segoe UI',sans-serif; padding: 20px; background:#f8f9fa; min-height:100vh; }

                .al-header { display:flex; align-items:center; gap:12px; margin-bottom:16px; flex-wrap:wrap; }
                .al-title { font-size:20px; font-weight:600; color:#202124; letter-spacing:-.3px; flex:1; }

                .chain-badge {
                    display:inline-flex; align-items:center; gap:6px;
                    padding:5px 14px; border-radius:20px; font-size:12px; font-weight:600;
                }
                .chain-ok   { background:#e6f4ea; color:#137333; }
                .chain-fail { background:#fce8e6; color:#c5221f; }

                .al-export-btn {
                    background:#1a73e8; color:#fff; border:none; border-radius:6px;
                    padding:7px 16px; font-size:13px; font-weight:500; cursor:pointer; font-family:inherit;
                    transition:background .15s;
                }
                .al-export-btn:hover { background:#1557b0; }

                /* Filters */
                .al-filters {
                    background:#fff; border:1px solid #e0e0e0; border-radius:10px;
                    padding:14px 16px; margin-bottom:16px;
                    display:flex; gap:10px; align-items:flex-end; flex-wrap:wrap;
                }
                .al-filter-group { display:flex; flex-direction:column; gap:4px; }
                .al-filter-label { font-size:11px; font-weight:600; color:#80868b; text-transform:uppercase; letter-spacing:.4px; }
                .al-filter-input, .al-filter-select {
                    border:1px solid #e0e0e0; border-radius:6px;
                    padding:6px 10px; font-size:13px; font-family:inherit;
                    color:#202124; outline:none; background:#fff;
                    transition:border-color .15s;
                }
                .al-filter-input:focus, .al-filter-select:focus { border-color:#1a73e8; }
                .al-filter-btn {
                    background:#f1f3f4; color:#202124; border:1px solid #e0e0e0;
                    border-radius:6px; padding:7px 14px; font-size:13px; font-weight:500;
                    cursor:pointer; font-family:inherit; transition:background .15s;
                }
                .al-filter-btn:hover { background:#e0e0e0; }
                .al-filter-btn.primary { background:#1a73e8; color:#fff; border-color:#1a73e8; }
                .al-filter-btn.primary:hover { background:#1557b0; }

                /* Table */
                .al-table-wrap {
                    background:#fff; border:1px solid #e0e0e0; border-radius:10px;
                    overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,.06);
                }
                table { width:100%; border-collapse:collapse; font-size:13px; }
                th {
                    background:#f8f9fa; color:#5f6368; font-weight:600; font-size:11px;
                    text-transform:uppercase; letter-spacing:.5px;
                    padding:10px 14px; text-align:left;
                    border-bottom:1px solid #e0e0e0; white-space:nowrap;
                }
                td {
                    padding:10px 14px; border-bottom:1px solid #f1f3f4;
                    color:#202124; vertical-align:top;
                }
                tr:last-child td { border-bottom:none; }
                tr:hover td { background:#f8f9ff; }

                .action-badge {
                    display:inline-flex; align-items:center;
                    padding:2px 10px; border-radius:10px;
                    font-size:11px; font-weight:600;
                }
                .field-badge {
                    font-family:'Roboto Mono',monospace; font-size:11px;
                    background:#f1f3f4; color:#5f6368;
                    padding:2px 8px; border-radius:4px;
                }
                .val-old { color:#d93025; font-family:'Roboto Mono',monospace; font-size:12px; }
                .val-new { color:#137333; font-family:'Roboto Mono',monospace; font-size:12px; }
                .val-arrow { color:#bdc1c6; margin:0 4px; }
                .hash-text { font-family:'Roboto Mono',monospace; font-size:10px; color:#9aa0a6; }

                /* Pagination */
                .al-pagination { display:flex; justify-content:center; gap:6px; padding:16px; flex-wrap:wrap; }
                .al-page-btn {
                    padding:5px 12px; border-radius:6px; font-size:13px; font-weight:500;
                    border:1px solid #e0e0e0; background:#fff; color:#3c4043; cursor:pointer; font-family:inherit;
                    transition:background .12s;
                }
                .al-page-btn:hover { background:#f1f3f4; }
                .al-page-btn.active { background:#1a73e8; color:#fff; border-color:#1a73e8; }
                .al-page-btn:disabled { opacity:.4; cursor:not-allowed; }

                .empty-state { text-align:center; padding:48px; color:#80868b; font-size:14px; }
            `}</style>

            <div className="al-root">
                {/* Header */}
                <div className="al-header">
                    <div className="al-title">🔐 Audit Log</div>

                    {/* Chain integrity badge */}
                    <div className={`chain-badge ${chainValid ? 'chain-ok' : 'chain-fail'}`}>
                        {chainValid ? '✔ Integritas Aman' : '⚠ Integritas Rusak!'}
                    </div>

                    <button className="al-export-btn" onClick={exportCsv}>
                        ⬇ Export CSV
                    </button>
                </div>

                {/* Filters */}
                <div className="al-filters">
                    <div className="al-filter-group">
                        <label className="al-filter-label">Aksi</label>
                        <select className="al-filter-select" value={form.action || ''} onChange={e => setForm(f => ({ ...f, action: e.target.value }))}>
                            <option value="">Semua</option>
                            <option value="created">Tambah</option>
                            <option value="updated">Ubah</option>
                            <option value="deleted">Hapus</option>
                        </select>
                    </div>
                    <div className="al-filter-group">
                        <label className="al-filter-label">Model</label>
                        <select className="al-filter-select" value={form.model || ''} onChange={e => setForm(f => ({ ...f, model: e.target.value }))}>
                            <option value="">Semua</option>
                            <option value="Guest">Checkin Reguler</option>
                            <option value="AppGuest">Checkin Aplikasi</option>
                        </select>
                    </div>
                    <div className="al-filter-group">
                        <label className="al-filter-label">Tanggal</label>
                        <input type="date" className="al-filter-input" value={form.date || ''} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                    </div>
                    <button className="al-filter-btn primary" onClick={applyFilter}>Cari</button>
                    <button className="al-filter-btn" onClick={clearFilter}>Reset</button>
                </div>

                {/* Table */}
                <div className="al-table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Waktu</th>
                                <th>Admin</th>
                                <th>Aksi</th>
                                <th>Data</th>
                                <th>Field</th>
                                <th>Perubahan</th>
                                <th>IP</th>
                                <th>Hash</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.data && logs.data.length > 0 ? logs.data.map((log) => {
                                const ac = ACTION_COLOR[log.action] || ACTION_COLOR.updated;
                                return (
                                    <tr key={log.id}>
                                        <td style={{ color:'#9aa0a6', fontSize:12 }}>{log.id}</td>
                                        <td style={{ whiteSpace:'nowrap', fontSize:12 }}>
                                            {new Date(log.created_at).toLocaleString('id-ID', {
                                                day:'2-digit', month:'short', year:'numeric',
                                                hour:'2-digit', minute:'2-digit',
                                            })}
                                        </td>
                                        <td style={{ fontWeight:500 }}>{log.user?.name ?? '—'}</td>
                                        <td>
                                            <span className="action-badge" style={{ background:ac.bg, color:ac.color }}>
                                                {ac.label}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{ fontSize:12 }}>{log.model}</span>
                                            <span style={{ color:'#9aa0a6', fontSize:11 }}> #{log.model_id}</span>
                                        </td>
                                        <td>
                                            {log.field && <span className="field-badge">{log.field}</span>}
                                        </td>
                                        <td style={{ maxWidth:220 }}>
                                            {log.action === 'updated' && (
                                                <>
                                                    <span className="val-old">{log.old_value ?? '—'}</span>
                                                    <span className="val-arrow">→</span>
                                                    <span className="val-new">{log.new_value ?? '—'}</span>
                                                </>
                                            )}
                                            {log.action === 'created' && (
                                                <span className="val-new">{log.new_value}</span>
                                            )}
                                            {log.action === 'deleted' && (
                                                <span className="val-old" style={{ fontSize:11 }}>Data dihapus</span>
                                            )}
                                        </td>
                                        <td style={{ fontSize:11, color:'#9aa0a6' }}>{log.ip_address}</td>
                                        <td>
                                            <span className="hash-text" title={log.hash}>
                                                {log.hash?.slice(0, 10)}…
                                            </span>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={9} className="empty-state">Tidak ada log ditemukan.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {logs.last_page > 1 && (
                    <div className="al-pagination">
                        {logs.links.map((link, i) => (
                            <button
                                key={i}
                                className={`al-page-btn ${link.active ? 'active' : ''}`}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}

                <div style={{ padding:'0 0 16px', color:'#9aa0a6', fontSize:12 }}>
                    Total {logs.total ?? 0} log entry
                </div>
            </div>
        </AuthenticatedLayout>
    );
}