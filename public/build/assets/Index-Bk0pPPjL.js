import{b as ie,r as t,j as e,H as de,L as G,a as z}from"./app-56i2WLiC.js";import{A as le}from"./AuthenticatedLayout-BWf_4r3c.js";const m=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],ce=()=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}),e.jsx("path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"})]}),be=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:[e.jsx("circle",{cx:"12",cy:"5",r:"1.5"}),e.jsx("circle",{cx:"12",cy:"12",r:"1.5"}),e.jsx("circle",{cx:"12",cy:"19",r:"1.5"})]}),pe=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),e.jsx("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]}),ue=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("polyline",{points:"3 6 5 6 21 6"}),e.jsx("path",{d:"M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"}),e.jsx("path",{d:"M10 11v6"}),e.jsx("path",{d:"M14 11v6"}),e.jsx("path",{d:"M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"})]}),xe=()=>e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]}),me=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),e.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),e.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),e.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),he=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]});function fe({file:s,onRename:o,onDelete:p,onClose:r,isOwner:h}){const f=t.useRef(null);return t.useEffect(()=>{const n=g=>{f.current&&!f.current.contains(g.target)&&r()};return document.addEventListener("mousedown",n),()=>document.removeEventListener("mousedown",n)},[r]),e.jsxs("div",{ref:f,style:{position:"absolute",right:0,top:36,background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",zIndex:200,minWidth:170,padding:"6px 0",overflow:"hidden"},children:[e.jsxs(G,{href:route("guest.index",{month:s.month,year:s.year}),style:{...B,display:"flex",textDecoration:"none"},onMouseEnter:n=>n.currentTarget.style.background="#f1f5f9",onMouseLeave:n=>n.currentTarget.style.background="transparent",onClick:r,children:[e.jsx("span",{style:{color:"#10b981",display:"flex"},children:e.jsx(he,{})}),"Lihat Buku"]}),h&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{height:1,background:"#f1f5f9",margin:"4px 0"}}),e.jsxs("button",{onClick:()=>{o(s),r()},style:B,onMouseEnter:n=>n.currentTarget.style.background="#f1f5f9",onMouseLeave:n=>n.currentTarget.style.background="transparent",children:[e.jsx("span",{style:{color:"#3b82f6",display:"flex"},children:e.jsx(pe,{})}),"Ganti Nama"]}),e.jsx("div",{style:{height:1,background:"#f1f5f9",margin:"4px 0"}}),e.jsxs("button",{onClick:()=>{p(s),r()},style:{...B,color:"#ef4444"},onMouseEnter:n=>n.currentTarget.style.background="#fef2f2",onMouseLeave:n=>n.currentTarget.style.background="transparent",children:[e.jsx("span",{style:{color:"#ef4444",display:"flex"},children:e.jsx(ue,{})}),"Hapus Buku"]})]})]})}const B={display:"flex",alignItems:"center",gap:10,width:"100%",textAlign:"left",padding:"9px 14px",fontSize:13.5,fontWeight:500,border:"none",background:"transparent",cursor:"pointer",color:"#374151",transition:"background 0.15s"};function L({title:s,onClose:o,children:p}){return t.useEffect(()=>{const r=h=>{h.key==="Escape"&&o()};return document.addEventListener("keydown",r),()=>document.removeEventListener("keydown",r)},[o]),e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15,23,42,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,backdropFilter:"blur(4px)",animation:"fadeIn 0.15s ease"},onClick:o,children:e.jsxs("div",{style:{background:"#fff",borderRadius:16,padding:"28px 28px 24px",width:380,maxWidth:"calc(100vw - 32px)",boxShadow:"0 20px 60px rgba(0,0,0,0.2)",animation:"slideUp 0.2s ease"},onClick:r=>r.stopPropagation(),children:[e.jsx("h3",{style:{fontSize:17,fontWeight:700,color:"#0f172a",marginBottom:20},children:s}),p]})})}function ve({auth:s,files:o,currentMonth:p,currentYear:r,userRole:h,flash:f}){console.log("AUTH:",s),console.log("USER:",s?.user),console.log("ROLE:",s?.user?.role);const{props:n}=ie();console.log("PAGE PROPS:",n);const[g,M]=t.useState(null),[y,i]=t.useState(null),[l,k]=t.useState(null),[u,w]=t.useState(!1),[c,b]=t.useState(!1),[ge,A]=t.useState(null);s?.user?.role;const d=s?.user?.role==="admin",[N,X]=t.useState(p),[S,Q]=t.useState(r),[E,P]=t.useState(""),[I,T]=t.useState(""),[R,W]=t.useState("aktif"),[D,H]=t.useState(""),[x,J]=t.useState(""),[O,F]=t.useState(""),[_,U]=t.useState("aktif"),Y=a=>a.name,q=a=>a.owner_id===s?.user.id,Z=()=>{c||(H(""),b(!0),z.post(route("dashboard.createFile"),{month:N,year:S,name:E.trim()||void 0,catatan:I.trim()||void 0,status:R},{onSuccess:()=>{i(null),P(""),T(""),W("aktif"),b(!1)},onError:a=>{H(a?.month||"Gagal menyimpan buku."),b(!1)}}))},ee=a=>{k(a),J(a.name),F(a.catatan??""),U(a.status??"aktif"),i("rename")},$=()=>{!x.trim()||!l||c||(b(!0),z.patch(route("dashboard.updateFile",{pembukuan:l.id}),{name:x.trim(),catatan:O.trim()||null,status:_},{onSuccess:()=>{i(null),k(null),b(!1)},onError:()=>b(!1)}))},ae=a=>{k(a),i("delete")},te=()=>{!l||u||(w(!0),z.delete(route("dashboard.deleteFile"),{data:{month:l.month,year:l.year},onSuccess:()=>{i(null),k(null),w(!1)},onError:()=>w(!1)}))},ne=["#3b82f6","#8b5cf6","#ec4899","#f97316","#10b981","#14b8a6","#f59e0b","#6366f1","#ef4444","#06b6d4","#84cc16","#64748b"],K=a=>ne[(a-1)%12],se=o?.length??0,re=o?.filter(a=>!a.is_empty).length??0,V=d?new Set(o?.map(a=>a.owner_id)).size:null;return e.jsxs(le,{user:s?.user,header:e.jsx("h2",{style:{fontWeight:700,fontSize:18,color:"#0f172a"},children:d?"Semua Buku Pembukuan":"Buku Pembukuan"}),children:[e.jsx(de,{title:"File Saya - Queenput"}),e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
                * { box-sizing: border-box; }
                body, .dashboard-root { font-family: 'Plus Jakarta Sans', sans-serif; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(16px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes rowIn {
                    from { opacity: 0; transform: translateX(-8px); }
                    to   { opacity: 1; transform: translateX(0); }
                }

                .db-page { min-height: 100vh; background: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; }

                .db-hero {
                    background: linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 60%, #3b82f6 100%);
                    padding: 32px 0 48px; position: relative; overflow: hidden;
                }
                .db-hero::before {
                    content: ''; position: absolute; top: -60px; right: -60px;
                    width: 280px; height: 280px; background: rgba(255,255,255,0.06); border-radius: 50%;
                }
                .db-hero::after {
                    content: ''; position: absolute; bottom: -40px; left: 10%;
                    width: 160px; height: 160px; background: rgba(255,255,255,0.04); border-radius: 50%;
                }
                .db-container { max-width: 860px; margin: 0 auto; padding: 0 24px; }

                .db-hero-top {
                    display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px;
                }
                .db-hero-greeting { font-size: 13px; color: rgba(255,255,255,0.65); font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }
                .db-hero-title { font-size: 26px; font-weight: 800; color: #fff; margin-top: 4px; letter-spacing: -0.5px; }

                /* Badge role admin di hero */
                .db-role-badge {
                    display: inline-flex; align-items: center; gap: 6px;
                    background: rgba(251,191,36,0.2); border: 1px solid rgba(251,191,36,0.4);
                    color: #fbbf24; border-radius: 20px; padding: 4px 12px;
                    font-size: 12px; font-weight: 600; margin-top: 8px;
                    letter-spacing: 0.03em;
                }

                .db-create-btn {
                    display: flex; align-items: center; gap: 8px;
                    background: rgba(255,255,255,0.15); border: 1.5px solid rgba(255,255,255,0.3);
                    color: #fff; border-radius: 12px; padding: 10px 18px;
                    font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s;
                    backdrop-filter: blur(8px); font-family: 'Plus Jakarta Sans', sans-serif;
                }
                .db-create-btn:hover { background: rgba(255,255,255,0.25); border-color: rgba(255,255,255,0.5); transform: translateY(-1px); }

                .db-stats { display: flex; gap: 12px; position: relative; z-index: 1; flex-wrap: wrap; }
                .db-stat {
                    background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.18);
                    border-radius: 10px; padding: 12px 18px; backdrop-filter: blur(8px);
                }
                .db-stat-val { font-size: 22px; font-weight: 800; color: #fff; line-height: 1; }
                .db-stat-label { font-size: 11.5px; color: rgba(255,255,255,0.6); margin-top: 3px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; }

                .db-content { margin-top: -20px; position: relative; z-index: 10; }
                .db-card { background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 24px rgba(0,0,0,0.06); overflow: hidden; }

                /* Kolom berbeda untuk admin (ada kolom pemilik lebih lebar) */
                .db-table-head-admin {
                    display: grid;
                    grid-template-columns: 44px 1fr 150px 130px 120px 44px;
                    padding: 12px 20px;
                    font-size: 11.5px; font-weight: 700; color: #94a3b8;
                    letter-spacing: 0.06em; text-transform: uppercase;
                    border-bottom: 1px solid #f1f5f9; background: #fafafa;
                }
                .db-table-head {
                    display: grid;
                    grid-template-columns: 44px 1fr 130px 120px 44px;
                    padding: 12px 20px;
                    font-size: 11.5px; font-weight: 700; color: #94a3b8;
                    letter-spacing: 0.06em; text-transform: uppercase;
                    border-bottom: 1px solid #f1f5f9; background: #fafafa;
                }

                .db-file-row-admin {
                    display: grid;
                    grid-template-columns: 44px 1fr 150px 130px 120px 44px;
                    align-items: center; padding: 0 20px;
                    border-bottom: 1px solid #f8fafc; transition: background 0.15s;
                    position: relative; animation: rowIn 0.25s ease both;
                }
                .db-file-row {
                    display: grid;
                    grid-template-columns: 44px 1fr 130px 120px 44px;
                    align-items: center; padding: 0 20px;
                    border-bottom: 1px solid #f8fafc; transition: background 0.15s;
                    position: relative; animation: rowIn 0.25s ease both;
                }
                .db-file-row:last-child, .db-file-row-admin:last-child { border-bottom: none; }
                .db-file-row:hover, .db-file-row-admin:hover { background: #f8fafc; }

                .db-file-icon {
                    width: 34px; height: 34px; border-radius: 9px;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff; font-size: 15px; flex-shrink: 0;
                }
                .db-file-name {
                    font-size: 14px; font-weight: 600; color: #1e293b;
                    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 20px;
                }
                .db-file-meta { font-size: 12px; color: #94a3b8; margin-top: 2px; font-weight: 500; }
                .db-name-wrap { padding: 13px 0; overflow: hidden; }

                .db-badge-empty {
                    display: inline-flex; align-items: center; font-size: 10.5px; font-weight: 600;
                    background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 20px;
                    margin-left: 8px; vertical-align: middle; border: 1px solid #fde68a;
                }
                .db-badge-period {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-size: 12.5px; font-weight: 500; color: #64748b;
                }

                /* Badge "Buku Orang Lain" untuk admin */
                .db-badge-other {
                    display: inline-flex; align-items: center; font-size: 10px; font-weight: 600;
                    background: #eff6ff; color: #2563eb; padding: 2px 7px; border-radius: 20px;
                    margin-left: 6px; vertical-align: middle; border: 1px solid #bfdbfe;
                }

                .db-owner {
                    display: flex; align-items: center; gap: 6px;
                    font-size: 12.5px; color: #64748b; font-weight: 500;
                }
                .db-avatar {
                    width: 22px; height: 22px; border-radius: 50%;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 10px; font-weight: 700; color: #fff;
                }
                /* Avatar warna beda untuk buku milik admin sendiri */
                .db-avatar-mine {
                    background: linear-gradient(135deg, #10b981, #059669);
                }

                .db-more-btn {
                    width: 32px; height: 32px; border-radius: 8px;
                    background: none; border: none; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    color: #cbd5e1; transition: all 0.15s;
                }
                .db-more-btn:hover { background: #f1f5f9; color: #64748b; }

                .db-empty { text-align: center; padding: 64px 24px; color: #94a3b8; }
                .db-empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.4; }
                .db-empty-title { font-size: 16px; font-weight: 700; color: #475569; margin-bottom: 8px; }
                .db-empty-sub { font-size: 14px; color: #94a3b8; }

                .db-label { display: block; font-size: 12px; font-weight: 600; color: #64748b; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em; }
                .db-input {
                    width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px;
                    padding: 10px 14px; font-size: 14px; margin-bottom: 14px;
                    outline: none; transition: border-color 0.15s;
                    font-family: 'Plus Jakarta Sans', sans-serif; color: #0f172a;
                }
                .db-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
                .db-modal-btns { display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px; }
                .db-btn { border-radius: 10px; padding: 10px 20px; font-size: 14px; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; font-family: 'Plus Jakarta Sans', sans-serif; }
                .db-btn-cancel { background: #f1f5f9; color: #475569; border: 1.5px solid #e2e8f0; }
                .db-btn-cancel:hover { background: #e2e8f0; }
                .db-btn-primary { background: #2563eb; color: #fff; }
                .db-btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); }
                .db-btn-primary:disabled { background: #bfdbfe; cursor: not-allowed; transform: none; }
                .db-btn-danger { background: #ef4444; color: #fff; }
                .db-btn-danger:hover { background: #dc2626; transform: translateY(-1px); }
                .db-btn-danger:disabled { background: #fca5a5; cursor: not-allowed; transform: none; }
                .db-delete-warn { background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 14px 16px; font-size: 13.5px; color: #7f1d1d; line-height: 1.65; margin-bottom: 16px; }
                .db-delete-warn strong { color: #991b1b; }

                /* Info banner untuk admin */
                .db-admin-info {
                    display: flex; align-items: center; gap: 10px;
                    background: #eff6ff; border: 1px solid #bfdbfe;
                    border-radius: 10px; padding: 10px 16px; margin-bottom: 16px;
                    font-size: 13px; color: #1d4ed8; font-weight: 500;
                }
            `}),e.jsxs("div",{className:"db-page",children:[e.jsx("div",{className:"db-hero",children:e.jsxs("div",{className:"db-container",children:[e.jsxs("div",{className:"db-hero-top",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"db-hero-greeting",children:["Selamat datang, ",s?.user.name]}),e.jsx("div",{className:"db-hero-title",children:d?"Semua Buku Pembukuan":"Buku Pembukuan Tamu"}),d&&e.jsx("div",{className:"db-role-badge",children:"👁 Mode Admin — Lihat Semua Buku"})]}),e.jsxs("button",{className:"db-create-btn",onClick:()=>i("create"),children:[e.jsx(xe,{}),"Buku Baru"]})]}),e.jsxs("div",{className:"db-stats",children:[e.jsxs("div",{className:"db-stat",children:[e.jsx("div",{className:"db-stat-val",children:se}),e.jsx("div",{className:"db-stat-label",children:"Total Buku"})]}),e.jsxs("div",{className:"db-stat",children:[e.jsx("div",{className:"db-stat-val",children:re}),e.jsx("div",{className:"db-stat-label",children:"Ada Data"})]}),d&&V!==null?e.jsxs("div",{className:"db-stat",children:[e.jsx("div",{className:"db-stat-val",children:V}),e.jsx("div",{className:"db-stat-label",children:"Pengguna"})]}):e.jsxs("div",{className:"db-stat",children:[e.jsx("div",{className:"db-stat-val",children:r}),e.jsx("div",{className:"db-stat-label",children:"Tahun Aktif"})]})]})]})}),e.jsx("div",{className:"db-content",children:e.jsxs("div",{className:"db-container",style:{paddingTop:24,paddingBottom:40},children:[d&&e.jsx("div",{className:"db-admin-info",children:"ℹ️ Anda melihat semua buku pembukuan. Anda hanya bisa mengedit atau menghapus buku milik Anda sendiri."}),e.jsxs("div",{className:"db-card",children:[d?e.jsxs("div",{className:"db-table-head-admin",children:[e.jsx("div",{}),e.jsx("div",{children:"Nama Buku"}),e.jsx("div",{children:"Pemilik"}),e.jsx("div",{children:"Status"}),e.jsx("div",{children:"Periode"}),e.jsx("div",{})]}):e.jsxs("div",{className:"db-table-head",children:[e.jsx("div",{}),e.jsx("div",{children:"Nama Buku"}),e.jsx("div",{children:"Pemilik"}),e.jsx("div",{children:"Periode"}),e.jsx("div",{})]}),o&&o.length>0?o.map((a,j)=>{const v=q(a),oe=d?"db-file-row-admin":"db-file-row";return e.jsxs("div",{className:oe,style:{animationDelay:`${j*40}ms`},onMouseEnter:()=>A(a.id),onMouseLeave:()=>A(null),children:[e.jsxs(G,{href:route("guest.index",{month:a.month,year:a.year}),style:{display:"contents",textDecoration:"none",color:"inherit"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center"},children:e.jsx("div",{className:"db-file-icon",style:{background:`linear-gradient(135deg, ${K(a.month)}, ${K(a.month)}aa)`},children:e.jsx(ce,{})})}),e.jsxs("div",{className:"db-name-wrap",children:[e.jsxs("div",{className:"db-file-name",children:[Y(a),d&&(v?e.jsx("span",{className:"db-badge-other",style:{background:"#f0fdf4",color:"#16a34a",borderColor:"#bbf7d0"},children:"Milik Saya"}):e.jsx("span",{className:"db-badge-other",children:"👁 View Only"})),a.is_empty&&e.jsx("span",{className:"db-badge-empty",children:"Kosong"}),a.status==="selesai"&&e.jsx("span",{style:{display:"inline-flex",alignItems:"center",fontSize:10.5,fontWeight:600,background:"#dcfce7",color:"#166534",padding:"2px 8px",borderRadius:20,marginLeft:8,border:"1px solid #bbf7d0",verticalAlign:"middle"},children:"✓ Selesai"})]}),e.jsxs("div",{className:"db-file-meta",children:["Pembukuan · ",m[a.month-1]," ",a.year,a.catatan&&e.jsxs("span",{style:{color:"#cbd5e1"},children:[" · ",a.catatan.slice(0,40),a.catatan.length>40?"…":""]})]})]}),e.jsxs("div",{className:"db-owner",children:[e.jsx("div",{className:`db-avatar${v?" db-avatar-mine":""}`,children:a.owner?.charAt(0)?.toUpperCase()??"?"}),e.jsx("span",{children:v?"Saya":a.owner})]}),d&&e.jsx("div",{children:e.jsx("span",{style:{display:"inline-flex",alignItems:"center",fontSize:11,fontWeight:600,background:a.status==="selesai"?"#dcfce7":"#dbeafe",color:a.status==="selesai"?"#166534":"#1d4ed8",padding:"3px 10px",borderRadius:20,border:`1px solid ${a.status==="selesai"?"#bbf7d0":"#bfdbfe"}`},children:a.status==="selesai"?"✓ Selesai":"● Aktif"})}),e.jsxs("div",{className:"db-badge-period",children:[e.jsx(me,{}),m[a.month-1]," ",a.year]})]}),e.jsxs("div",{style:{position:"relative",display:"flex",justifyContent:"center"},onClick:C=>C.preventDefault(),children:[e.jsx("button",{className:"db-more-btn",onClick:C=>{C.stopPropagation(),M(g===a.id?null:a.id)},title:"Opsi",children:e.jsx(be,{})}),g===a.id&&e.jsx(fe,{file:a,onRename:ee,onDelete:ae,onClose:()=>M(null),isOwner:v})]})]},a.id)}):e.jsxs("div",{className:"db-empty",children:[e.jsx("div",{className:"db-empty-icon",children:"📚"}),e.jsx("div",{className:"db-empty-title",children:d?"Belum ada buku pembukuan dari siapapun":"Belum ada buku pembukuan"}),e.jsx("div",{className:"db-empty-sub",children:d?"Belum ada user yang membuat buku pembukuan.":e.jsxs(e.Fragment,{children:["Klik ",e.jsx("strong",{children:"Buku Baru"})," di atas untuk membuat pembukuan pertama Anda."]})})]})]})]})})]}),y==="create"&&e.jsxs(L,{title:"📋 Tambah Sheet Baru",onClose:()=>!c&&i(null),children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{className:"db-label",children:"Bulan"}),e.jsx("select",{className:"db-input",value:N,onChange:a=>X(Number(a.target.value)),children:m.map((a,j)=>e.jsx("option",{value:j+1,children:a},j+1))})]}),e.jsxs("div",{children:[e.jsx("label",{className:"db-label",children:"Tahun"}),e.jsx("input",{type:"number",className:"db-input",value:S,min:"2020",max:"2099",onChange:a=>Q(Number(a.target.value))})]})]}),e.jsxs("label",{className:"db-label",children:["Nama Buku ",e.jsx("span",{style:{color:"#94a3b8",fontWeight:400,textTransform:"none"},children:"(opsional)"})]}),e.jsx("input",{type:"text",className:"db-input",value:E,onChange:a=>P(a.target.value),placeholder:`Pembukuan_${m[N-1]}_${S}`,maxLength:100,autoFocus:!0}),e.jsx("label",{className:"db-label",children:"Status"}),e.jsxs("select",{className:"db-input",value:R,onChange:a=>W(a.target.value),children:[e.jsx("option",{value:"aktif",children:"Aktif"}),e.jsx("option",{value:"selesai",children:"Selesai"})]}),e.jsxs("label",{className:"db-label",children:["Catatan ",e.jsx("span",{style:{color:"#94a3b8",fontWeight:400,textTransform:"none"},children:"(opsional)"})]}),e.jsx("textarea",{className:"db-input",value:I,onChange:a=>T(a.target.value),placeholder:"Catatan untuk buku ini...",maxLength:500,rows:3,style:{resize:"vertical",minHeight:70}}),D&&e.jsxs("div",{style:{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#dc2626",marginBottom:12},children:["⚠️ ",D]}),e.jsxs("div",{className:"db-modal-btns",children:[e.jsx("button",{className:"db-btn db-btn-cancel",onClick:()=>i(null),disabled:c,children:"Batal"}),e.jsx("button",{className:"db-btn db-btn-primary",onClick:Z,disabled:c,children:c?"Menyimpan...":"＋ Tambah Sheet"})]})]}),y==="rename"&&l&&e.jsxs(L,{title:"✏️ Edit Buku",onClose:()=>!c&&i(null),children:[e.jsx("label",{className:"db-label",children:"Nama Buku"}),e.jsx("input",{type:"text",className:"db-input",value:x,onChange:a=>J(a.target.value),onKeyDown:a=>a.key==="Enter"&&x.trim()&&$(),autoFocus:!0,maxLength:100,placeholder:"Nama buku..."}),e.jsx("label",{className:"db-label",children:"Status"}),e.jsxs("select",{className:"db-input",value:_,onChange:a=>U(a.target.value),children:[e.jsx("option",{value:"aktif",children:"Aktif"}),e.jsx("option",{value:"selesai",children:"Selesai"})]}),e.jsxs("label",{className:"db-label",children:["Catatan ",e.jsx("span",{style:{color:"#94a3b8",fontWeight:400,textTransform:"none"},children:"(opsional)"})]}),e.jsx("textarea",{className:"db-input",value:O,onChange:a=>F(a.target.value),placeholder:"Catatan untuk buku ini...",maxLength:500,rows:3,style:{resize:"vertical",minHeight:70}}),e.jsxs("div",{className:"db-modal-btns",children:[e.jsx("button",{className:"db-btn db-btn-cancel",onClick:()=>i(null),disabled:c,children:"Batal"}),e.jsx("button",{className:"db-btn db-btn-primary",onClick:$,disabled:!x.trim()||c,children:c?"Menyimpan...":"Simpan"})]})]}),y==="delete"&&l&&e.jsxs(L,{title:"🗑️ Hapus Buku",onClose:()=>!u&&i(null),children:[e.jsxs("div",{className:"db-delete-warn",children:["Anda akan menghapus buku ",e.jsx("strong",{children:Y(l)}),".",e.jsx("br",{}),"Semua data tamu reguler, OTA, dan pengeluaran bulan"," ",e.jsxs("strong",{children:[m[l.month-1]," ",l.year]})," akan"," ",e.jsx("strong",{children:"terhapus permanen"})," dan tidak bisa dikembalikan."]}),e.jsxs("div",{className:"db-modal-btns",children:[e.jsx("button",{className:"db-btn db-btn-cancel",onClick:()=>i(null),disabled:u,children:"Batal"}),e.jsx("button",{className:"db-btn db-btn-danger",onClick:te,disabled:u,children:u?"Menghapus...":"Ya, Hapus"})]})]})]})}export{ve as default};
