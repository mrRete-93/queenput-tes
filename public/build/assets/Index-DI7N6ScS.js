import{r as x,j as r,a as _,H as Q}from"./app-BYcjejbU.js";import{A as J}from"./AuthenticatedLayout-Ez7ZVXEW.js";import{T as U,S as W}from"./ShiftBar-BGmv78du.js";import X from"./GuestTable-CGMuW9xh.js";import"./SeparatorRow-ClDrim6m.js";import"./ExpenseRow-CU4X4RcH.js";import"./CellInput-p4pVDjWr.js";import"./Highlight-D5ox2VUG.js";import"./ActionButton-C8fLfYT3.js";import"./columns-CW60DRxi.js";import"./GuestRow-h1tAk1zo.js";function Z({mode:o="bulan",month:i,year:f,start:p,end:m}){const[n,t]=x.useState(!1),[d,b]=x.useState(o),[l,c]=x.useState(p??""),[g,k]=x.useState(m??""),s=()=>{t(!0);const h=d==="bulan"?{month:i,year:f}:{start:l,end:g},v=route("laporan.pdf")+"?"+new URLSearchParams(h).toString();window.open(v,"_blank"),setTimeout(()=>t(!1),2e3)},u=d==="bulan"?!!(i&&f):!!(l&&g&&l<=g);return r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[r.jsxs("select",{value:d,onChange:h=>b(h.target.value),style:{fontSize:12,padding:"4px 8px",borderRadius:6,border:"1px solid #d1d5db"},children:[r.jsx("option",{value:"bulan",children:"Bulan ini"}),r.jsx("option",{value:"range",children:"Custom range"})]}),d==="range"&&r.jsxs(r.Fragment,{children:[r.jsx("input",{type:"date",value:l,onChange:h=>c(h.target.value),style:{fontSize:12,padding:"4px 6px",borderRadius:6,border:"1px solid #d1d5db"}}),r.jsx("span",{style:{fontSize:12,color:"#6b7280"},children:"–"}),r.jsx("input",{type:"date",value:g,min:l,onChange:h=>k(h.target.value),style:{fontSize:12,padding:"4px 6px",borderRadius:6,border:"1px solid #d1d5db"}})]}),r.jsx("button",{onClick:s,disabled:!u||n,style:{fontSize:12,padding:"5px 14px",borderRadius:6,border:"none",background:u&&!n?"#2563eb":"#e5e7eb",color:u&&!n?"#fff":"#9ca3af",cursor:u&&!n?"pointer":"not-allowed",display:"flex",alignItems:"center",gap:5},children:n?"⏳ Loading...":"⬇ Cetak PDF"})]})}const q=`
    /* ── Reset & root ───────────────────────────────────────────── */
    * { box-sizing: border-box; }

    /*
     * Layout utama: flex column mengisi tinggi viewport penuh.
     * Dengan ini setiap child punya height terdefinisi dan
     * .tbl-wrap bisa pakai flex:1 untuk mengisi sisa ruang —
     * tidak perlu lagi calc() yang rawan meleset.
     */
    .pg {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 64px); /* kurangi tinggi navbar AuthenticatedLayout */
        overflow: hidden;
        background: #f1f5f9;
        font-family: 'Segoe UI', system-ui, sans-serif;
    }

    /* ── Tabs ───────────────────────────────────────────────────── */
    .tabs {
        display: flex;
        gap: 2px;
        background: #e2e8f0;
        padding: 6px 12px 0;
        flex-shrink: 0; /* tidak menyusut */
    }
    .tab-btn {
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        border-radius: 8px 8px 0 0;
        font-weight: 700;
        font-size: 11px;
        letter-spacing: 0.5px;
        transition: background 0.15s, color 0.15s;
    }
    .tab-active   { background: white; color: #2563eb; box-shadow: 0 -2px 0 #2563eb inset; }
    .tab-inactive { background: #cbd5e1; color: #64748b; }
    .tab-inactive:hover { background: #e2e8f0; }

    /* ── Shift header ───────────────────────────────────────────── */
    .shift-header {
        background: #0f172a;
        color: white;
        padding: 12px 16px;
        display: flex;
        align-items: flex-end;
        gap: 10px;
        flex-shrink: 0; /* tidak menyusut */
        border-bottom: 2px solid #1e293b;
    }
    .inp-group { display: flex; flex-direction: column; flex: 1; min-width: 120px; gap: 4px; font-size: 11px; font-weight: 600; color: #94a3b8; letter-spacing: 0.5px; }
    .inp-s     { background: #1e293b; border: 1px solid #334155; padding: 8px 10px; border-radius: 6px; color: white; width: 100%; font-size: 13px; }
    .inp-s:focus { outline: none; border-color: #3b82f6; }

    /* ── Tabel wrapper — mengisi sisa ruang ─────────────────────── */
    .tbl-wrap {
        flex: 1;           /* ambil semua sisa tinggi setelah tabs + shift-header */
        overflow-x: auto;
        overflow-y: auto;
        background: white;
        margin: 0 12px 12px;
        border: 1px solid #e2e8f0;
        border-radius: 0 0 10px 10px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }

    /* ── Tabel ──────────────────────────────────────────────────── */
    .tbl {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        font-size: 13px;
        min-width: 1100px;
    }

    /* thead sticky relatif terhadap .tbl-wrap — selalu kelihatan */
    .th {
        background: #f8fafc;
        padding: 11px 10px;
        border-bottom: 2px solid #e2e8f0;
        text-align: left;
        position: sticky;
        top: 0;
        z-index: 50;
        font-size: 11px;
        font-weight: 700;
        color: #475569;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        white-space: nowrap;
    }

    .td { border-bottom: 1px solid #f1f5f9; height: 48px; }

    /* Row hover */
    tbody tr:hover td { background: #f8fafc; }

    .ci       { width: 100%; height: 100%; border: none; padding: 0 10px; background: transparent; outline: none; font-size: 13px; color: #1e293b; }
    .ci:focus { background: #eff6ff; border-radius: 4px; }

    /* ── Separator row (shift divider) ─────────────────────────── */
    .tr-sep   { background: #1e293b !important; }
    .tr-sep:hover td { background: #1e293b !important; }
    .td-sep   { padding: 10px 12px; font-weight: 700; font-size: 11px; color: #94a3b8; letter-spacing: 0.5px; }
    .td-total { text-align: right; padding-right: 16px; color: #34d399; font-family: 'Courier New', monospace; font-size: 14px; font-weight: 700; }

    /* ── Delete button (muncul saat row di-hover) ───────────────── */
    .td-aksi {
        text-align: center;
        white-space: nowrap;
        padding: 0 8px;
    }
    .aksi-wrap {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 100%;
        height: 100%;
    }
    .btn-delete {
        opacity: 0;
        pointer-events: none;
        background: #fc1313;
        border: none;
        cursor: pointer;
        color: #fee2e2;
        text-weight: bold;
        font-size: 16px;
        padding: 5px 6px;
        border-radius: 6px;
        line-height: 1;
        transition: opacity .15s, color .15s, background .15s;
        flex-shrink: 0;
    }
    tr:hover .btn-delete   { opacity: 1; pointer-events: auto; }
    .btn-delete:hover      { color: #ed1414; background: #fee2e2; }

    /* ── Floating add button ────────────────────────────────────── */
    .btn-add-floating {
        position: fixed;
        bottom: 28px;
        right: 28px;
        z-index: 1100;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 14px 24px;
        background: #1e293b;
        color: white;
        border: none;
        border-radius: 50px;
        font-weight: 700;
        font-size: 13px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        letter-spacing: 0.5px;
    }
    .btn-add-floating:hover  { background: #2563eb; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(37,99,235,0.4); }
    .btn-add-floating:active { transform: translateY(0); }

    /* Container Utama Pencarian & Aksi */
.search-action-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;
    background: #f8fafc; /* Background sangat tipis agar beda dengan tabel */
    padding: 12px;
    border-radius: 12px;
}

/* Search Bar Wrapper */
    .search-bar {
        display: flex;
        align-items: center;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 0 12px;
        height: 42px; /* Tinggi yang konsisten */
        flex: 1; /* Biar memanjang memenuhi ruang */
        max-width: 600px;
        transition: all 0.2s ease;
    }

    .search-bar:focus-within {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .search-icon {
        font-size: 16px;
        margin-right: 10px;
        filter: grayscale(1); /* Membuat emoji kaca pembesar lebih elegan */
    }

    .search-inp {
        border: none;
        outline: none;
        width: 100%;
        font-size: 14px;
        color: #334155;
    }

    /* Hasil & Clear Button */
    .search-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        border-left: 1px solid #e2e8f0;
        padding-left: 10px;
    }

    .search-count {
        font-size: 12px;
        color: #64748b;
        background: #f1f5f9;
        padding: 2px 8px;
        border-radius: 4px;
        white-space: nowrap;
    }

    .search-clear {
        background: #f1f5f9;
        border: none;
        color: #94a3b8;
        cursor: pointer;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        transition: all 0.2s;
    }

    .search-clear:hover {
        background: #fee2e2;
        color: #ef4444;
    }

    /* Bagian Tombol Laporan */
    .action-right {
        display: flex;
        align-items: center;
        gap: 12px;
    }
`,z="active_shift";function ee(o){const[i,f]=x.useState({name:"",date:new Date().toISOString().split("T")[0],session:"Pagi"}),p=()=>{const c=localStorage.getItem(z);if(!c)return null;const g=JSON.parse(c);return!o||o.role==="owner"||g.userId===o.id?g:null},[m,n]=x.useState(p),[t,d]=x.useState(()=>!!p());return{shiftActive:t,activeShiftInfo:m,shiftInp:i,handleInputChange:(c,g)=>f(k=>({...k,[c]:g})),startShift:()=>{if(!i.name||!o?.id){alert("User belum siap / belum login");return}const c={...i,userId:o.id,startTime:new Date().toISOString()};localStorage.setItem(z,JSON.stringify(c)),n(c),d(!0)},endShift:c=>{localStorage.removeItem(z),d(!1),n(null),c?.()}}}function te(){const[o,i]=x.useState({});return{getVal:(t,d)=>o[t.id]?.[d]!==void 0?o[t.id][d]:t[d]??"",setEdit:(t,d,b)=>i(l=>({...l,[t]:{...l[t]??{},[d]:b}})),clearEdit:t=>i(d=>{const b={...d};return delete b[t],b}),getBuffer:t=>o[t]??null}}const ae=["nomor_kamar","nama_tamu","tanggal_checkin","tanggal_checkout","total_bayar","alamat","nik","keterangan","shift_admin","tanggal_input","prepaid","pah","platform"],ne=["nama_barang","harga","keterangan","shift_admin","tanggal_input"];function re(o,i,f){if(!i)return!0;const p=i.toLowerCase();return(f==="expense"?ne:ae).some(n=>String(o[n]??"").toLowerCase().includes(p))}function oe(o,i,f,p,m,n,t=""){return x.useMemo(()=>{const d=p==="reguler"?o:p==="ota"?i:f,b=m.map(s=>({...s,shift_admin:n?`${n.session}-${n.name}`:"",tanggal_input:n?.date??"",status:"checkin"})),l=new Map;d.forEach(s=>{const u=`${s.tanggal_input}-${s.shift_admin}`;l.has(u)||l.set(u,[]),l.get(u).push(s)});let c=[];const g=[];if(l.forEach((s,u)=>{n&&u===`${n.date}-${n.session}-${n.name}`?c=s:g.push({key:u,rows:s})}),n){const s=`${n.date}-${n.session}-${n.name}`;g.push({key:s,rows:[...c,...b]})}const k=[];return g.forEach(({rows:s})=>{const u=s.filter(w=>w._id||re(w,t,p));if(u.length===0)return;let h=0,v=0;u.forEach(w=>{v++,k.push({...w,_rowIndex:v});const A=p==="expense"?w.harga:p==="reguler"?w.total_bayar:Number(w.prepaid??0)+Number(w.pah??0);h+=Number(A??0)});const C=u[u.length-1];k.push({isSeparator:!0,name:C.shift_admin??"",total:h,date:C.tanggal_input??""})}),k},[o,i,f,p,m,n,t])}const se={reguler:["guests"],ota:["appGuests"],expense:["expenses"]};function ie({query:o,onChange:i,resultCount:f}){return r.jsxs("div",{className:"search-bar",children:[r.jsx("span",{className:"search-icon",children:"🔍"}),r.jsx("input",{className:"search-inp",type:"text",placeholder:"Cari nama tamu, nomor kamar, atau keterangan...",value:o,onChange:p=>i(p.target.value),autoComplete:"off"}),o&&r.jsxs("div",{className:"search-meta",children:[r.jsxs("span",{className:"search-count",children:[f," hasil"]}),r.jsx("button",{className:"search-clear",onClick:()=>i(""),title:"Hapus",children:"✕"})]})]})}function ke({auth:o,guests:i=[],appGuests:f=[],expenses:p=[],selectedMonth:m,selectedYear:n}){const[t,d]=x.useState("reguler"),[b,l]=x.useState([]),[c,g]=x.useState(""),{shiftActive:k,activeShiftInfo:s,shiftInp:u,handleInputChange:h,startShift:v,endShift:C}=ee(o?.user),{getVal:w,setEdit:A,clearEdit:I,getBuffer:L}=te(),B=oe(i,f,p,t,b,s,c),O=B.filter(e=>!e.isSeparator).length,H=e=>{d(e),l([]),g("")},M=()=>l(e=>[...e,{_id:Math.random().toString(36).slice(2)}]),G=(e,a,S)=>l(R=>R.map(E=>E._id===e?{...E,[a]:S}:E)),j=x.useCallback(()=>_.reload({only:se[t]??[],preserveScroll:!0}),[t]),T=()=>({shift_admin:`${s.session}-${s.name}`,tanggal_input:s.date,month:m,year:n}),$=(e,a)=>({reguler:{update:"guest.update",store:"guest.store",status:"guest.status"},ota:{update:"app-guest.update",store:"app-guest.store",status:"app-guest.status"}})[e]?.[a]??null,D=(e,a)=>e==="ota"?{appGuest:a.id}:{guest:a.id},P=e=>{const a=L(e.id);!a||Object.keys(a).length===0||_.patch(route($(t,"update"),D(t,e)),{...a,...T()},{preserveScroll:!0,onSuccess:()=>{I(e.id),j()}})},F=e=>{if(!s){alert("Shift harus aktif untuk menyimpan data!");return}const a=b.find(y=>y._id===e);if(!a)return;console.log("SHIFT:",s);const S=T();if(t==="expense"){_.post(route("pengeluaran.store"),{user_id:o.user.id,nama_barang:a.nama_barang||"",harga:a.harga||0,keterangan:a.keterangan||"",...S},{preserveScroll:!0,onSuccess:()=>{l(y=>y.filter(N=>N._id!==e)),j()}});return}const E=t==="ota"?"app-guest.store":"guest.store",V={user_id:o.user.id,nomor_kamar:a.nomor_kamar??"",nama_tamu:a.nama_tamu??"",tanggal_checkin:a.tanggal_checkin??S.tanggal_input,tanggal_checkout:a.tanggal_checkout??"",alamat:a.alamat??"",nik:a.nik??"",keterangan:a.keterangan??"",total_bayar:a.total_bayar??0,prepaid:a.prepaid??0,pah:a.pah??0,platform:a.platform??"Other",...S};_.post(route(E),V,{preserveScroll:!0,onSuccess:()=>{l(y=>y.filter(N=>N._id!==e)),j()},onError:y=>{console.error("Gagal simpan:",y),alert("Cek kembali inputan: "+Object.values(y).join(", "))}})},Y=e=>{if(!window.confirm(`Hapus data "${e.nama_tamu||e.nama_barang||"ini"}"?`))return;const a={reguler:{name:"guest.destroy",params:{guest:e.id}},ota:{name:"app-guest.destroy",params:{appGuest:e.id}},expense:{name:"pengeluaran.destroy",params:{pengeluaran:e.id}}},{name:S,params:R}=a[t];_.delete(route(S,R),{preserveScroll:!0,onSuccess:j})},K=e=>{if(t==="expense")return;const a=e.status==="checkout"?"checkin":"checkout";_.patch(route($(t,"status"),D(t,e)),{status:a,...T()},{preserveScroll:!0,onSuccess:j})};return r.jsxs(J,{user:o?.user,children:[r.jsx(Q,{title:"Queenput - Admin"}),r.jsx("style",{children:q}),r.jsxs("div",{className:"pg",children:[r.jsx("div",{className:"tabs",children:U.map(e=>r.jsx("button",{className:`tab-btn ${t===e.key?"tab-active":"tab-inactive"}`,onClick:()=>H(e.key),children:e.label},e.key))}),r.jsx(W,{shiftActive:k,shiftInp:u,activeShiftInfo:s,onInputChange:h,onStart:v,onEndShift:()=>C()}),r.jsxs("div",{className:"flex items-center justify-between mb-2",children:[r.jsx(ie,{query:c,onChange:g,resultCount:O}),r.jsx(Z,{mode:"bulan",month:m,year:n})]}),r.jsx(X,{tab:t,displayedRows:B,getVal:w,onEdit:A,onNewRowChange:G,onBlur:P,onSave:F,onToggleStatus:K,onDelete:Y,query:c})]}),k&&r.jsx("button",{className:"btn-add-floating",onClick:M,children:"＋ TAMBAH BARIS"})]})}export{ke as default};
