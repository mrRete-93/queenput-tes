import{r as h,j as e,H as b,a as o}from"./app-56i2WLiC.js";import{A as u}from"./AuthenticatedLayout-BWf_4r3c.js";const s={created:{bg:"#e6f4ea",color:"#137333",label:"✚ Tambah"},updated:{bg:"#fef3e2",color:"#b06000",label:"✎ Ubah"},deleted:{bg:"#fce8e6",color:"#c5221f",label:"✕ Hapus"}};function j({auth:d,logs:l,chainValid:n,filters:c}){const[r,i]=h.useState(c||{}),p=()=>{o.get(route("audit.index"),r,{preserveScroll:!0})},x=()=>{i({}),o.get(route("audit.index"),{})},f=()=>{const a=new URLSearchParams(r).toString();window.location.href=route("audit.export")+(a?"?"+a:"")};return e.jsxs(u,{user:d?.user,children:[e.jsx(b,{title:"Audit Log"}),e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap');
                * { box-sizing: border-box; }
                .al-root { font-family: 'Google Sans','Segoe UI',sans-serif; padding: 20px; background:#f8f9fa; min-height:100vh; }

                .al-header { display:flex; align-items:center; gap:12px; margin-bottom:16px; flex-wrap:wrap; }
                .al-title { font-size:20px; font-weight:600; color:#202124; letter-spacing:-.3px; flex:1; }

                .chain-badge {
                    display:inline-flex; align-items:center; gap:6px;
                    padding:5px 14px; border-radius:20px; font-size:12px; font-weight:600;
                }
                .chain-ok   { background:#e6f4ea; color:#137333; }
                .chain-fail { background:#fce8e6; color:#c5221f; }

                .al-export-btn {
                    background:#1a73e8; color:#fff; border:none; border-radius:6px;
                    padding:7px 16px; font-size:13px; font-weight:500; cursor:pointer; font-family:inherit;
                    transition:background .15s;
                }
                .al-export-btn:hover { background:#1557b0; }

                /* Filters */
                .al-filters {
                    background:#fff; border:1px solid #e0e0e0; border-radius:10px;
                    padding:14px 16px; margin-bottom:16px;
                    display:flex; gap:10px; align-items:flex-end; flex-wrap:wrap;
                }
                .al-filter-group { display:flex; flex-direction:column; gap:4px; }
                .al-filter-label { font-size:11px; font-weight:600; color:#80868b; text-transform:uppercase; letter-spacing:.4px; }
                .al-filter-input, .al-filter-select {
                    border:1px solid #e0e0e0; border-radius:6px;
                    padding:6px 10px; font-size:13px; font-family:inherit;
                    color:#202124; outline:none; background:#fff;
                    transition:border-color .15s;
                }
                .al-filter-input:focus, .al-filter-select:focus { border-color:#1a73e8; }
                .al-filter-btn {
                    background:#f1f3f4; color:#202124; border:1px solid #e0e0e0;
                    border-radius:6px; padding:7px 14px; font-size:13px; font-weight:500;
                    cursor:pointer; font-family:inherit; transition:background .15s;
                }
                .al-filter-btn:hover { background:#e0e0e0; }
                .al-filter-btn.primary { background:#1a73e8; color:#fff; border-color:#1a73e8; }
                .al-filter-btn.primary:hover { background:#1557b0; }

                /* Table */
                .al-table-wrap {
                    background:#fff; border:1px solid #e0e0e0; border-radius:10px;
                    overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,.06);
                }
                table { width:100%; border-collapse:collapse; font-size:13px; }
                th {
                    background:#f8f9fa; color:#5f6368; font-weight:600; font-size:11px;
                    text-transform:uppercase; letter-spacing:.5px;
                    padding:10px 14px; text-align:left;
                    border-bottom:1px solid #e0e0e0; white-space:nowrap;
                }
                td {
                    padding:10px 14px; border-bottom:1px solid #f1f3f4;
                    color:#202124; vertical-align:top;
                }
                tr:last-child td { border-bottom:none; }
                tr:hover td { background:#f8f9ff; }

                .action-badge {
                    display:inline-flex; align-items:center;
                    padding:2px 10px; border-radius:10px;
                    font-size:11px; font-weight:600;
                }
                .field-badge {
                    font-family:'Roboto Mono',monospace; font-size:11px;
                    background:#f1f3f4; color:#5f6368;
                    padding:2px 8px; border-radius:4px;
                }
                .val-old { color:#d93025; font-family:'Roboto Mono',monospace; font-size:12px; }
                .val-new { color:#137333; font-family:'Roboto Mono',monospace; font-size:12px; }
                .val-arrow { color:#bdc1c6; margin:0 4px; }
                .hash-text { font-family:'Roboto Mono',monospace; font-size:10px; color:#9aa0a6; }

                /* Pagination */
                .al-pagination { display:flex; justify-content:center; gap:6px; padding:16px; flex-wrap:wrap; }
                .al-page-btn {
                    padding:5px 12px; border-radius:6px; font-size:13px; font-weight:500;
                    border:1px solid #e0e0e0; background:#fff; color:#3c4043; cursor:pointer; font-family:inherit;
                    transition:background .12s;
                }
                .al-page-btn:hover { background:#f1f3f4; }
                .al-page-btn.active { background:#1a73e8; color:#fff; border-color:#1a73e8; }
                .al-page-btn:disabled { opacity:.4; cursor:not-allowed; }

                .empty-state { text-align:center; padding:48px; color:#80868b; font-size:14px; }
            `}),e.jsxs("div",{className:"al-root",children:[e.jsxs("div",{className:"al-header",children:[e.jsx("div",{className:"al-title",children:"🔐 Audit Log"}),e.jsx("div",{className:`chain-badge ${n?"chain-ok":"chain-fail"}`,children:n?"✔ Integritas Aman":"⚠ Integritas Rusak!"}),e.jsx("button",{className:"al-export-btn",onClick:f,children:"⬇ Export CSV"})]}),e.jsxs("div",{className:"al-filters",children:[e.jsxs("div",{className:"al-filter-group",children:[e.jsx("label",{className:"al-filter-label",children:"Aksi"}),e.jsxs("select",{className:"al-filter-select",value:r.action||"",onChange:a=>i(t=>({...t,action:a.target.value})),children:[e.jsx("option",{value:"",children:"Semua"}),e.jsx("option",{value:"created",children:"Tambah"}),e.jsx("option",{value:"updated",children:"Ubah"}),e.jsx("option",{value:"deleted",children:"Hapus"})]})]}),e.jsxs("div",{className:"al-filter-group",children:[e.jsx("label",{className:"al-filter-label",children:"Model"}),e.jsxs("select",{className:"al-filter-select",value:r.model||"",onChange:a=>i(t=>({...t,model:a.target.value})),children:[e.jsx("option",{value:"",children:"Semua"}),e.jsx("option",{value:"Guest",children:"Checkin Reguler"}),e.jsx("option",{value:"AppGuest",children:"Checkin Aplikasi"})]})]}),e.jsxs("div",{className:"al-filter-group",children:[e.jsx("label",{className:"al-filter-label",children:"Tanggal"}),e.jsx("input",{type:"date",className:"al-filter-input",value:r.date||"",onChange:a=>i(t=>({...t,date:a.target.value}))})]}),e.jsx("button",{className:"al-filter-btn primary",onClick:p,children:"Cari"}),e.jsx("button",{className:"al-filter-btn",onClick:x,children:"Reset"})]}),e.jsx("div",{className:"al-table-wrap",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:"Waktu"}),e.jsx("th",{children:"Admin"}),e.jsx("th",{children:"Aksi"}),e.jsx("th",{children:"Data"}),e.jsx("th",{children:"Field"}),e.jsx("th",{children:"Perubahan"}),e.jsx("th",{children:"IP"}),e.jsx("th",{children:"Hash"})]})}),e.jsx("tbody",{children:l.data&&l.data.length>0?l.data.map(a=>{const t=s[a.action]||s.updated;return e.jsxs("tr",{children:[e.jsx("td",{style:{color:"#9aa0a6",fontSize:12},children:a.id}),e.jsx("td",{style:{whiteSpace:"nowrap",fontSize:12},children:new Date(a.created_at).toLocaleString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}),e.jsx("td",{style:{fontWeight:500},children:a.admin_name??a.user?.name??"—"}),e.jsx("td",{children:e.jsx("span",{className:"action-badge",style:{background:t.bg,color:t.color},children:t.label})}),e.jsxs("td",{children:[e.jsx("span",{style:{fontSize:12},children:a.model}),e.jsxs("span",{style:{color:"#9aa0a6",fontSize:11},children:[" #",a.model_id]})]}),e.jsx("td",{children:a.field&&e.jsx("span",{className:"field-badge",children:a.field})}),e.jsxs("td",{style:{maxWidth:220},children:[a.action==="updated"&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"val-old",children:a.old_value??"—"}),e.jsx("span",{className:"val-arrow",children:"→"}),e.jsx("span",{className:"val-new",children:a.new_value??"—"})]}),a.action==="created"&&e.jsx("span",{className:"val-new",children:a.new_value}),a.action==="deleted"&&e.jsx("span",{className:"val-old",style:{fontSize:11},children:"Data dihapus"})]}),e.jsx("td",{style:{fontSize:11,color:"#9aa0a6"},children:a.ip_address}),e.jsx("td",{children:e.jsxs("span",{className:"hash-text",title:a.hash,children:[a.hash?.slice(0,10),"…"]})})]},a.id)}):e.jsx("tr",{children:e.jsx("td",{colSpan:9,className:"empty-state",children:"Tidak ada log ditemukan."})})})]})}),l.last_page>1&&e.jsx("div",{className:"al-pagination",children:l.links.map((a,t)=>e.jsx("button",{className:`al-page-btn ${a.active?"active":""}`,disabled:!a.url,onClick:()=>a.url&&o.get(a.url),dangerouslySetInnerHTML:{__html:a.label}},t))}),e.jsxs("div",{style:{padding:"0 0 16px",color:"#9aa0a6",fontSize:12},children:["Total ",l.total??0," log entry"]})]})]})}export{j as default};
