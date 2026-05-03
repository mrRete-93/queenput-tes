import { useEffect, useRef } from 'react';

export function useScrollRestore(key = 'scroll_pos') {
    const ref = useRef(null);

    // Restore scroll setelah mount — pakai requestAnimationFrame
    // agar konten sudah ter-render sebelum scroll diset
    useEffect(() => {
        const saved = sessionStorage.getItem(key);
        if (!saved || !ref.current) return;

        requestAnimationFrame(() => {
            if (ref.current) {
                ref.current.scrollTop = parseInt(saved);
            }
        });
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const handler = () => sessionStorage.setItem(key, el.scrollTop);
        el.addEventListener('scroll', handler);
        return () => el.removeEventListener('scroll', handler);
    }, []);

    return ref;
}