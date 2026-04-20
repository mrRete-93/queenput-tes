import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, files, currentMonth, currentYear }) {
    const [showModal, setShowModal] = useState(false);
    const [newMonth, setNewMonth] = useState(currentMonth);
    const [newYear, setNewYear] = useState(currentYear);

    const bulanList = [
        'Januari','Februari','Maret','April','Mei','Juni',
        'Juli','Agustus','September','Oktober','November','Desember'
    ];

    const handleCreate = () => {
        router.post(route('dashboard.createFile'), {
            month: newMonth,
            year: newYear,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Spreadsheet</h2>}
        >
            <Head title="File Saya - Queenput" />

            <style>{`
                .gs-header { background: #f8f9fa; border-bottom: 1px solid #dadce0; padding: 16px 0 28px 0; }
                .gs-container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
                .gs-title { font-size: 14px; font-weight: 500; color: #202124; margin-bottom: 16px; }
                
                .gs-create-box { 
                    width: 150px; height: 110px; background: white; border: 2px dashed #dadce0; 
                    border-radius: 4px; display: flex; flex-direction: column; align-items: center;
                    justify-content: center; transition: all 0.2s; cursor: pointer;
                }
                .gs-create-box:hover { border-color: #1a73e8; background: #e8f0fe; }
                .gs-create-plus { font-size: 32px; color: #1a73e8; line-height: 1; }
                .gs-create-label { font-size: 13px; font-weight: 500; color: #3c4043; margin-top: 8px; }

                .gs-file-list { margin-top: 24px; }
                .gs-table-header { 
                    display: grid; grid-template-columns: 40px 2fr 1fr 1fr 40px; 
                    padding: 10px 16px; font-size: 13px; font-weight: 500; color: #5f6368; 
                }
                .gs-row { 
                    display: grid; grid-template-columns: 40px 2fr 1fr 1fr 40px; align-items: center;
                    padding: 8px 16px; border-radius: 100px; cursor: pointer; text-decoration: none; 
                    color: inherit; transition: background 0.15s;
                }
                .gs-row:hover { background: #e8f0fe; }
                .gs-row span { font-size: 14px; }
                .gs-icon-sheet { color: #0f9d58; font-size: 18px; }

                /* Modal */
                .gs-modal-overlay {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.4);
                    display: flex; align-items: center; justify-content: center; z-index: 100;
                }
                .gs-modal {
                    background: white; border-radius: 8px; padding: 24px; width: 340px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                }
                .gs-modal h3 { font-size: 16px; font-weight: 600; color: #202124; margin-bottom: 16px; }
                .gs-modal select, .gs-modal input {
                    width: 100%; border: 1px solid #dadce0; border-radius: 4px;
                    padding: 8px 12px; font-size: 14px; margin-bottom: 12px; outline: none;
                }
                .gs-modal select:focus, .gs-modal input:focus { border-color: #1a73e8; }
                .gs-modal-btns { display: flex; gap: 8px; justify-content: flex-end; margin-top: 4px; }
                .gs-btn-cancel {
                    background: #fff; border: 1px solid #dadce0; border-radius: 4px;
                    padding: 8px 16px; font-size: 14px; cursor: pointer;
                }
                .gs-btn-ok {
                    background: #1a73e8; color: #fff; border: none; border-radius: 4px;
                    padding: 8px 16px; font-size: 14px; cursor: pointer; font-weight: 500;
                }
                .gs-btn-ok:hover { background: #1557b0; }
                .gs-empty-badge {
                    font-size: 11px; background: #fce8b2; color: #b06000;
                    padding: 2px 7px; border-radius: 10px; margin-left: 6px; font-weight: 500;
                }
            `}</style>

            {/* Header - Buat File Baru */}
            <div className="gs-header">
                <div className="gs-container">
                    <div className="gs-title">Memulai spreadsheet baru</div>
                    <div className="w-40">
                        <div className="gs-create-box" onClick={() => setShowModal(true)}>
                            <span className="gs-create-plus">＋</span>
                            <span style={{ fontSize: 11, color: '#80868b', marginTop: 4 }}>Pilih bulan</span>
                        </div>
                        <div className="gs-create-label text-center">Buku Baru</div>
                    </div>
                </div>
            </div>

            {/* File List */}
            <div className="gs-container py-8">
                <div className="gs-file-list">
                    <div className="gs-table-header">
                        <div></div>
                        <div>Nama</div>
                        <div>Pemilik</div>
                        <div className="text-right">Periode</div>
                        <div></div>
                    </div>

                    {files && files.length > 0 ? (
                        files.map((file) => (
                            <Link
                                key={file.id}
                                href={route('guest.index', { month: file.month, year: file.year })}
                                className="gs-row"
                            >
                                <span className="gs-icon-sheet text-center">田</span>
                                <span className="truncate pr-4 font-medium">
                                    {file.name}
                                    {file.is_empty && <span className="gs-empty-badge">Kosong</span>}
                                </span>
                                <span className="text-gray-600">{file.owner}</span>
                                <span className="text-gray-600 text-right">{file.last_opened}</span>
                                <span className="text-center text-gray-500">⋮</span>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500 text-sm italic">
                            Belum ada file pembukuan. Klik "Buku Baru" untuk memulai.
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Pilih Bulan */}
            {showModal && (
                <div className="gs-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="gs-modal" onClick={e => e.stopPropagation()}>
                        <h3>📅 Buat Buku Pembukuan Baru</h3>
                        <label style={{ fontSize: 13, color: '#5f6368' }}>Bulan</label>
                        <select value={newMonth} onChange={e => setNewMonth(Number(e.target.value))}>
                            {bulanList.map((b, i) => (
                                <option key={i+1} value={i+1}>{b}</option>
                            ))}
                        </select>
                        <label style={{ fontSize: 13, color: '#5f6368' }}>Tahun</label>
                        <input
                            type="number"
                            value={newYear}
                            min="2020" max="2099"
                            onChange={e => setNewYear(Number(e.target.value))}
                        />
                        <div className="gs-modal-btns">
                            <button className="gs-btn-cancel" onClick={() => setShowModal(false)}>Batal</button>
                            <button className="gs-btn-ok" onClick={handleCreate}>Buka Sheet</button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}