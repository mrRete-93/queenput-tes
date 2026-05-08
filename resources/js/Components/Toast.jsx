import { useEffect, useState } from 'react';

/* ─── ICON per tipe ─────────────────────────────────────────────────── */
const ICONS = {
    success: '✓',
    error:   '✕',
    warning: '⚠',
    info:    'ℹ',
};

/* ─── Warna per tipe ─────────────────────────────────────────────────── */
const COLORS = {
    success: { bg: '#16a34a', bar: '#bbf7d0' },
    error:   { bg: '#dc2626', bar: '#fecaca' },
    warning: { bg: '#d97706', bar: '#fde68a' },
    info:    { bg: '#2563eb', bar: '#bfdbfe' },
};

/* ─── Single Toast Item ──────────────────────────────────────────────── */
function ToastItem({ toast, onRemove }) {
    const [visible, setVisible] = useState(false);
    const color = COLORS[toast.type] ?? COLORS.info;

    // mount animation
    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => onRemove(toast.id), 300);
    };

    return (
        <div
            onClick={handleClose}
            style={{
                display:       'flex',
                alignItems:    'center',
                gap:           '10px',
                background:    '#1e1e1e',
                border:        `1px solid ${color.bg}`,
                borderLeft:    `4px solid ${color.bg}`,
                borderRadius:  '8px',
                padding:       '12px 14px',
                minWidth:      '280px',
                maxWidth:      '380px',
                boxShadow:     '0 4px 20px rgba(0,0,0,0.35)',
                cursor:        'pointer',
                userSelect:    'none',
                // Animasi slide-in dari kanan
                transform:     visible ? 'translateX(0)' : 'translateX(110%)',
                opacity:       visible ? 1 : 0,
                transition:    'transform 0.3s cubic-bezier(.22,.68,0,1.2), opacity 0.3s ease',
            }}
        >
            {/* Icon badge */}
            <span style={{
                background:    color.bg,
                color:         'white',
                borderRadius:  '50%',
                width:         '24px',
                height:        '24px',
                display:       'flex',
                alignItems:    'center',
                justifyContent:'center',
                fontWeight:    'bold',
                fontSize:      '12px',
                flexShrink:    0,
            }}>
                {ICONS[toast.type]}
            </span>

            {/* Pesan */}
            <span style={{ color: '#f1f5f9', fontSize: '13px', lineHeight: '1.4', flex: 1 }}>
                {toast.message}
            </span>

            {/* Tombol close */}
            <span style={{ color: '#64748b', fontSize: '16px', lineHeight: 1 }}>✕</span>
        </div>
    );
}

/* ─── Toast Container (taruh sekali di root layout) ─────────────────── */
export function ToastContainer({ toasts, onRemove }) {
    return (
        <div style={{
            position:      'fixed',
            bottom:        '24px',
            right:         '24px',
            zIndex:        9999,
            display:       'flex',
            flexDirection: 'column',
            gap:           '10px',
            pointerEvents: 'none',
        }}>
            {toasts.map(t => (
                <div key={t.id} style={{ pointerEvents: 'auto' }}>
                    <ToastItem toast={t} onRemove={onRemove} />
                </div>
            ))}
        </div>
    );
}

/* ─── Confirm Dialog (pengganti window.confirm) ──────────────────────── */
export function ConfirmDialog({ confirm }) {
    if (!confirm) return null;

    return (
        // Overlay
        <div style={{
            position:        'fixed',
            inset:           0,
            background:      'rgba(0,0,0,0.55)',
            zIndex:          10000,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            backdropFilter:  'blur(2px)',
        }}>
            <div style={{
                background:    '#1e1e1e',
                border:        '1px solid #374151',
                borderRadius:  '12px',
                padding:       '28px 32px',
                maxWidth:      '400px',
                width:         '90%',
                boxShadow:     '0 20px 60px rgba(0,0,0,0.5)',
                animation:     'confirmPop 0.2s cubic-bezier(.22,.68,0,1.2)',
            }}>
                {/* Icon */}
                <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '32px' }}>
                    🗑
                </div>

                {/* Pesan */}
                <p style={{
                    color:       '#f1f5f9',
                    textAlign:   'center',
                    marginBottom:'24px',
                    fontSize:    '14px',
                    lineHeight:  '1.6',
                }}>
                    {confirm.message}
                </p>

                {/* Tombol */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button
                        onClick={confirm.onNo}
                        style={{
                            flex:          1,
                            padding:       '10px',
                            borderRadius:  '6px',
                            border:        '1px solid #374151',
                            background:    'transparent',
                            color:         '#94a3b8',
                            fontWeight:    'bold',
                            fontSize:      '13px',
                            cursor:        'pointer',
                        }}
                    >
                        Batal
                    </button>
                    <button
                        onClick={confirm.onYes}
                        style={{
                            flex:          1,
                            padding:       '10px',
                            borderRadius:  '6px',
                            border:        'none',
                            background:    '#dc2626',
                            color:         'white',
                            fontWeight:    'bold',
                            fontSize:      '13px',
                            cursor:        'pointer',
                        }}
                    >
                        Hapus
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes confirmPop {
                    from { transform: scale(0.85); opacity: 0; }
                    to   { transform: scale(1);    opacity: 1; }
                }
            `}</style>
        </div>
    );
}