import { useState } from 'react';

export function useEditBuffer() {
    const [editBuffer, setEditBuffer] = useState({});

    const getVal = (g, key) => {
        if (editBuffer[g.id]?.[key] !== undefined) return editBuffer[g.id][key];
        return g[key] ?? '';
    };

    const setEdit = (id, key, val) =>
        setEditBuffer(prev => ({
            ...prev,
            [id]: { ...(prev[id] ?? {}), [key]: val },
        }));

    const clearEdit = (id) =>
        setEditBuffer(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
        });

    const getBuffer = (id) => editBuffer[id] ?? null;

    return { getVal, setEdit, clearEdit, getBuffer };
}