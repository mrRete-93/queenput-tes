import { useState, useEffect } from 'react';
import axios from 'axios';

export function useShift(currentUser) {
    const [shiftInp, setShiftInp] = useState({
        name:    currentUser?.name ?? '',
        date:    new Date().toISOString().split('T')[0],
        session: 'Pagi',
    });

    const [activeShiftInfo, setActiveShiftInfo] = useState(null);
    const [shiftActive,     setShiftActive]     = useState(false);
    const [loading,         setLoading]         = useState(true);

    // ── Ambil shift aktif dari server saat pertama load ───────────
    useEffect(() => {
        axios.get('/api/shift/current')
            .then(res => {
                if (res.data && res.data.id) {
                    setActiveShiftInfo(res.data);
                    setShiftActive(true);
                } else {
                    setActiveShiftInfo(null);
                    setShiftActive(false);
                }
            })
            .catch(() => {
                setActiveShiftInfo(null);
                setShiftActive(false);
            })
            .finally(() => setLoading(false));
    }, []);

    // ── Mulai shift ───────────────────────────────────────────────
    const startShift = async () => {
        if (!shiftInp.name || !currentUser?.id) {
            alert('Nama admin harus diisi!');
            return;
        }

        try {
            const res = await axios.post('/api/shift/start', {
                name:    shiftInp.name,
                session: shiftInp.session,
                date:    shiftInp.date,
            });

            setActiveShiftInfo(res.data);
            setShiftActive(true);
        } catch (err) {
            console.error('Gagal mulai shift:', err);
            alert('Gagal memulai shift. Coba lagi.');
        }
    };

    // ── Akhiri shift ──────────────────────────────────────────────
    const endShift = async (onEnd) => {
        try {
            await axios.post('/api/shift/end');
            setShiftActive(false);
            setActiveShiftInfo(null);
            onEnd?.();
        } catch (err) {
            console.error('Gagal akhiri shift:', err);
            alert('Gagal mengakhiri shift. Coba lagi.');
        }
    };

    const handleInputChange = (field, value) =>
        setShiftInp(prev => ({ ...prev, [field]: value }));

    return {
        shiftActive,
        activeShiftInfo,
        shiftInp,
        loading,
        handleInputChange,
        startShift,
        endShift,
    };
}