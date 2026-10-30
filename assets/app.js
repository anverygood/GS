/* ============================================================
   QURILISH NAZORAT — Shared shell + helpers v2
   ============================================================ */

const ICONS = {
  home:  '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  user:  '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c1-3.6 3.6-5.3 6.5-5.3s5.5 1.7 6.5 5.3"/><circle cx="17.5" cy="8.5" r="2.6"/><path d="M15.6 14.9c2.4.2 4.2 1.9 5 5.1"/>',
  cal:   '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
  clip:  '<rect x="5" y="4" width="14" height="17" rx="2"/><rect x="8.5" y="2.5" width="7" height="3.5" rx="1"/>',
  cash:  '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="3"/>',
  file:  '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/>',
  swap:  '<path d="M6 4 3 7l3 3"/><path d="M3 7h13"/><path d="M18 20l3-3-3-3"/><path d="M21 17H8"/>',
  bell:  '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  build: '<path d="M14 7 3 18l3 3 11-11"/><path d="M13.5 6.5 17 3l4 4-3.5 3.5"/><path d="m11 9 4 4"/>',
  id:    '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M6 16c.5-1.6 1.6-2.4 2.5-2.4S10.5 14.4 11 16"/><path d="M14 9.5h4M14 13h4"/>',
  crown: '<path d="M4 18h16l-1.5-9-4 3-2.5-6-2.5 6-4-3z"/>',
  log:   '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
  plus:  '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x:     '<path d="M18 6 6 18M6 6l12 12"/>',
  edit:  '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  eye:   '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  menu:  '<path d="M3 12h18M3 6h18M3 18h18"/>',
  bar:   '<path d="M4 20V10M11 20V4M18 20v-7"/><path d="M2 20h20"/>',
};
function ic(name, cls=''){
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]||''}</svg>`;
}

const NAV = {
  ishchi: [
    {sec:'Mening sahifam'},
    {href:'ishchi.html', key:'profil', icon:'id', label:'Profilim'},
  ],
  brigadir: [
    {sec:'Brigada'},
    {href:'brigadir.html',          key:'umumiy',   icon:'home',  label:'Umumiy'},
    {href:'brigadir.html#davomat',  key:'davomat',  icon:'cal',   label:'Kunlik davomat'},
    {href:'brigadir.html#hisobot',  key:'hisobot',  icon:'clip',  label:'Kunlik hisobot'},
    {href:'brigadir.html#otkazish', key:'otkazish', icon:'swap',  label:"O'tkazish / qabul"},
    {sec:'Arxiv'},
    {href:'brigadir.html#arxiv',    key:'arxiv',    icon:'file',  label:'Oylar arxivi'},
  ],
  buxgalter: [
    {sec:'Buxgalteriya'},
    {href:'buxgalter.html',            key:'brigadlar', icon:'build', label:'Brigadlar'},
    {href:'buxgalter.html#ishchilar',  key:'ishchilar', icon:'users', label:'Barcha ishchilar'},
    {sec:'Moliya'},
    {href:'buxgalter.html#qarz',       key:'qarz',      icon:'bar',   label:'Qarz statistikasi'},
    {href:'buxgalter.html#oylik',      key:'oylik',     icon:'cash',  label:"Chek to'lovlar"},
  ],
  hr: [
    {sec:'HR'},
    {href:'hr.html',            key:'royxat',   icon:'users', label:"Ishchilar ro'yxati"},
    {href:'hr.html#qoshish',   key:'qoshish',  icon:'plus',  label:'Yangi hodim'},
    {href:'hr.html#hujjat',    key:'hujjat',   icon:'clip',  label:'Hujjatlar muddati'},
    {sec:"Ko'rinish"},
    {href:'hr.html#brigadlar', key:'brigadlar',icon:'build', label:'Brigadlar kesimi'},
  ],
  ceo: [
    {sec:'Umumiy'},
    {href:'ceo.html',             key:'dash',      icon:'home',  label:'Boshqaruv paneli'},
    {href:'ceo.html#brigadlar',   key:'brigadlar', icon:'build', label:'Brigadlar reytingi'},
    {href:'ceo.html#ishchilar',   key:'ishchilar', icon:'users', label:'Ishchilar reytingi'},
    {sec:'Boshqaruv'},
    {href:'ceo.html#otkazish',    key:'otkazish',  icon:'swap',  label:"Brigadadan brigadaga"},
    {href:'ceo.html#arxiv',       key:'arxiv',     icon:'file',  label:'Arxiv'},
    {sec:'Moliya'},
    {href:'ceo-xarajat.html',  key:'xarajat',   icon:'cash',  label:'Oylik xarajatlar'},
  ],
  omborchi: [
    {sec:'Ombor'},
    {href:'omborchi.html', key:'kiyim', icon:'build', label:'Kiyim berish'},
  ],
};

const ROLE_META = {
  ishchi:    { label:'Ishchi',      name:'Sardor Tursunov'   },
  brigadir:  { label:'Brigadir',    name:'Aziz Karimov'      },
  buxgalter: { label:'Buxgalter',   name:'Nilufar Aliyeva'   },
  hr:        { label:'HR menejer',  name:'Kamola Yoldosheva' },
  ceo:       { label:'CEO',         name:'Rustam Mahmudov'   },
  omborchi:  { label:'Omborchi',    name:'Ombor xodimi'      },
};

/* ---- build sidebar HTML ---- */
function renderSidebar(role, activeKey){
  const meta = ROLE_META[role];
  const items = NAV[role];
  let html = `
  <aside class="sidebar" id="sidebar">
    <div class="brand">
      <div class="mark">QN</div>
      <div class="name">Qurilish Nazorat</div>
      <div class="role">${meta.label}</div>
    </div>
    <nav class="nav">`;
  items.forEach(it => {
    if(it.sec){ html += `<div class="sec-label">${it.sec}</div>`; return; }
    html += `<a href="${it.href}" class="${it.key===activeKey?'active':''}">${ic(it.icon)}<span>${it.label}</span></a>`;
  });
  html += `<a href="bildirishnomalar.html" class="${activeKey==='notifications'?'active':''}">${ic('bell')}<span>Bildirishnomalar</span><span class="nav-count">${NOTIFICATIONS.length}</span></a>`;
  html += `
    </nav>
    <div class="foot">
      <div class="id-tag" style="margin-bottom:10px;font-size:10px">${ic('id')}<b>${meta.name}</b></div>
      <a href="index.html">${ic('log')} Chiqish</a>
    </div>
  </aside>`;
  return html;
}

/* ---- build topbar HTML ---- */
function renderTopbar(title, sub){
  const notifs = NOTIFICATIONS.map(n=>`
    <div class="bell-item">
      <span class="ico ${n.type}"></span>
      <div class="txt"><b>${n.title}</b><span>${n.text}</span></div>
    </div>`).join('');

  return `
  <div class="topbar" id="topbar">
    <div class="topbar-left">
      <button class="menu-btn" id="menuBtn" aria-label="Menyu">${ic('menu')}</button>
      <div>
        <h1>${title}</h1>
        ${sub ? `<div class="sub">${sub}</div>` : ''}
      </div>
    </div>
    <div class="topbar-right">
      <div class="bell-wrap">
        <div class="bell" id="bellBtn" role="button" tabindex="0" aria-label="Bildirishnomalar">
          ${ic('bell')}
          <span class="dot">${NOTIFICATIONS.length}</span>
        </div>
        <div class="bell-panel" id="bellPanel">
          <div class="bp-head">Bildirishnomalar (${NOTIFICATIONS.length})</div>
          ${notifs}
          <a class="bp-all" href="bildirishnomalar.html">Barcha bildirishnomalarni ko'rish →</a>
        </div>
      </div>
    </div>
  </div>`;
}

/* ---- mount everything ---- */
function mountShell(role, activeKey, title, sub){
  sessionStorage.setItem('qnRole', role);
  // sidebar
  document.getElementById('sidebarSlot').outerHTML = renderSidebar(role, activeKey);
  // overlay
  document.body.insertAdjacentHTML('beforeend',
    '<div class="sidebar-overlay" id="sidebarOverlay"></div>');
  // topbar
  document.getElementById('topbarSlot').outerHTML = renderTopbar(title, sub);

  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const menuBtn  = document.getElementById('menuBtn');
  const bellBtn  = document.getElementById('bellBtn');
  const bellPanel= document.getElementById('bellPanel');

  function openSidebar(){
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar(){
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  overlay.addEventListener('click', closeSidebar);

  // swipe-to-close on mobile
  let touchStartX = 0;
  sidebar.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, {passive:true});
  sidebar.addEventListener('touchend', e => {
    if(e.changedTouches[0].clientX - touchStartX < -50) closeSidebar();
  }, {passive:true});

  // bell
  bellBtn.addEventListener('click', e => {
    e.stopPropagation();
    bellPanel.classList.toggle('open');
  });
  document.addEventListener('click', () => bellPanel.classList.remove('open'));
  bellBtn.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') bellPanel.classList.toggle('open'); });
}

/* ---- Toast notification ---- */
function toast(msg, type='ok'){
  const t = document.createElement('div');
  const colors = { ok:'var(--moss)', warn:'var(--amber-dark)', err:'var(--rust)' };
  t.style.cssText = `
    position:fixed; bottom:20px; right:20px; z-index:999;
    background:${colors[type]||colors.ok}; color:#fff;
    padding:12px 18px; border-radius:8px; font-size:13px; font-weight:600;
    box-shadow:0 4px 16px rgba(0,0,0,.2); max-width:calc(100vw - 40px);
    transform:translateY(20px); opacity:0; transition:all .2s ease;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(()=>{ t.style.transform='translateY(0)'; t.style.opacity='1'; });
  setTimeout(()=>{
    t.style.transform='translateY(20px)'; t.style.opacity='0';
    setTimeout(()=>t.remove(), 250);
  }, 2800);
}

/* ---- Tab switcher ---- */
function initTabs(containerId, defaultTab){
  const wrap = document.getElementById(containerId);
  if(!wrap) return;
  wrap.querySelectorAll('button[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('button[data-tab]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      wrap.querySelectorAll('[data-tabpanel]').forEach(p => {
        p.style.display = p.dataset.tabpanel === tab ? 'block' : 'none';
      });
    });
  });
  if(defaultTab){
    const def = wrap.querySelector(`button[data-tab="${defaultTab}"]`);
    if(def) def.click();
  }
}
