import CellInput    from './CellInput';
import ActionButton from './ActionButton';
import { GUEST_HEAD_COLS, GUEST_TAIL_COLS } from '../../../Constants/columns';

export default function GuestRow({ g, tab, getVal, onEdit, onNewRowChange, onBlur, onSave, onToggleStatus, query }) {
    const isSaved     = !!g.id;
    const isOut       = g.status === 'checkout';
    const isDbCheckin = isSaved && !isOut;

    const handleChange = (key, value) => {
        if (isDbCheckin) onEdit(g.id, key, value);
        else onNewRowChange(g._id, key, value);
    };

    const textVal = (key) =>
        isDbCheckin ? getVal(g, key) : (g[key] ?? '');

    const numVal = (key) =>
        isDbCheckin ? getVal(g, key) : (g[key] ? Number(g[key]) : '');

    return (
        <tr style={{ background: isSaved ? (isOut ? '#fee2e2' : '#fff') : '#fffbeb' }}>
            {GUEST_HEAD_COLS.map(col => (
                <td key={col.key} className="td">
                    <CellInput
                        value={textVal(col.key)}
                        disabled={isOut}
                        query={query}
                        onChange={e => handleChange(col.key, e.target.value)}
                        onBlur={() => isDbCheckin && onBlur(g)}
                        style={{
                            color:      isOut ? '#dc2626' : '#000',
                            fontWeight: isSaved ? 'bold' : 'normal',
                        }}
                    />
                </td>
            ))}

            {tab === 'reguler' ? (
                <td className="td">
                    <CellInput
                        type="number"
                        value={numVal('total_bayar')}
                        disabled={isOut}
                        query={query}
                        onChange={e => handleChange('total_bayar', e.target.value)}
                        onBlur={() => isDbCheckin && onBlur(g)}
                    />
                </td>
            ) : (
                <>
                    {['prepaid', 'pah'].map(key => (
                        <td key={key} className="td">
                            <CellInput
                                type="number"
                                value={numVal(key)}
                                disabled={isOut}
                                query={query}
                                onChange={e => handleChange(key, e.target.value)}
                                onBlur={() => isDbCheckin && onBlur(g)}
                            />
                        </td>
                    ))}
                </>
            )}

            {GUEST_TAIL_COLS.map(col => (
                <td key={col.key} className="td">
                    <CellInput
                        value={textVal(col.key)}
                        disabled={isOut}
                        query={query}
                        onChange={e => handleChange(col.key, e.target.value)}
                        onBlur={() => isDbCheckin && onBlur(g)}
                    />
                </td>
            ))}

            <td className="td" style={{ textAlign: 'center' }}>
                {!isSaved ? (
                    <ActionButton label="SIMPAN" onClick={() => onSave(g)} color="#16a34a" />
                ) : (
                    <button
                        onClick={() => onToggleStatus(g)}
                        style={{
                            background:   isOut ? '#ef4444' : '#3b82f6',
                            color:        'white',
                            border:       'none',
                            padding:      '5px 10px',
                            borderRadius: '4px',
                            fontSize:     '10px',
                            fontWeight:   'bold',
                            width:        '85px',
                            cursor:       'pointer',
                        }}
                    >
                        {isOut ? 'OUT ✓' : 'IN ✓'}
                    </button>
                )}
            </td>
        </tr>
    );
}