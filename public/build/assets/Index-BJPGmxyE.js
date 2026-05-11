import{r as c,j as e,e as N,a as _,H as ee}from"./app-DwAIyxoT.js";import{A as te}from"./AuthenticatedLayout-C3RhBdPX.js";import{T as ae,S as ne}from"./ShiftBar-NIWwwm8R.js";import re from"./GuestTable-dPtmaeXs.js";import"./SeparatorRow-Bx9vKKe9.js";import"./ExpenseRow-BjfkGyHY.js";import"./CellInput-BBGWgrV5.js";import"./Highlight-BXSTg4c3.js";import"./ActionButton-oLBXE16e.js";import"./columns-CW60DRxi.js";import"./GuestRow-eA44z6Rc.js";function se(){const[a,o]=c.useState([]),[u,l]=c.useState(null),f=c.useRef(0),n=c.useCallback((r,d="info",b=3500)=>{const p=++f.current;o(g=>[...g,{id:p,message:r,type:d}]),setTimeout(()=>t(p),b)},[]),t=c.useCallback(r=>{o(d=>d.filter(b=>b.id!==r))},[]),x=c.useCallback(r=>new Promise(d=>{l({message:r,onYes:()=>{l(null),d(!0)},onNo:()=>{l(null),d(!1)}})}),[]);return{toast:{success:(r,d)=>n(r,"success",d),error:(r,d)=>n(r,"error",d??5e3),warning:(r,d)=>n(r,"warning",d),info:(r,d)=>n(r,"info",d)},toasts:a,removeToast:t,confirm:u,showConfirm:x}}const oe={success:"✓",error:"✕",warning:"⚠",info:"ℹ"},D={success:{bg:"#16a34a",bar:"#bbf7d0"},error:{bg:"#dc2626",bar:"#fecaca"},warning:{bg:"#d97706",bar:"#fde68a"},info:{bg:"#2563eb",bar:"#bfdbfe"}};function ie({toast:a,onRemove:o}){const[u,l]=c.useState(!1),f=D[a.type]??D.info;c.useEffect(()=>{requestAnimationFrame(()=>l(!0))},[]);const n=()=>{l(!1),setTimeout(()=>o(a.id),300)};return e.jsxs("div",{onClick:n,style:{display:"flex",alignItems:"center",gap:"10px",background:"#1e1e1e",border:`1px solid ${f.bg}`,borderLeft:`4px solid ${f.bg}`,borderRadius:"8px",padding:"12px 14px",minWidth:"280px",maxWidth:"380px",boxShadow:"0 4px 20px rgba(0,0,0,0.35)",cursor:"pointer",userSelect:"none",transform:u?"translateX(0)":"translateX(110%)",opacity:u?1:0,transition:"transform 0.3s cubic-bezier(.22,.68,0,1.2), opacity 0.3s ease"},children:[e.jsx("span",{style:{background:f.bg,color:"white",borderRadius:"50%",width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",fontSize:"12px",flexShrink:0},children:oe[a.type]}),e.jsx("span",{style:{color:"#f1f5f9",fontSize:"13px",lineHeight:"1.4",flex:1},children:a.message}),e.jsx("span",{style:{color:"#64748b",fontSize:"16px",lineHeight:1},children:"✕"})]})}function le({toasts:a,onRemove:o}){return e.jsx("div",{style:{position:"fixed",bottom:"24px",right:"24px",zIndex:9999,display:"flex",flexDirection:"column",gap:"10px",pointerEvents:"none"},children:a.map(u=>e.jsx("div",{style:{pointerEvents:"auto"},children:e.jsx(ie,{toast:u,onRemove:o})},u.id))})}function de({confirm:a}){return a?e.jsxs("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:1e4,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(2px)"},children:[e.jsxs("div",{style:{background:"#1e1e1e",border:"1px solid #374151",borderRadius:"12px",padding:"28px 32px",maxWidth:"400px",width:"90%",boxShadow:"0 20px 60px rgba(0,0,0,0.5)",animation:"confirmPop 0.2s cubic-bezier(.22,.68,0,1.2)"},children:[e.jsx("div",{style:{textAlign:"center",marginBottom:"16px",fontSize:"32px"},children:"🗑"}),e.jsx("p",{style:{color:"#f1f5f9",textAlign:"center",marginBottom:"24px",fontSize:"14px",lineHeight:"1.6"},children:a.message}),e.jsxs("div",{style:{display:"flex",gap:"10px",justifyContent:"center"},children:[e.jsx("button",{onClick:a.onNo,style:{flex:1,padding:"10px",borderRadius:"6px",border:"1px solid #374151",background:"transparent",color:"#94a3b8",fontWeight:"bold",fontSize:"13px",cursor:"pointer"},children:"Batal"}),e.jsx("button",{onClick:a.onYes,style:{flex:1,padding:"10px",borderRadius:"6px",border:"none",background:"#dc2626",color:"white",fontWeight:"bold",fontSize:"13px",cursor:"pointer"},children:"Hapus"})]})]}),e.jsx("style",{children:`
                @keyframes confirmPop {
                    from { transform: scale(0.85); opacity: 0; }
                    to   { transform: scale(1);    opacity: 1; }
                }
            `})]}):null}function pe({mode:a="bulan",month:o,year:u,start:l,end:f}){const[n,t]=c.useState(!1),[x,k]=c.useState(a),[r,d]=c.useState(l??""),[b,p]=c.useState(f??""),g=()=>{t(!0);const y=x==="bulan"?{month:o,year:u}:{start:r,end:b},j=route("laporan.pdf")+"?"+new URLSearchParams(y).toString();window.open(j,"_blank"),setTimeout(()=>t(!1),2e3)},h=x==="bulan"?!!(o&&u):!!(r&&b&&r<=b);return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("select",{value:x,onChange:y=>k(y.target.value),style:{fontSize:12,padding:"4px 8px",borderRadius:6,border:"1px solid #d1d5db"},children:[e.jsx("option",{value:"bulan",children:"Bulan ini"}),e.jsx("option",{value:"range",children:"Custom range"})]}),x==="range"&&e.jsxs(e.Fragment,{children:[e.jsx("input",{type:"date",value:r,onChange:y=>d(y.target.value),style:{fontSize:12,padding:"4px 6px",borderRadius:6,border:"1px solid #d1d5db"}}),e.jsx("span",{style:{fontSize:12,color:"#6b7280"},children:"–"}),e.jsx("input",{type:"date",value:b,min:r,onChange:y=>p(y.target.value),style:{fontSize:12,padding:"4px 6px",borderRadius:6,border:"1px solid #d1d5db"}})]}),e.jsx("button",{onClick:g,disabled:!h||n,style:{fontSize:12,padding:"5px 14px",borderRadius:6,border:"none",background:h&&!n?"#2563eb":"#e5e7eb",color:h&&!n?"#fff":"#9ca3af",cursor:h&&!n?"pointer":"not-allowed",display:"flex",alignItems:"center",gap:5},children:n?"⏳ Loading...":"⬇ Cetak PDF"})]})}const ce=`
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
`;function ue(a){const[o,u]=c.useState({name:a?.name??"",date:new Date().toISOString().split("T")[0],session:"Pagi"}),[l,f]=c.useState(null),[n,t]=c.useState(!1),[x,k]=c.useState(!0);return c.useEffect(()=>{N.get("/api/shift/current").then(p=>{p.data&&p.data.id?(f(p.data),t(!0)):(f(null),t(!1))}).catch(()=>{f(null),t(!1)}).finally(()=>k(!1))},[]),{shiftActive:n,activeShiftInfo:l,shiftInp:o,loading:x,handleInputChange:(p,g)=>u(h=>({...h,[p]:g})),startShift:async()=>{if(!o.name||!a?.id){alert("Nama admin harus diisi!");return}try{const p=await N.post("/api/shift/start",{name:o.name,session:o.session,date:o.date});f(p.data),t(!0)}catch(p){console.error("Gagal mulai shift:",p),alert("Gagal memulai shift. Coba lagi.")}},endShift:async p=>{try{await N.post("/api/shift/end"),t(!1),f(null),p?.()}catch(g){console.error("Gagal akhiri shift:",g),alert("Gagal mengakhiri shift. Coba lagi.")}}}}function ge(){const[a,o]=c.useState({});return{getVal:(t,x)=>a[t.id]?.[x]!==void 0?a[t.id][x]:t[x]??"",setEdit:(t,x,k)=>o(r=>({...r,[t]:{...r[t]??{},[x]:k}})),clearEdit:t=>o(x=>{const k={...x};return delete k[t],k}),getBuffer:t=>a[t]??null}}const fe=["nomor_kamar","nama_tamu","tanggal_checkin","tanggal_checkout","total_bayar","alamat","nik","keterangan","shift_admin","tanggal_input","prepaid","pah","platform"],xe=["nama_barang","harga","keterangan","shift_admin","tanggal_input"];function he(a,o,u){if(!o)return!0;const l=o.toLowerCase();return(u==="expense"?xe:fe).some(n=>String(a[n]??"").toLowerCase().includes(l))}function be(a,o,u,l,f,n,t=""){return c.useMemo(()=>{const x=l==="reguler"?a:l==="ota"?o:u,k=f.map(g=>({...g,shift_admin:n?`${n.session}-${n.name}`:"",tanggal_input:n?.date??"",status:"checkin"})),r=new Map;x.forEach(g=>{const h=`${g.tanggal_input}-${g.shift_admin}`;r.has(h)||r.set(h,[]),r.get(h).push(g)});let d=[];const b=[];if(r.forEach((g,h)=>{n&&h===`${n.date}-${n.session}-${n.name}`?d=g:b.push({key:h,rows:g})}),n){const g=`${n.date}-${n.session}-${n.name}`;b.push({key:g,rows:[...d,...k]})}const p=[];return b.forEach(({rows:g})=>{const h=g.filter(m=>m._id||he(m,t,l));if(h.length===0)return;let y=0,j=0;h.forEach(m=>{j++,p.push({...m,_rowIndex:j});const E=l==="expense"?m.harga:l==="reguler"?m.total_bayar:Number(m.prepaid??0)+Number(m.pah??0);y+=Number(E??0)});const C=h[h.length-1];p.push({isSeparator:!0,name:C.shift_admin??"",total:y,date:C.tanggal_input??""})}),p},[a,o,u,l,f,n,t])}const me={reguler:["guests"],ota:["appGuests"],expense:["expenses"]};function ke({query:a,onChange:o,resultCount:u}){return e.jsxs("div",{className:"search-bar",children:[e.jsx("span",{className:"search-icon",children:"🔍"}),e.jsx("input",{className:"search-inp",type:"text",placeholder:"Cari nama tamu, nomor kamar, atau keterangan...",value:a,onChange:l=>o(l.target.value),autoComplete:"off"}),a&&e.jsxs("div",{className:"search-meta",children:[e.jsxs("span",{className:"search-count",children:[u," hasil"]}),e.jsx("button",{className:"search-clear",onClick:()=>o(""),title:"Hapus",children:"✕"})]})]})}function Ae({auth:a,guests:o=[],appGuests:u=[],expenses:l=[],selectedMonth:f,selectedYear:n}){const[t,x]=c.useState("reguler"),[k,r]=c.useState([]),[d,b]=c.useState(""),{toast:p,toasts:g,removeToast:h,confirm:y,showConfirm:j}=se(),{shiftActive:C,activeShiftInfo:m,shiftInp:E,loading:I,handleInputChange:H,startShift:G,endShift:O}=ue(a?.user),{getVal:P,setEdit:F,clearEdit:M,getBuffer:W}=ge(),B=be(o,u,l,t,k,m,d),Y=B.filter(s=>!s.isSeparator).length,V=s=>{x(s),r([]),b("")},K=()=>r(s=>[...s,{_id:Math.random().toString(36).slice(2)}]),Q=(s,i,w)=>r(z=>z.map(v=>v._id===s?{...v,[i]:w}:v)),R=c.useCallback(()=>_.reload({only:me[t]??[],preserveScroll:!0}),[t]),T=()=>({shift_admin:`${m.session}-${m.name}`,tanggal_input:m.date,month:f,year:n}),$=(s,i)=>({reguler:{update:"guest.update",store:"guest.store",status:"guest.status"},ota:{update:"app-guest.update",store:"app-guest.store",status:"app-guest.status"}})[s]?.[i]??null,L=(s,i)=>s==="ota"?{appGuest:i.id}:{guest:i.id},U=s=>{const i=W(s.id);!i||Object.keys(i).length===0||_.patch(route($(t,"update"),L(t,s)),{...i,...T()},{preserveScroll:!0,onSuccess:()=>{M(s.id),R()}})},X=s=>{if(!m){p.warning("Shift harus aktif untuk menyimpan data!");return}const i=k.find(S=>S._id===s);if(!i)return;console.log("SHIFT:",m);const w=T();if(t==="expense"){_.post(route("pengeluaran.store"),{user_id:a.user.id,nama_barang:i.nama_barang||"",harga:i.harga||0,keterangan:i.keterangan||"",...w},{preserveScroll:!0,onSuccess:()=>{r(S=>S.filter(A=>A._id!==s)),R()}});return}const v=t==="ota"?"app-guest.store":"guest.store",Z={user_id:a.user.id,nomor_kamar:i.nomor_kamar??"",nama_tamu:i.nama_tamu??"",tanggal_checkin:i.tanggal_checkin??w.tanggal_input,tanggal_checkout:i.tanggal_checkout??"",alamat:i.alamat??"",nik:i.nik??"",keterangan:i.keterangan??"",total_bayar:i.total_bayar??0,prepaid:i.prepaid??0,pah:i.pah??0,platform:i.platform??"Other",...w};_.post(route(v),Z,{preserveScroll:!0,onSuccess:()=>{r(S=>S.filter(A=>A._id!==s)),R()},onError:S=>{console.error("Gagal simpan:",S),p.error("Cek kembali inputan: "+Object.values(S).join(", "))}})},q=async s=>{if(!await j(`Hapus data "${s.nama_tamu||s.nama_barang||"ini"}"?`))return;const w={reguler:{name:"guest.destroy",params:{guest:s.id}},ota:{name:"app-guest.destroy",params:{appGuest:s.id}},expense:{name:"pengeluaran.destroy",params:{pengeluaran:s.id}}},{name:z,params:v}=w[t];_.delete(route(z,v),{preserveScroll:!0,onSuccess:()=>{p.success("Data berhasil dihapus."),R()}})},J=s=>{if(t==="expense")return;const i=s.status==="checkout"?"checkin":"checkout";_.patch(route($(t,"status"),L(t,s)),{status:i,...T()},{preserveScroll:!0,onSuccess:R})};return e.jsxs(e.Fragment,{children:[e.jsxs(te,{user:a?.user,children:[e.jsx(ee,{title:"Queenput - Admin"}),e.jsx("style",{children:ce}),e.jsxs("div",{className:"pg",children:[e.jsx("div",{className:"tabs",children:ae.map(s=>e.jsx("button",{className:`tab-btn ${t===s.key?"tab-active":"tab-inactive"}`,onClick:()=>V(s.key),children:s.label},s.key))}),e.jsx(ne,{shiftActive:C,shiftInp:E,activeShiftInfo:m,onInputChange:H,onStart:G,onEndShift:()=>O(),loading:I}),e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx(ke,{query:d,onChange:b,resultCount:Y}),e.jsx(pe,{mode:"bulan",month:f,year:n})]}),e.jsx(re,{tab:t,displayedRows:B,getVal:P,onEdit:F,onNewRowChange:Q,onBlur:U,onSave:X,onToggleStatus:J,onDelete:q,query:d})]}),C&&e.jsx("button",{className:"btn-add-floating",onClick:K,children:"＋ TAMBAH BARIS"})]}),e.jsx(le,{toasts:g,onRemove:h}),e.jsx(de,{confirm:y})]})}export{Ae as default};
