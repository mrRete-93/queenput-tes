import{r as g,j as e,a as _,H as Z}from"./app-56i2WLiC.js";import{A as ee}from"./AuthenticatedLayout-BWf_4r3c.js";import{T as te,S as ae}from"./ShiftBar-BsAcZ8p5.js";import ne from"./GuestTable-By4ENXC6.js";import"./SeparatorRow-B5a7VCUs.js";import"./ExpenseRow--1TV979d.js";import"./CellInput-DD1g7c1G.js";import"./Highlight-DYaLDlxW.js";import"./ActionButton-DK7dOOOr.js";import"./columns-CW60DRxi.js";import"./GuestRow-CcK1xwaP.js";function re(){const[t,l]=g.useState([]),[p,d]=g.useState(null),b=g.useRef(0),a=g.useCallback((r,o="info",u=3500)=>{const m=++b.current;l(f=>[...f,{id:m,message:r,type:o}]),setTimeout(()=>n(m),u)},[]),n=g.useCallback(r=>{l(o=>o.filter(u=>u.id!==r))},[]),c=g.useCallback(r=>new Promise(o=>{d({message:r,onYes:()=>{d(null),o(!0)},onNo:()=>{d(null),o(!1)}})}),[]);return{toast:{success:(r,o)=>a(r,"success",o),error:(r,o)=>a(r,"error",o??5e3),warning:(r,o)=>a(r,"warning",o),info:(r,o)=>a(r,"info",o)},toasts:t,removeToast:n,confirm:p,showConfirm:c}}const oe={success:"✓",error:"✕",warning:"⚠",info:"ℹ"},$={success:{bg:"#16a34a",bar:"#bbf7d0"},error:{bg:"#dc2626",bar:"#fecaca"},warning:{bg:"#d97706",bar:"#fde68a"},info:{bg:"#2563eb",bar:"#bfdbfe"}};function se({toast:t,onRemove:l}){const[p,d]=g.useState(!1),b=$[t.type]??$.info;g.useEffect(()=>{requestAnimationFrame(()=>d(!0))},[]);const a=()=>{d(!1),setTimeout(()=>l(t.id),300)};return e.jsxs("div",{onClick:a,style:{display:"flex",alignItems:"center",gap:"10px",background:"#1e1e1e",border:`1px solid ${b.bg}`,borderLeft:`4px solid ${b.bg}`,borderRadius:"8px",padding:"12px 14px",minWidth:"280px",maxWidth:"380px",boxShadow:"0 4px 20px rgba(0,0,0,0.35)",cursor:"pointer",userSelect:"none",transform:p?"translateX(0)":"translateX(110%)",opacity:p?1:0,transition:"transform 0.3s cubic-bezier(.22,.68,0,1.2), opacity 0.3s ease"},children:[e.jsx("span",{style:{background:b.bg,color:"white",borderRadius:"50%",width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",fontSize:"12px",flexShrink:0},children:oe[t.type]}),e.jsx("span",{style:{color:"#f1f5f9",fontSize:"13px",lineHeight:"1.4",flex:1},children:t.message}),e.jsx("span",{style:{color:"#64748b",fontSize:"16px",lineHeight:1},children:"✕"})]})}function ie({toasts:t,onRemove:l}){return e.jsx("div",{style:{position:"fixed",bottom:"24px",right:"24px",zIndex:9999,display:"flex",flexDirection:"column",gap:"10px",pointerEvents:"none"},children:t.map(p=>e.jsx("div",{style:{pointerEvents:"auto"},children:e.jsx(se,{toast:p,onRemove:l})},p.id))})}function le({confirm:t}){return t?e.jsxs("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:1e4,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(2px)"},children:[e.jsxs("div",{style:{background:"#1e1e1e",border:"1px solid #374151",borderRadius:"12px",padding:"28px 32px",maxWidth:"400px",width:"90%",boxShadow:"0 20px 60px rgba(0,0,0,0.5)",animation:"confirmPop 0.2s cubic-bezier(.22,.68,0,1.2)"},children:[e.jsx("div",{style:{textAlign:"center",marginBottom:"16px",fontSize:"32px"},children:"🗑"}),e.jsx("p",{style:{color:"#f1f5f9",textAlign:"center",marginBottom:"24px",fontSize:"14px",lineHeight:"1.6"},children:t.message}),e.jsxs("div",{style:{display:"flex",gap:"10px",justifyContent:"center"},children:[e.jsx("button",{onClick:t.onNo,style:{flex:1,padding:"10px",borderRadius:"6px",border:"1px solid #374151",background:"transparent",color:"#94a3b8",fontWeight:"bold",fontSize:"13px",cursor:"pointer"},children:"Batal"}),e.jsx("button",{onClick:t.onYes,style:{flex:1,padding:"10px",borderRadius:"6px",border:"none",background:"#dc2626",color:"white",fontWeight:"bold",fontSize:"13px",cursor:"pointer"},children:"Hapus"})]})]}),e.jsx("style",{children:`
                @keyframes confirmPop {
                    from { transform: scale(0.85); opacity: 0; }
                    to   { transform: scale(1);    opacity: 1; }
                }
            `})]}):null}function de({mode:t="bulan",month:l,year:p,start:d,end:b}){const[a,n]=g.useState(!1),[c,k]=g.useState(t),[r,o]=g.useState(d??""),[u,m]=g.useState(b??""),f=()=>{n(!0);const w=c==="bulan"?{month:l,year:p}:{start:r,end:u},j=route("laporan.pdf")+"?"+new URLSearchParams(w).toString();window.open(j,"_blank"),setTimeout(()=>n(!1),2e3)},x=c==="bulan"?!!(l&&p):!!(r&&u&&r<=u);return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("select",{value:c,onChange:w=>k(w.target.value),style:{fontSize:12,padding:"4px 8px",borderRadius:6,border:"1px solid #d1d5db"},children:[e.jsx("option",{value:"bulan",children:"Bulan ini"}),e.jsx("option",{value:"range",children:"Custom range"})]}),c==="range"&&e.jsxs(e.Fragment,{children:[e.jsx("input",{type:"date",value:r,onChange:w=>o(w.target.value),style:{fontSize:12,padding:"4px 6px",borderRadius:6,border:"1px solid #d1d5db"}}),e.jsx("span",{style:{fontSize:12,color:"#6b7280"},children:"–"}),e.jsx("input",{type:"date",value:u,min:r,onChange:w=>m(w.target.value),style:{fontSize:12,padding:"4px 6px",borderRadius:6,border:"1px solid #d1d5db"}})]}),e.jsx("button",{onClick:f,disabled:!x||a,style:{fontSize:12,padding:"5px 14px",borderRadius:6,border:"none",background:x&&!a?"#2563eb":"#e5e7eb",color:x&&!a?"#fff":"#9ca3af",cursor:x&&!a?"pointer":"not-allowed",display:"flex",alignItems:"center",gap:5},children:a?"⏳ Loading...":"⬇ Cetak PDF"})]})}const pe=`
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
`,N="active_shift";function ce(t){const[l,p]=g.useState({name:"",date:new Date().toISOString().split("T")[0],session:"Pagi"}),d=()=>{const o=localStorage.getItem(N);if(!o)return null;const u=JSON.parse(o);return!t||t.role==="owner"||u.userId===t.id?u:null},[b,a]=g.useState(d),[n,c]=g.useState(()=>!!d());return{shiftActive:n,activeShiftInfo:b,shiftInp:l,handleInputChange:(o,u)=>p(m=>({...m,[o]:u})),startShift:()=>{if(!l.name||!t?.id){alert("User belum siap / belum login");return}const o={...l,userId:t.id,startTime:new Date().toISOString()};localStorage.setItem(N,JSON.stringify(o)),a(o),c(!0)},endShift:o=>{localStorage.removeItem(N),c(!1),a(null),o?.()}}}function ue(){const[t,l]=g.useState({});return{getVal:(n,c)=>t[n.id]?.[c]!==void 0?t[n.id][c]:n[c]??"",setEdit:(n,c,k)=>l(r=>({...r,[n]:{...r[n]??{},[c]:k}})),clearEdit:n=>l(c=>{const k={...c};return delete k[n],k}),getBuffer:n=>t[n]??null}}const ge=["nomor_kamar","nama_tamu","tanggal_checkin","tanggal_checkout","total_bayar","alamat","nik","keterangan","shift_admin","tanggal_input","prepaid","pah","platform"],fe=["nama_barang","harga","keterangan","shift_admin","tanggal_input"];function xe(t,l,p){if(!l)return!0;const d=l.toLowerCase();return(p==="expense"?fe:ge).some(a=>String(t[a]??"").toLowerCase().includes(d))}function be(t,l,p,d,b,a,n=""){return g.useMemo(()=>{const c=d==="reguler"?t:d==="ota"?l:p,k=b.map(f=>({...f,shift_admin:a?`${a.session}-${a.name}`:"",tanggal_input:a?.date??"",status:"checkin"})),r=new Map;c.forEach(f=>{const x=`${f.tanggal_input}-${f.shift_admin}`;r.has(x)||r.set(x,[]),r.get(x).push(f)});let o=[];const u=[];if(r.forEach((f,x)=>{a&&x===`${a.date}-${a.session}-${a.name}`?o=f:u.push({key:x,rows:f})}),a){const f=`${a.date}-${a.session}-${a.name}`;u.push({key:f,rows:[...o,...k]})}const m=[];return u.forEach(({rows:f})=>{const x=f.filter(h=>h._id||xe(h,n,d));if(x.length===0)return;let w=0,j=0;x.forEach(h=>{j++,m.push({...h,_rowIndex:j});const z=d==="expense"?h.harga:d==="reguler"?h.total_bayar:Number(h.prepaid??0)+Number(h.pah??0);w+=Number(z??0)});const C=x[x.length-1];m.push({isSeparator:!0,name:C.shift_admin??"",total:w,date:C.tanggal_input??""})}),m},[t,l,p,d,b,a,n])}const he={reguler:["guests"],ota:["appGuests"],expense:["expenses"]};function me({query:t,onChange:l,resultCount:p}){return e.jsxs("div",{className:"search-bar",children:[e.jsx("span",{className:"search-icon",children:"🔍"}),e.jsx("input",{className:"search-inp",type:"text",placeholder:"Cari nama tamu, nomor kamar, atau keterangan...",value:t,onChange:d=>l(d.target.value),autoComplete:"off"}),t&&e.jsxs("div",{className:"search-meta",children:[e.jsxs("span",{className:"search-count",children:[p," hasil"]}),e.jsx("button",{className:"search-clear",onClick:()=>l(""),title:"Hapus",children:"✕"})]})]})}function Te({auth:t,guests:l=[],appGuests:p=[],expenses:d=[],selectedMonth:b,selectedYear:a}){const[n,c]=g.useState("reguler"),[k,r]=g.useState([]),[o,u]=g.useState(""),{toast:m,toasts:f,removeToast:x,confirm:w,showConfirm:j}=re(),{shiftActive:C,activeShiftInfo:h,shiftInp:z,handleInputChange:O,startShift:L,endShift:H}=ce(t?.user),{getVal:P,setEdit:F,clearEdit:M,getBuffer:G}=ue(),B=be(l,p,d,n,k,h,o),W=B.filter(s=>!s.isSeparator).length,Y=s=>{c(s),r([]),u("")},V=()=>r(s=>[...s,{_id:Math.random().toString(36).slice(2)}]),K=(s,i,y)=>r(E=>E.map(v=>v._id===s?{...v,[i]:y}:v)),R=g.useCallback(()=>_.reload({only:he[n]??[],preserveScroll:!0}),[n]),T=()=>({shift_admin:`${h.session}-${h.name}`,tanggal_input:h.date,month:b,year:a}),I=(s,i)=>({reguler:{update:"guest.update",store:"guest.store",status:"guest.status"},ota:{update:"app-guest.update",store:"app-guest.store",status:"app-guest.status"}})[s]?.[i]??null,D=(s,i)=>s==="ota"?{appGuest:i.id}:{guest:i.id},Q=s=>{const i=G(s.id);!i||Object.keys(i).length===0||_.patch(route(I(n,"update"),D(n,s)),{...i,...T()},{preserveScroll:!0,onSuccess:()=>{M(s.id),R()}})},X=s=>{if(!h){m.warning("Shift harus aktif untuk menyimpan data!");return}const i=k.find(S=>S._id===s);if(!i)return;console.log("SHIFT:",h);const y=T();if(n==="expense"){_.post(route("pengeluaran.store"),{user_id:t.user.id,nama_barang:i.nama_barang||"",harga:i.harga||0,keterangan:i.keterangan||"",...y},{preserveScroll:!0,onSuccess:()=>{r(S=>S.filter(A=>A._id!==s)),R()}});return}const v=n==="ota"?"app-guest.store":"guest.store",q={user_id:t.user.id,nomor_kamar:i.nomor_kamar??"",nama_tamu:i.nama_tamu??"",tanggal_checkin:i.tanggal_checkin??y.tanggal_input,tanggal_checkout:i.tanggal_checkout??"",alamat:i.alamat??"",nik:i.nik??"",keterangan:i.keterangan??"",total_bayar:i.total_bayar??0,prepaid:i.prepaid??0,pah:i.pah??0,platform:i.platform??"Other",...y};_.post(route(v),q,{preserveScroll:!0,onSuccess:()=>{r(S=>S.filter(A=>A._id!==s)),R()},onError:S=>{console.error("Gagal simpan:",S),m.error("Cek kembali inputan: "+Object.values(S).join(", "))}})},J=async s=>{if(!await j(`Hapus data "${s.nama_tamu||s.nama_barang||"ini"}"?`))return;const y={reguler:{name:"guest.destroy",params:{guest:s.id}},ota:{name:"app-guest.destroy",params:{appGuest:s.id}},expense:{name:"pengeluaran.destroy",params:{pengeluaran:s.id}}},{name:E,params:v}=y[n];_.delete(route(E,v),{preserveScroll:!0,onSuccess:()=>{m.success("Data berhasil dihapus."),R()}})},U=s=>{if(n==="expense")return;const i=s.status==="checkout"?"checkin":"checkout";_.patch(route(I(n,"status"),D(n,s)),{status:i,...T()},{preserveScroll:!0,onSuccess:R})};return e.jsxs(e.Fragment,{children:[e.jsxs(ee,{user:t?.user,children:[e.jsx(Z,{title:"Queenput - Admin"}),e.jsx("style",{children:pe}),e.jsxs("div",{className:"pg",children:[e.jsx("div",{className:"tabs",children:te.map(s=>e.jsx("button",{className:`tab-btn ${n===s.key?"tab-active":"tab-inactive"}`,onClick:()=>Y(s.key),children:s.label},s.key))}),e.jsx(ae,{shiftActive:C,shiftInp:z,activeShiftInfo:h,onInputChange:O,onStart:L,onEndShift:()=>H()}),e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx(me,{query:o,onChange:u,resultCount:W}),e.jsx(de,{mode:"bulan",month:b,year:a})]}),e.jsx(ne,{tab:n,displayedRows:B,getVal:P,onEdit:F,onNewRowChange:K,onBlur:Q,onSave:X,onToggleStatus:U,onDelete:J,query:o})]}),C&&e.jsx("button",{className:"btn-add-floating",onClick:V,children:"＋ TAMBAH BARIS"})]}),e.jsx(ie,{toasts:f,onRemove:x}),e.jsx(le,{confirm:w})]})}export{Te as default};
