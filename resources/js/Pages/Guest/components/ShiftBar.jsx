import { SHIFT_SESSIONS } from '../../../Constants/options';

export default function ShiftBar({ shiftActive, shiftInp, activeShiftInfo, onInputChange, onStart, onLogout }) {
    return (
        <div className="shift-header">
            {!shiftActive ? (
                <ShiftForm shiftInp={shiftInp} onInputChange={onInputChange} onStart={onStart} />
            ) : (
                <ShiftInfo activeShiftInfo={activeShiftInfo} onLogout={onLogout} />
            )}
        </div>
    );
}

function ShiftForm({ shiftInp, onInputChange, onStart }) {
    return (
        <>
            <div className="inp-group">
                Admin
                <input
                    className="inp-s"
                    value={shiftInp.name}
                    onChange={e => onInputChange('name', e.target.value)}
                />
            </div>
            <div className="inp-group">
                Shift
                <select
                    className="inp-s"
                    value={shiftInp.session}
                    onChange={e => onInputChange('session', e.target.value)}
                >
                    {SHIFT_SESSIONS.map(s => <option key={s}>{s}</option>)}
                </select>
            </div>
            <div className="inp-group">
                Tanggal
                <input
                    className="inp-s"
                    type="date"
                    value={shiftInp.date}
                    onChange={e => onInputChange('date', e.target.value)}
                />
            </div>
            <button
                onClick={onStart}
                style={{
                    flex: '1', background: '#2563eb', color: 'white',
                    padding: '10px', borderRadius: '6px', border: 'none',
                    fontWeight: 'bold', cursor: 'pointer',
                }}
            >
                MULAI SHIFT
            </button>
        </>
    );
}

function ShiftInfo({ activeShiftInfo, onLogout }) {
    return (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <strong>{activeShiftInfo.session} - {activeShiftInfo.name}</strong>{' '}
                <small>({activeShiftInfo.date})</small>
            </div>
            <button
                onClick={onLogout}
                style={{
                    background: '#dc2626', color: 'white', padding: '8px 12px',
                    borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold',
                }}
            >
                LOG OUT
            </button>
        </div>
    );
}