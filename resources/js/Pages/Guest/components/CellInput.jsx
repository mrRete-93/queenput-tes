import { Highlight } from '../utils/Highlight';

/**
 * Input transparan untuk sel tabel.
 * Ketika `query` diberikan dan sel tidak sedang diedit (disabled atau read mode),
 * tampilkan teks dengan highlight — bukan input biasa.
 */
export default function CellInput({ value, disabled, type = 'text', onChange, onBlur, style, query }) {
    // Tampilkan highlight overlay jika ada query dan sel tidak aktif diedit
    if (query && disabled) {
        return (
            <div style={{ padding: '0 10px', height: '100%', display: 'flex', alignItems: 'center', ...style }}>
                <Highlight text={value} query={query} />
            </div>
        );
    }

    return (
        <input
            className="ci"
            type={type}
            value={value}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            style={style}
        />
    );
}