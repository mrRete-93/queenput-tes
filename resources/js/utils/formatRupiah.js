export const formatRupiah = (value) =>
    (!value && value !== 0)
        ? '—'
        : 'Rp ' + Number(value).toLocaleString('id-ID');
 