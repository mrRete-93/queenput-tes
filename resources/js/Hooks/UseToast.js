import { useState, useCallback, useRef } from 'react';

/**
 * Hook untuk mengelola state toast notifications.
 * Mendukung tipe: success, error, warning, info, confirm.
 */
export function useToast() {
    const [toasts, setToasts]     = useState([]);
    const [confirm, setConfirm]   = useState(null); // { message, onYes, onNo }
    const idRef                   = useRef(0);

    const addToast = useCallback((message, type = 'info', duration = 3500) => {
        const id = ++idRef.current;
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    /** Pengganti window.confirm() — returns Promise<boolean> */
    const showConfirm = useCallback((message) => {
        return new Promise((resolve) => {
            setConfirm({
                message,
                onYes: () => { setConfirm(null); resolve(true);  },
                onNo:  () => { setConfirm(null); resolve(false); },
            });
        });
    }, []);

    const toast = {
        success: (msg, dur) => addToast(msg, 'success', dur),
        error:   (msg, dur) => addToast(msg, 'error',   dur ?? 5000),
        warning: (msg, dur) => addToast(msg, 'warning', dur),
        info:    (msg, dur) => addToast(msg, 'info',    dur),
    };

    return { toast, toasts, removeToast, confirm, showConfirm };
}