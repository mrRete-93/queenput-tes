import { useState } from 'react';

const DEFAULT_SHIFT_INPUT = {
    name:    '',
    date:    new Date().toISOString().split('T')[0],
    session: 'Pagi',
};

const STORAGE_KEY = 'active_shift';

export function useShift() {
    const [shiftInp, setShiftInp] = useState(DEFAULT_SHIFT_INPUT);

    // Baca dari localStorage saat pertama load
    const [shiftActive,     setShiftActive]     = useState(() => !!localStorage.getItem(STORAGE_KEY));
    const [activeShiftInfo, setActiveShiftInfo] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    });

    const handleInputChange = (field, value) =>
        setShiftInp(prev => ({ ...prev, [field]: value }));

    const startShift = () => {
        if (!shiftInp.name) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(shiftInp));
        setActiveShiftInfo({ ...shiftInp });
        setShiftActive(true);
    };

    const endShift = (onEnd) => {
        localStorage.removeItem(STORAGE_KEY);
        setShiftActive(false);
        setActiveShiftInfo(null);
        onEnd?.();
    };

    return { shiftActive, activeShiftInfo, shiftInp, handleInputChange, startShift, endShift };
}