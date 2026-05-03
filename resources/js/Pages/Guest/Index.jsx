import AuthenticatedLayout        from '@/Layouts/AuthenticatedLayout';
import { Head, router }           from '@inertiajs/react';
import { useState, useCallback }  from 'react';

import DownloadLaporan from "@/Components/DownloadLaporan";
import STYLES                from '../../Constants/styles';
import { TABS }              from '../../Constants/options';
import { useShift }          from './hooks/UseShift';
import { useEditBuffer }     from './hooks/UseEditBuffer';
import { useDisplayedRows }  from './hooks/UseDisplayedRows';
import ShiftBar              from './components/ShiftBar';
import GuestTable            from './components/GuestTable';

const RELOAD_PROPS = {
    reguler: ['guests'],
    ota:     ['appGuests'],
    expense: ['expenses'],
};

function SearchBar({ query, onChange, resultCount }) {
    return (
        <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
                className="search-inp"
                type="text"
                placeholder="Cari nama tamu, nomor kamar, tanggal, keterangan..."
                value={query}
                onChange={e => onChange(e.target.value)}
                autoComplete="off"
            />
            {query && (
                <>
                    <span className="search-count">{resultCount} hasil</span>
                    <button className="search-clear" onClick={() => onChange('')} title="Hapus pencarian">✕</button>
                </>
            )}
        </div>
    );
}



export default function Index({ auth, guests = [], appGuests = [], expenses = [], selectedMonth, selectedYear }) {
    const [tab,     setTab]     = useState('reguler');
    const [newRows, setNewRows] = useState([]);
    const [query,   setQuery]   = useState('');

    const { shiftActive, activeShiftInfo, shiftInp, handleInputChange, startShift, endShift } = useShift();
    const { getVal, setEdit, clearEdit, getBuffer } = useEditBuffer();

    const displayedRows = useDisplayedRows(guests, appGuests, expenses, tab, newRows, activeShiftInfo, query);
    const resultCount   = displayedRows.filter(r => !r.isSeparator).length;

    const switchTab = (key) => { setTab(key); setNewRows([]); setQuery(''); };

    const addNewRow    = () => setNewRows(prev => [...prev, { _id: Math.random().toString(36).slice(2) }]);
    const updateNewRow = (rowId, key, value) => setNewRows(prev => prev.map(r => r._id === rowId ? { ...r, [key]: value } : r));
    const removeNewRow = (rowId) => setNewRows(prev => prev.filter(r => r._id !== rowId));

    const reloadCurrentTab = useCallback(() =>
        router.reload({ only: RELOAD_PROPS[tab] ?? [], preserveScroll: true }), [tab]);

    const buildShiftMeta = () => ({
        shift_admin:   `${activeShiftInfo.session}-${activeShiftInfo.name}`,
        tanggal_input: activeShiftInfo.date,
        month:         selectedMonth,
        year:          selectedYear,
    });

    const routeFor = (currentTab, action) => {
        const map = {
            reguler: { update: 'guest.update',     store: 'guest.store',     status: 'guest.status'     },
            ota:     { update: 'app-guest.update',  store: 'app-guest.store',  status: 'app-guest.status' },
        };
        return map[currentTab]?.[action] ?? null;
    };

    const routeParams = (currentTab, g) =>
        currentTab === 'ota' ? { appGuest: g.id } : { guest: g.id };

    const handleBlur = (g) => {
        const buffer = getBuffer(g.id);
        if (!buffer || Object.keys(buffer).length === 0) return;
        router.patch(
            route(routeFor(tab, 'update'), routeParams(tab, g)),
            { ...buffer, ...buildShiftMeta() },
            { preserveScroll: true, onSuccess: () => { clearEdit(g.id); reloadCurrentTab(); } }
        );
    };

    const saveRow = (row) => {
        if (!activeShiftInfo) return;
        const meta = buildShiftMeta();
        if (tab === 'expense') {
            router.post(route('pengeluaran.store'), {
                nama_barang: row.nama_barang ?? '',
                harga:       row.harga ?? 0,
                keterangan:  row.keterangan ?? '',
                ...meta,
            }, { preserveScroll: true, onSuccess: () => { removeNewRow(row._id); reloadCurrentTab(); } });
        } else {
            router.post(route(routeFor(tab, 'store')), { ...row, ...meta },
                { preserveScroll: true, onSuccess: () => { removeNewRow(row._id); reloadCurrentTab(); } });
        }
    };

    const toggleStatus = (g) => {
        if (tab === 'expense') return;
        const newStatus = g.status === 'checkout' ? 'checkin' : 'checkout';
        router.patch(
            route(routeFor(tab, 'status'), routeParams(tab, g)),
            { status: newStatus, ...buildShiftMeta() },
            { preserveScroll: true, onSuccess: reloadCurrentTab }
        );
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Queenput - Admin" />
            <style>{STYLES}</style>

            <div className="pg">
                <div className="tabs">
                    {TABS.map(t => (
                        <button
                            key={t.key}
                            className={`tab-btn ${tab === t.key ? 'tab-active' : 'tab-inactive'}`}
                            onClick={() => switchTab(t.key)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <ShiftBar
                    shiftActive={shiftActive}
                    shiftInp={shiftInp}
                    activeShiftInfo={activeShiftInfo}
                    onInputChange={handleInputChange}
                    onStart={startShift}
                    onLogout={() => endShift(() => { setNewRows([]); setQuery(''); })}
                />

                <div className="flex items-center justify-between mb-2">
                    <SearchBar query={query} onChange={setQuery} resultCount={resultCount} />
                    <DownloadLaporan mode="bulan" month={selectedMonth} year={selectedYear} />
                </div>
                <GuestTable
                    tab={tab}
                    displayedRows={displayedRows}
                    getVal={getVal}
                    onEdit={setEdit}
                    onNewRowChange={updateNewRow}
                    onBlur={handleBlur}
                    onSave={saveRow}
                    onToggleStatus={toggleStatus}
                    query={query}
                />
            </div>

            {shiftActive && (
                <button className="btn-add-floating" onClick={addNewRow}>
                    ＋ TAMBAH BARIS
                </button>
            )}
        </AuthenticatedLayout>
    );
}