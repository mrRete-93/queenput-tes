import{b as h,r as c,j as e,L as t}from"./app-56i2WLiC.js";function v({user:a,children:f}){const{url:p}=h(),[i,s]=c.useState(!1),d=c.useRef(null),o=n=>{try{return route(n)}catch{return"#"}},l=a?.role==="owner",x=[{href:o("dashboard.index"),label:"Beranda",icon:"🏠"},{href:o("dashboardkeuangan"),label:"Keuangan",icon:"💵"},...l?[{href:o("audit.index"),label:"Audit Log",icon:"🔐"}]:[]],g=n=>{try{const r=new URL(n).pathname;return p===r||p.startsWith(r+"/")}catch{return!1}};return c.useEffect(()=>{const n=r=>{d.current&&!d.current.contains(r.target)&&s(!1)};return document.addEventListener("mousedown",n),()=>document.removeEventListener("mousedown",n)},[]),e.jsxs("div",{style:{minHeight:"100vh",background:"#f8f9fa",fontFamily:"'Google Sans', 'Segoe UI', sans-serif"},children:[e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600&display=swap');

                /* ── Navbar ─────────────────────────────────────────────── */
                .nav-root {
                    background: #fff;
                    border-bottom: 1px solid #e0e0e0;
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 1000;
                    box-shadow: 0 1px 3px rgba(0,0,0,.06);
                    height: 56px;
                }
                .nav-inner {
                    max-width: 1400px; margin: 0 auto;
                    padding: 0 20px;
                    display: flex; align-items: center;
                    height: 56px;
                }
                .nav-logo {
                    display: flex; align-items: center; gap: 10px;
                    margin-right: 28px; text-decoration: none;
                    color: #202124;
                }
                .nav-logo-icon {
                    width: 32px; height: 32px;
                    background: linear-gradient(135deg, #e81a69, #a10d6b);
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff; font-size: 16px; font-weight: 700;
                }
                .nav-logo-text { font-size: 15px; font-weight: 600; color: #202124; letter-spacing: -.3px; }

                .nav-links { display: flex; align-items: center; gap: 2px; flex: 1; }
                .nav-link {
                    display: flex; align-items: center; gap: 6px;
                    padding: 6px 14px; border-radius: 6px;
                    font-size: 13.5px; font-weight: 500;
                    color: #5f6368; text-decoration: none;
                    transition: background .15s, color .15s;
                    white-space: nowrap; position: relative;
                }
                .nav-link:hover { background: #f1f3f4; color: #202124; }
                .nav-link.active { color: #1a73e8; background: #e8f0fe; }
                .nav-link.active::after {
                    content: ''; position: absolute;
                    bottom: -10px; left: 14px; right: 14px;
                    height: 2px; background: #1a73e8; border-radius: 2px 2px 0 0;
                }
                .nav-link-icon { font-size: 14px; }

                .nav-user { margin-left: auto; position: relative; }
                .nav-user-btn {
                    display: flex; align-items: center; gap: 8px;
                    padding: 6px 12px; border-radius: 20px;
                    border: 1px solid #e0e0e0; background: #fff; cursor: pointer;
                    font-size: 13px; font-weight: 500; color: #202124; font-family: inherit;
                    transition: background .15s, border-color .15s;
                }
                .nav-user-btn:hover { background: #f1f3f4; border-color: #bdc1c6; }
                .nav-avatar {
                    width: 26px; height: 26px; border-radius: 50%;
                    background: linear-gradient(135deg, #1a73e8, #0d47a1);
                    color: #fff; font-size: 11px; font-weight: 700;
                    display: flex; align-items: center; justify-content: center;
                }
                .nav-role-badge {
                    font-size: 10px; font-weight: 600;
                    padding: 1px 6px; border-radius: 8px;
                    background: ${l?"#fce8b2":"#e8f0fe"};
                    color: ${l?"#b06000":"#1a73e8"};
                    text-transform: uppercase; letter-spacing: .4px;
                }

                /* ── Dropdown ───────────────────────────────────────────── */
                .nav-dropdown {
                    position: absolute; right: 0; top: calc(100% + 8px);
                    background: #fff; border: 1px solid #e0e0e0;
                    border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.12);
                    min-width: 200px; overflow: hidden;
                    animation: dropIn .12s ease;
                }
                @keyframes dropIn {
                    from { opacity: 0; transform: translateY(-6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .nav-dropdown-header {
                    padding: 12px 16px; border-bottom: 1px solid #f1f3f4; background: #fafafa;
                }
                .nav-dropdown-name { font-size: 13px; font-weight: 600; color: #202124; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .nav-dropdown-email { font-size: 11px; color: #80868b; margin-top: 1px; }
                .nav-dropdown-item {
                    display: block; width: 100%; padding: 10px 16px; text-align: left;
                    background: none; border: none; cursor: pointer;
                    font-size: 13px; color: #3c4043; font-family: inherit;
                    text-decoration: none; transition: background .1s;
                }
                .nav-dropdown-item:hover { background: #f1f3f4; }
                .nav-dropdown-item.danger { color: #d93025; border-top: 1px solid #f1f3f4; }
                .nav-dropdown-item.danger:hover { background: #fce8e6; }

                /* ── Page offset ────────────────────────────────────────── */
                .page-content { padding-top: 56px; }
            `}),e.jsx("nav",{className:"nav-root",children:e.jsxs("div",{className:"nav-inner",children:[e.jsxs(t,{href:o("dashboard.index"),className:"nav-logo",children:[e.jsx("div",{className:"nav-logo-icon",children:"Q"}),e.jsx("span",{className:"nav-logo-text",children:"Queenput"})]}),e.jsx("div",{className:"nav-links",children:x.map(n=>e.jsxs(t,{href:n.href,className:`nav-link ${g(n.href)?"active":""}`,children:[e.jsx("span",{className:"nav-link-icon",children:n.icon}),n.label]},n.href))}),e.jsxs("div",{className:"nav-user",ref:d,children:[e.jsxs("button",{className:"nav-user-btn",onClick:()=>s(!i),"aria-expanded":i,children:[e.jsx("div",{className:"nav-avatar",children:a?.name?.charAt(0).toUpperCase()}),e.jsx("span",{children:a?.name?.split(" ")[0]}),e.jsx("span",{className:"nav-role-badge",children:a?.role??"admin"}),e.jsx("span",{style:{fontSize:10,color:"#80868b"},children:"▾"})]}),i&&e.jsxs("div",{className:"nav-dropdown",children:[e.jsxs("div",{className:"nav-dropdown-header",children:[e.jsx("div",{className:"nav-dropdown-name",children:a?.name}),e.jsx("div",{className:"nav-dropdown-email",children:a?.email})]}),e.jsx(t,{href:o("profile.edit"),className:"nav-dropdown-item",children:"⚙️  Edit Profil"}),e.jsx(t,{href:o("logout"),method:"post",as:"button",className:"nav-dropdown-item danger",onClick:()=>s(!1),children:"🚪  Logout"})]})]})]})}),e.jsx("main",{className:"page-content",children:f})]})}export{v as A};
