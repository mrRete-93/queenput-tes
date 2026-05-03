import { formatRupiah } from '../utils/formatRupiah';

export default function SeparatorRow({ row, tab }) {
    const leftSpan  = tab === 'expense' ? 2 : 4;
    const rightSpan = tab === 'expense' ? 2 : 5;

    return (
        <tr className="tr-sep">
            <td colSpan={leftSpan} className="td-sep">
                SHIFT: {row.date} | {row.name}
            </td>
            <td className="td-total">{formatRupiah(row.total)}</td>
            <td colSpan={rightSpan}></td>
        </tr>
    );
}