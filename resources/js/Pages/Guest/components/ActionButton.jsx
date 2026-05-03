export default function ActionButton({ label, onClick, disabled = false, color }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                color:        'white',
                border:       'none',
                borderRadius: '4px',
                fontWeight:   'bold',
                padding:      '6px 12px',
                background:   color,
                cursor:       disabled ? 'not-allowed' : 'pointer',
            }}
        >
            {label}
        </button>
    );
}