/**
 * Memecah teks dan membungkus bagian yang cocok dengan query dalam <mark>.
 * Return array of React elements.
 */
export function Highlight({ text, query }) {
    if (!query || !text) return <>{text}</>;

    const str   = String(text);
    const q     = query.toLowerCase();
    const idx   = str.toLowerCase().indexOf(q);

    if (idx === -1) return <>{str}</>;

    return (
        <>
            {str.slice(0, idx)}
            <mark className="hl">{str.slice(idx, idx + q.length)}</mark>
            <Highlight text={str.slice(idx + q.length)} query={query} />
        </>
    );
}