/* Application logic (extracted from standalone.html) */

/* ============================================================
   STATE
   ============================================================ */
let currentSeason = getCurrentSeason();
let currentWindowIndex = 0;
let snailClicks = 0;
let selectedParkId = null;
let currentParkId = null;
let parkTips = {}; // Keyed by park id, initialized from PARKS_DETAIL
let leafRainTimeout = null;

// Init tips from static data
Object.keys(PARKS_DETAIL).forEach(id => {
  parkTips[id] = [...PARKS_DETAIL[id].tips];
});

/* ============================================================
   UTILITY
   ============================================================ */
function getCurrentSeason() {
  const m = new Date().getMonth() + 1;
  if (m >= 3 && m <= 5) return 'spring';
  if (m >= 6 && m <= 8) return 'summer';
  if (m >= 9 && m <= 11) return 'autumn';
  return 'winter';
}

function showToast(msg) {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const el = document.createElement('div');
  el.className = 'toast-item';
  el.textContent = msg;
  c.appendChild(el);
  setTimeout(() => el.remove(), 3100);
}

function navigate(route) { location.hash = '#' + route; }

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

function handleModalOverlayClick(e, id) { if (e.target === e.currentTarget) closeModal(id); }

function toggleMobileMenu() { const m = document.getElementById('mobile-menu'); if (m) m.classList.toggle('open'); }

/* ============================================================
   SEASON
   ============================================================ */
function setSeason(s) {
  currentSeason = s;
  document.body.setAttribute('data-season', s);
  updateSeasonButtons();
  updateParticles();
  const hash = location.hash.replace('#','') || '/';
  if (hash === '/') renderHome();
}

function updateSeasonButtons() {
  document.querySelectorAll('.season-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.season === currentSeason);
  });
}

/* ============================================================
   PARTICLES
   ============================================================ */
function updateParticles() {
  const container = document.getElementById('seasonal-particles');
  if (!container) return;
  container.innerHTML = '';
  const count = 18;
  const animMap = { spring:'float-petal', summer:'float-spark', autumn:'float-leaf', winter:'float-snow' };
  const anim = animMap[currentSeason];

  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const delay = Math.random() * 10;
    const dur = 8 + Math.random() * 8;
    const size = 8 + Math.random() * 12;
    const el = document.createElement('div');
    el.className = 'seasonal-particle';
    el.style.cssText = `left:${x}%;top:0;animation:${anim} ${dur}s ease-in-out ${delay}s infinite;`;
    el.innerHTML = makeParticleSVG(currentSeason, size);
    container.appendChild(el);
  }
}

function makeParticleSVG(season, size) {
  if (season === 'spring') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
      <ellipse cx="10" cy="10" rx="5" ry="9" fill="#F4C2C2" opacity=".8" transform="rotate(30 10 10)"/>
      <ellipse cx="10" cy="10" rx="4" ry="8" fill="#F9D0D0" opacity=".6" transform="rotate(30 10 10)"/>
    </svg>`;
  } else if (season === 'summer') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="4" fill="#B8E0A0" opacity=".9"/>
      <circle cx="10" cy="10" r="7" fill="#B8E0A0" opacity=".25"/>
      <circle cx="10" cy="10" r="10" fill="#B8E0A0" opacity=".08"/>
    </svg>`;
  } else if (season === 'autumn') {
    const colors = ['#E8905A','#D4664A','#C84B36','#E8A040','#CC7030'];
    const c = colors[Math.floor(Math.random() * colors.length)];
    return `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
      <path d="M10 18 Q4 14 4 8 Q4 2 10 2 Q16 2 16 8 Q16 14 10 18Z" fill="${c}" opacity=".75"/>
      <line x1="10" y1="18" x2="10" y2="4" stroke="${c}" stroke-width=".8" opacity=".5"/>
    </svg>`;
  } else {
    return `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">
      <line x1="10" y1="2" x2="10" y2="18" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="2" y1="10" x2="18" y2="10" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="4.5" y1="4.5" x2="15.5" y2="15.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="15.5" y1="4.5" x2="4.5" y2="15.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="10" cy="10" r="2" fill="white" opacity=".7"/>
    </svg>`;
  }
}

/* ============================================================
   LEAF RAIN EASTER EGG
   ============================================================ */
function triggerLeafRain() {
  const el = document.getElementById('leaf-rain');
  if (!el) return;
  el.classList.remove('hidden');
  el.innerHTML = '';
  const emojis = ['🍃','🍂','🍀','🌿'];
  for (let i = 0; i < 40; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf-particle';
    leaf.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const x = Math.random() * 100;
    const dur = 3 + Math.random() * 2;
    const delay = Math.random() * 0.8;
    const size = 0.9 + Math.random() * 0.8;
    leaf.style.cssText = `left:${x}vw;font-size:${size}rem;animation-duration:${dur}s;animation-delay:${delay}s;`;
    el.appendChild(leaf);
  }
  if (leafRainTimeout) clearTimeout(leafRainTimeout);
  leafRainTimeout = setTimeout(() => {
    el.classList.add('hidden');
    el.innerHTML = '';
  }, 4000);
}

/* ============================================================
   ROUTER
   ============================================================ */
function getRoute() {
  const hash = location.hash;
  if (!hash || hash === '#' || hash === '#/') return { page: 'home' };
  const path = hash.replace('#', '');
  if (path === '/guide') return { page: 'guide' };
  if (path === '/random') return { page: 'random' };
  if (path === '/map') return { page: 'map' };
  if (path.startsWith('/park/')) return { page: 'park', id: path.split('/park/')[1] };
  return { page: 'home' };
}

function render() {
  const route = getRoute();
  const app = document.getElementById('app');
  const si = document.getElementById('scroll-indicator');

  // Update active nav
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const r = link.dataset.route;
    const hash = location.hash.replace('#', '') || '/';
    link.classList.toggle('active', r === '/' ? hash === '/' : hash.startsWith(r));
  });

  // Animate page transition progress bar
  animateProgress();

  // Show/hide scroll indicator (only on home)
  if (si) si.classList.toggle('hidden', route.page !== 'home');

  // Render
  switch (route.page) {
    case 'home':   renderHome(); break;
    case 'guide':  renderGuide(); break;
    case 'random': renderRandom(); break;
    case 'map':    renderMap(); break;
    case 'park':   renderParkDetail(route.id); currentParkId = route.id; break;
    default:       renderHome();
  }

  // Close mobile menu
  const mobile = document.getElementById('mobile-menu'); if (mobile) mobile.classList.remove('open');
}

function animateProgress() {
  const bar = document.getElementById('page-progress'); if (!bar) return;
  bar.style.transition = 'none';
  bar.style.width = '0%';
  bar.style.opacity = '1';
  requestAnimationFrame(() => {
    bar.style.transition = 'width .4s ease';
    bar.style.width = '90%';
    setTimeout(() => {
      bar.style.transition = 'width .3s ease, opacity .3s ease';
      bar.style.width = '100%';
      bar.style.opacity = '0';
      setTimeout(() => { bar.style.width = '0%'; }, 400);
    }, 400);
  });
}

/* ============================================================
   HOME PAGE
   ============================================================ */
function renderHome() {
  const meta = SEASON_META[currentSeason];
  const treeColorMap = {
    spring: 'rgba(91,140,116,0.35)',
    summer: 'rgba(60,110,80,0.4)',
    autumn: 'rgba(120,70,30,0.35)',
    winter: 'rgba(80,100,110,0.35)',
  };
  const tc = treeColorMap[currentSeason];

  const appEl = document.getElementById('app');
  if (!appEl) return;

  appEl.innerHTML = `
<div style="min-height:100vh;display:flex;flex-direction:column;" class="page-enter">
  <!-- Hero -->
  <div style="flex:1;position:relative;overflow:hidden;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding-top:70px;">

    <!-- Background image -->
    <div id="hero-bg" style="position:absolute;inset:0;background-image:url('${HERO_IMAGES[currentSeason]}');background-size:cover;background-position:center;z-index:0;"></div>

    <!-- Overlay -->
    <div id="hero-overlay"></div>

    <!-- Forest Silhouette -->
    <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax meet"
      style="position:absolute;bottom:0;left:0;right:0;width:100%;height:260px;z-index:2;pointer-events:none">
      <path d="M0 300 L0 200 Q20 160 40 200 L50 180 Q70 130 90 180 L100 150 Q130 80 160 150 L170 120 Q200 60 230 120 L250 90 Q270 50 290 90 L300 200 L300 300Z" fill="${tc}"/>
      <path d="M380 300 L380 220 Q400 170 420 220 L440 180 Q460 120 490 180 L510 140 Q540 70 570 140 L600 100 Q630 40 660 100 L680 140 Q710 70 740 140 L760 180 Q780 120 800 180 L820 220 Q840 170 860 220 L860 300Z" fill="${tc}"/>
      <path d="M900 300 L900 210 Q920 160 950 210 L970 170 Q1000 100 1040 170 L1060 130 Q1090 70 1120 130 L1140 170 Q1160 120 1180 170 L1200 200 L1200 300Z" fill="${tc}"/>
      <rect x="0" y="285" width="1200" height="15" fill="${tc}"/>
    </svg>

    <!-- Main Content -->
    <div style="position:relative;z-index:3;text-align:center;padding:0 24px;max-width:800px;">
      <!-- Season chip -->
      <div style="display:inline-block;background:rgba(247,227,175,0.85);border-radius:20px;padding:4px 16px;font-family:'Quicksand',sans-serif;font-size:.9rem;color:#A68A6B;margin-bottom:20px;border:1px dashed rgba(166,138,107,0.4);">
        ${meta.emoji} ${meta.desc}
      </div>

      <h1 style="font-family:'Caveat',cursive;font-size:clamp(2.2rem,6vw,4rem);color:#5B8C74;line-height:1.2;margin-bottom:16px;text-shadow:0 2px 20px rgba(253,251,247,0.8);font-weight:700;">
        把大脑调至静音，<br>把身体还给森林。
      </h1>

      <p style="font-family:'Quicksand',sans-serif;font-size:1.15rem;color:#A68A6B;margin-bottom:40px;letter-spacing:1px;">
        2021–2024 · 108次森林浴记录
      </p>

      <button class="forest-btn forest-btn-primary" onclick="navigate('/guide')" style="font-size:1.1rem;padding:14px 36px;">
        🌿 开始今天的森林浴
      </button>
    </div>

    <!-- Bottom: Season switcher + Declaration -->
    <div style="position:relative;z-index:3;width:100%;padding:32px 24px 48px;display:flex;flex-direction:column;align-items:center;gap:24px;">
      <!-- Season switcher -->
      <div style="display:flex;gap:16px;align-items:center;">
        ${['spring','summer','autumn','winter'].map(s => `
          <button class="season-btn${currentSeason===s?' active':''}" data-season="${s}"
            onclick="setSeason('${s}')" title="${SEASON_META[s].label}">
            <span style="font-size:1.5rem">${SEASON_META[s].emoji}</span>
          </button>
        `).join('')}
      </div>

      <!-- Declaration card -->
      <div style="position:relative;z-index:3;width:100%;max-width:480px;text-align:center;">
        <div style="background:rgba(253,251,247,0.88);border:1.5px dashed rgba(166,138,107,0.5);border-radius:20px 20px 20px 4px;padding:14px 24px;backdrop-filter:blur(4px);">
          <p style="font-family:'Quicksand',sans-serif;font-size:.9rem;color:#A68A6B;line-height:1.7;margin:0;font-style:italic;">
            这里没有算法推荐，只有风吹树叶和心跳变慢的声音。
          </p>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

/* ============================================================
   GUIDE PAGE
   ============================================================ */
function renderGuide() {
  const cards = GUIDES.map((g, i) => `
    <div class="hand-drawn-card guide-card" id="guide-card-${g.id}"
      style="animation: ${i%2===0?'slide-in-l':'slide-in-r'} .4s ease ${i*0.1}s both;"
      onclick="onGuideCardClick(${g.id})">
      <div style="font-family:'Caveat',cursive;font-size:2.5rem;color:rgba(91,140,116,0.2);font-weight:700;width:48px;flex-shrink:0;text-align:center;line-height:1;">${g.id}</div>
      <div style="flex:1;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap;">
          <h3 style="font-family:'Caveat',cursive;font-size:1.5rem;color:#5B8C74;margin:0;font-weight:700;">${g.title}</h3>
          <span style="background:${g.color};color:#A68A6B;border-radius:12px;padding:2px 10px;font-size:.78rem;font-family:'Quicksand',sans-serif;font-weight:500;">${g.tag}</span>
        </div>
        <p style="font-family:'Quicksand',sans-serif;font-size:.95rem;color:#A68A6B;margin:0 0 8px;line-height:1.7;">${g.description}</p>
        <span style="font-family:'Quicksand',sans-serif;font-size:.8rem;color:rgba(91,140,116,0.7);">⏱ ${g.time}</span>
      </div>
      <div class="guide-card-animal">${GUIDE_SVGS[g.svg] || ''}</div>
    </div>
  `).join('');

  const app = document.getElementById('app'); if (!app) return;
  app.innerHTML = `
<div style="padding:90px 24px 80px;max-width:760px;margin:0 auto;" class="page-enter">
  <div style="text-align:center;margin-bottom:48px;">
    <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:12px;">
      <h1 style="font-family:'Caveat',cursive;font-size:2.5rem;color:#5B8C74;margin:0;font-weight:700;">6种森林漫步指南</h1>
      <div id="snail-header" title="点我三次有彩蛋～" onclick="handleSnailClick()">
        ${GUIDE_SVGS.snail || ''}
      </div>
    </div>
    <p style="font-family:'Quicksand',sans-serif;color:#A68A6B;font-size:1rem;font-style:italic;">
      随时开始，即刻放松。不需要装备，不需要计划。
    </p>
    <div style="display:flex;align-items:center;gap:8px;justify-content:center;margin-top:8px;">
      <div style="height:1px;flex:1;background:repeating-linear-gradient(90deg,rgba(166,138,107,.3) 0,rgba(166,138,107,.3) 6px,transparent 6px,transparent 12px);"></div>
      <span style="font-size:.85rem;color:rgba(166,138,107,.6);font-family:'Quicksand',sans-serif;">· 点击蜗牛三次有彩蛋 ·</span>
      <div style="height:1px;flex:1;background:repeating-linear-gradient(90deg,rgba(166,138,107,.3) 0,rgba(166,138,107,.3) 6px,transparent 6px,transparent 12px);"></div>
    </div>
  </div>

  <div style="display:flex;flex-direction:column;gap:28px;">${cards}</div>

  <div style="margin-top:60px;text-align:center;">
    <hr class="forest-divider"/>
    <p style="font-family:'Quicksand',sans-serif;font-size:.875rem;color:rgba(166,138,107,0.5);font-style:italic;">更多疗愈小实验 coming soon...</p>
    <p style="font-size:1.5rem;margin-top:8px;">🌱</p>
  </div>
</div>`;
}

function onGuideCardClick(id) { if (id === 1) handleSnailClick(); }

function handleSnailClick() {
  snailClicks++;
  if (snailClicks >= 3) {
    snailClicks = 0;
    showToast('🍃 彩蛋解锁！树叶雨来啦～ 你真的很有耐心！');
    triggerLeafRain();
  } else {
    showToast(`🐌 再点 ${3 - snailClicks} 次...`);
  }
}

/* ============================================================
   RANDOM PAGE
   ============================================================ */
function renderRandom() {
  const w = FOREST_WINDOWS[currentWindowIndex];
  const dots = FOREST_WINDOWS.map((_, i) => `
    <button class="dot-indicator${i===currentWindowIndex?' active':''}" onclick="setWindowIndex(${i})"></button>
  `).join('');

  const app = document.getElementById('app'); if (!app) return;
  app.innerHTML = `
<div style="min-height:100vh;padding:90px 24px 48px;display:flex;flex-direction:column;align-items:center;justify-content:center;" class="page-enter">
  <div style="text-align:center;margin-bottom:32px;">
    <h1 style="font-family:'Caveat',cursive;font-size:2.2rem;color:#5B8C74;margin:0 0 8px;font-weight:700;">推开一扇森林的窗</h1>
    <p style="font-family:'Quicksand',sans-serif;font-size:.9rem;color:#A68A6B;font-style:italic;">每一扇窗外，都是别人眼中的森林</p>
  </div>

  <div style="width:100%;max-width:800px;">
    <div class="window-frame" style="aspect-ratio:16/9;position:relative;overflow:hidden;">
      <img src="${w.image}" alt="${w.location}" style="width:100%;height:70%;object-fit:cover;display:block;"/>
      <div class="window-vbar"></div>
      <div class="window-hbar"></div>
      <div style="height:30%;background:var(--color-cream);display:flex;align-items:center;justify-content:space-between;padding:12px 24px;border-top:3px solid var(--color-soil);">
        <div>
          <p style="font-family:'Quicksand',sans-serif;font-size:1rem;color:#5B8C74;margin:0 0 4px;font-weight:600;">${w.location}</p>
          <p style="font-family:'Quicksand',sans-serif;font-size:.85rem;color:#A68A6B;margin:0;font-style:italic;">${w.mood}</p>
        </div>
        ${w.contributor ? `<span style="background:rgba(247,227,175,.7);border-radius:12px;padding:4px 12px;font-size:.8rem;font-family:'Quicksand',sans-serif;color:#A68A6B;flex-shrink:0;">by ${w.contributor}</span>` : ''}
      </div>
      <div style="position:absolute;top:12px;right:16px;background:rgba(253,251,247,.8);border-radius:12px;padding:2px 10px;font-family:'Quicksand',sans-serif;font-size:.8rem;color:#A68A6B;z-index:10;">
        ${currentWindowIndex+1} / ${FOREST_WINDOWS.length}
      </div>
    </div>

    <div style="text-align:center;margin-top:28px;">
      <button class="forest-btn" onclick="nextWindow()" style="font-size:1.05rem;">🚪 推开另一扇窗</button>
    </div>

    <div style="display:flex;justify-content:center;gap:8px;margin-top:20px;">${dots}</div>
  </div>

  <button class="fab" onclick="document.getElementById('random-modal').classList.remove('hidden')" title="投递你的窗口">＋</button>
</div>`;
}

function nextWindow() { currentWindowIndex = (currentWindowIndex + 1) % FOREST_WINDOWS.length; renderRandom(); }
function setWindowIndex(i) { currentWindowIndex = i; renderRandom(); }
function handleRandomSubmit(e) { e.preventDefault(); closeModal('random-modal'); const rn=document.getElementById('r-nickname'); const rl=document.getElementById('r-location'); const ri=document.getElementById('r-image'); const rd=document.getElementById('r-desc'); if (rn) rn.value=''; if (rl) rl.value=''; if (ri) ri.value=''; if (rd) rd.value=''; showToast('🌿 你的小确幸已送达森林～'); }

/* ============================================================
   MAP PAGE
   ============================================================ */
function renderMap() {
  const app = document.getElementById('app'); if (!app) return;
  app.innerHTML = `
<div id="map-page" class="page-enter">
  <div style="position:absolute;top:82px;left:50%;transform:translateX(-50%);z-index:10;text-align:center;pointer-events:none;">
    <span style="background:rgba(253,251,247,.9);border:1.5px dashed rgba(166,138,107,.4);border-radius:20px;padding:6px 20px;font-family:'Caveat',cursive;font-size:1.4rem;color:#5B8C74;font-weight:700;">
      🗺️ 附近的森林浴圣地
    </span>
  </div>

  ${buildMapSVG()}

  <div id="park-popup" style="display:none;position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:var(--color-cream);border:2px dashed var(--color-soil);border-radius:20px 8px 20px 8px;padding:20px 24px;max-width:320px;width:90%;z-index:30;box-shadow:0 12px 32px rgba(91,140,116,.15);"></div>

  <button id="locate-btn" onclick="handleLocate()" style="position:fixed;bottom:32px;left:24px;background:var(--color-cream);border:2px dashed var(--color-soil);border-radius:20px 8px 20px 8px;padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:8px;font-family:'Quicksand',sans-serif;font-size:.85rem;color:#5B8C74;font-weight:600;box-shadow:0 4px 12px rgba(91,140,116,.15);z-index:20;">
    ◎ 你的位置
  </button>

  <div style="position:fixed;bottom:32px;right:24px;background:rgba(253,251,247,.85);border:1px dashed rgba(166,138,107,.3);border-radius:12px;padding:8px 14px;font-family:'Quicksand',sans-serif;font-size:.78rem;color:rgba(166,138,107,.7);z-index:20;">
    点击公园图标 · 探索周边
  </div>
</div>`;
}

function buildMapSVG() {
  const markers = PARKS.map(p => {
    const isSelected = selectedParkId === p.id;
    return `
    <g class="park-marker" data-id="${p.id}" onclick="onParkClick('${p.id}',event)" style="cursor:pointer">
      ${isSelected ? `<circle cx="${p.x}" cy="${p.y}" r="18" fill="none" stroke="${p.color}" stroke-width="2" opacity=".4" class="map-marker-ring"/>` : ''}
      <circle cx="${p.x}" cy="${p.y}" r="${isSelected?14:11}" fill="${p.color}" opacity="${isSelected?1:.8}" stroke="white" stroke-width="2.5" style="transition:all .2s ease"/>
      <text x="${p.x}" y="${p.y+4}" text-anchor="middle" font-size="12" style="user-select:none">${p.emoji}</text>
      <rect x="${p.x-24}" y="${p.y+16}" width="48" height="16" rx="8" fill="rgba(253,251,247,.9)" stroke="${p.color}66" stroke-width="1"/>
      <text x="${p.x}" y="${p.y+27}" text-anchor="middle" font-size="9" fill="${p.color}" font-family="'Quicksand',sans-serif" font-weight="600" style="user-select:none">${p.name}</text>
    </g>`;
  }).join('');

  return `<svg viewBox="0 0 900 580" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;cursor:default" onclick="onMapBgClick(event)">
    <defs>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r=".8" fill="rgba(166,138,107,.12)"/>
      </pattern>
    </defs>
    <rect width="900" height="580" fill="#EEF5EE"/>
    <rect width="900" height="580" fill="url(#dots)"/>
    <rect x="8" y="8" width="884" height="564" fill="none" stroke="rgba(166,138,107,.4)" stroke-width="2" stroke-dasharray="8,6" rx="8"/>

    <ellipse cx="150" cy="160" rx="130" ry="110" fill="rgba(91,140,116,.12)"/>
    <ellipse cx="680" cy="200" rx="150" ry="130" fill="rgba(91,140,116,.1)"/>
    <ellipse cx="360" cy="490" rx="200" ry="100" fill="rgba(91,140,116,.1)"/>

    <path d="M0 220 Q60 200 120 230 Q200 265 280 240 Q360 215 420 260 Q480 305 560 285 Q640 265 700 300 Q760 335 820 310 Q870 295 900 310" stroke="#85B8CF" stroke-width="14" fill="none" stroke-linecap="round" opacity=".55"/>
    <path d="M0 220 Q60 200 120 230 Q200 265 280 240 Q360 215 420 260 Q480 305 560 285 Q640 265 700 300 Q760 335 820 310 Q870 295 900 310" stroke="#A8D4E6" stroke-width="8" fill="none" stroke-linecap="round" opacity=".4"/>
    <text x="300" y="255" font-size="10" fill="#5B92A8" opacity=".7" font-family="'Quicksand',sans-serif" text-anchor="middle">≋ 翠溪 ≋</text>
    <path d="M420 580 Q440 520 460 480 Q480 440 500 420 Q520 400 515 272" stroke="#85B8CF" stroke-width="8" fill="none" stroke-linecap="round" opacity=".4"/>

    <polygon points="600,135 640,80 680,135" fill="#B8CEB8" opacity=".4" stroke="rgba(91,140,116,.2)" stroke-width="1"/>
    <polygon points="650,135 680,95 710,135" fill="#A8C4A0" opacity=".35"/>
    <polygon points="720,145 755,100 790,145" fill="#B8CEB8" opacity=".3"/>
    <polygon points="55,450 90,400 125,450" fill="#B8CEB8" opacity=".3"/>

    ${buildTrees()}

    <path d="M145 118 Q270 105 390 92" stroke="rgba(166,138,107,.25)" stroke-width="3" fill="none" stroke-dasharray="8,6" stroke-linecap="round"/>
    <path d="M145 118 Q125 220 108 328" stroke="rgba(166,138,107,.2)" stroke-width="3" fill="none" stroke-dasharray="8,6" stroke-linecap="round"/>
    <path d="M390 92 Q522 180 515 272" stroke="rgba(166,138,107,.2)" stroke-width="3" fill="none" stroke-dasharray="8,6" stroke-linecap="round"/>
    <path d="M515 272 Q480 355 468 440" stroke="rgba(166,138,107,.2)" stroke-width="3" fill="none" stroke-dasharray="8,6" stroke-linecap="round"/>
    <path d="M515 272 Q620 310 728 382" stroke="rgba(166,138,107,.2)" stroke-width="3" fill="none" stroke-dasharray="8,6" stroke-linecap="round"/>
    <path d="M108 328 Q165 398 222 468" stroke="rgba(166,138,107,.2)" stroke-width="3" fill="none" stroke-dasharray="8,6" stroke-linecap="round"/>

    <g transform="translate(840,50)">
      <circle cx="0" cy="0" r="24" fill="rgba(253,251,247,.8)" stroke="rgba(166,138,107,.5)" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="3" fill="#A68A6B"/>
      <path d="M0 -18 L3 0 L0 -4 L-3 0Z" fill="#C84B36" opacity=".8"/>
      <path d="M0 18 L3 0 L0 4 L-3 0Z" fill="#A68A6B" opacity=".6"/>
      <text x="0" y="-10" text-anchor="middle" font-size="7" fill="#A68A6B" font-family="sans-serif" font-weight="bold">N</text>
    </g>

    <g transform="translate(30,555)">
      <line x1="0" y1="-2" x2="80" y2="-2" stroke="rgba(166,138,107,.5)" stroke-width="1.5"/>
      <line x1="0" y1="-6" x2="0" y2="2" stroke="rgba(166,138,107,.5)" stroke-width="1.5"/>
      <line x1="80" y1="-6" x2="80" y2="2" stroke="rgba(166,138,107,.5)" stroke-width="1.5"/>
      <text x="40" y="-10" text-anchor="middle" font-size="8" fill="rgba(166,138,107,.7)" font-family="'Quicksand',sans-serif">1 km</text>
    </g>

    <g transform="translate(310,350)">
      <circle cx="0" cy="0" r="10" fill="#F4C2C2" stroke="white" stroke-width="2" opacity=".9"/>
      <circle cx="0" cy="0" r="4" fill="#E87080" opacity=".9"/>
      <path d="M-6 -8 Q0 -16 6 -8" fill="#5B8C74" opacity=".9"/>
      <rect x="-7" y="-10" width="14" height="3" rx="1.5" fill="#5B8C74" opacity=".9"/>
      <text x="0" y="22" text-anchor="middle" font-size="8" fill="#A68A6B" font-family="'Quicksand',sans-serif">你在这里</text>
    </g>

    ${markers}
  </svg>`;
}

function buildTrees() {
  const positions = [
    [60,110,22,.3],[100,140,18,.28],[180,100,20,.32],[220,130,16,.28],[80,175,14,.25],[160,200,18,.28],
    [580,150,20,.28],[620,180,16,.25],[700,150,22,.3],[740,180,18,.25],[800,160,20,.28],[850,190,15,.22],
    [280,470,18,.28],[330,500,22,.3],[400,480,18,.25],[440,510,20,.28],
    [150,360,16,.25],[60,490,20,.28],[820,340,18,.25],[860,440,22,.28],
  ];
  return positions.map(([x,y,s,o]) => `
    <g opacity="${o}">
      <polygon points="${x},${y-s*.8} ${x-s*.5},${y+s*.3} ${x+s*.5},${y+s*.3}" fill="#5B8C74"/>
      <polygon points="${x},${y-s*.5} ${x-s*.4},${y+s*.5} ${x+s*.4},${y+s*.5}" fill="#4A7A5B"/>
      <rect x="${x-2}" y="${y+s*.3}" width="4" height="${s*.4}" fill="#A68A6B"/>
    </g>
  `).join('');
}

function onParkClick(id, e) {
  e.stopPropagation();
  if (selectedParkId === id) {
    selectedParkId = null;
    const popup = document.getElementById('park-popup'); if (popup) popup.style.display = 'none';
    renderMap();
    return;
  }
  selectedParkId = id;
  renderMap();
  const park = PARKS.find(p => p.id === id);
  const popup = document.getElementById('park-popup'); if (!popup) return;
  popup.style.display = 'block';
  popup.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
      <div>
        <h3 style="font-family:'Caveat',cursive;font-size:1.5rem;color:#5B8C74;margin:0 0 4px;font-weight:700;">${park.emoji} ${park.name}</h3>
        <p style="font-family:'Quicksand',sans-serif;font-size:.8rem;color:#A68A6B;margin:0;">📍 距离约 ${park.distance}</p>
      </div>
      <span style="background:rgba(247,227,175,.7);border-radius:12px;padding:2px 10px;font-size:.75rem;font-family:'Quicksand',sans-serif;color:#A68A6B;flex-shrink:0;margin-left:8px;">全天开放</span>
    </div>
    <p style="font-family:'Quicksand',sans-serif;font-size:.88rem;color:#A68A6B;margin:0 0 16px;font-style:italic;line-height:1.6;">${park.description}</p>
    <button class="forest-btn forest-btn-primary" onclick="navigate('/park/${park.id}')" style="width:100%;justify-content:center;font-size:.9rem;">去看看 →</button>
  `;
}

function onMapBgClick(e) { if (e.target.closest('.park-marker')) return; selectedParkId = null; const popup = document.getElementById('park-popup'); if (popup) popup.style.display = 'none'; }

function handleLocate() { const btn = document.getElementById('locate-btn'); if (!btn) return; btn.textContent = '正在定位...'; setTimeout(() => { btn.innerHTML = '◎ 你的位置'; }, 1500); }

/* ============================================================
   PARK DETAIL PAGE
   ============================================================ */
function renderParkDetail(id) {
  const park = PARKS_DETAIL[id];
  const app = document.getElementById('app'); if (!app) return;
  if (!park) {
    app.innerHTML = `<div style="padding-top:90px;text-align:center;padding:120px 24px;" class="page-enter"><p style="font-family:'Caveat',cursive;font-size:2rem;color:#5B8C74;">找不到这片森林 🌿</p><button class="forest-btn" onclick="navigate('/map')" style="margin-top:20px;">回到地图</button></div>`;
    return;
  }

  currentParkId = id;
  const tips = parkTips[id] || [];

  const tipCards = tips.map(t => `
    <div class="sticky-note${t.isNew?' new-note':''}" style="transform:rotate(${t.rotation}deg);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="font-family:'Quicksand',sans-serif;font-size:.75rem;color:#A68A6B;font-weight:600;">${t.user}</span>
        <span style="font-size:1.1rem;">${t.animal}</span>
      </div>
      <p style="font-family:'Quicksand',sans-serif;font-size:.85rem;color:#6B5540;margin:0;line-height:1.55;">${t.content}</p>
    </div>
  `).join('');

  const features = park.features.map(f => `<span class="forest-tag" style="font-size:.75rem;">${f}</span>`).join('');

  app.innerHTML = `
<div style="padding-top:90px;min-height:100vh;" class="page-enter">
  <div style="max-width:1100px;margin:0 auto;padding:16px 24px 0;">
    <button class="forest-btn forest-btn-sm" onclick="navigate('/map')">← 返回地图</button>
  </div>

  <div style="max-width:1100px;margin:0 auto;padding:24px;" class="park-detail-grid">

    <div>
      <div class="hand-drawn-card" style="padding:0;overflow:hidden;margin-bottom:20px;">
        <div style="position:relative;">
          <img src="${park.image}" alt="${park.name}" style="width:100%;height:220px;object-fit:cover;display:block;"/>
          <div style="position:absolute;bottom:0;left:0;right:0;height:60px;background:linear-gradient(to top,rgba(253,251,247,.9),transparent);"></div>
          <span style="position:absolute;top:12px;right:12px;background:rgba(253,251,247,.9);border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;">${park.emoji}</span>
        </div>
        <div style="padding:20px;">
          <h1 style="font-family:'Caveat',cursive;font-size:1.8rem;color:#5B8C74;margin:0 0 8px;font-weight:700;">${park.name}</h1>
          <p style="font-family:'Quicksand',sans-serif;font-size:.9rem;color:#A68A6B;margin:0 0 16px;line-height:1.6;font-style:italic;">${park.longDesc}</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;align-items:center;gap:8px;"><span style="color:#5B8C74;">⏰</span><span style="font-family:'Quicksand',sans-serif;font-size:.85rem;color:#A68A6B;">${park.openTime}</span></div>
            <div style="display:flex;align-items:center;gap:8px;"><span style="color:#5B8C74;">📍</span><span style="font-family:'Quicksand',sans-serif;font-size:.85rem;color:#A68A6B;">距离约 ${park.distance}</span></div>
            <div style="display:flex;align-items:center;gap:8px;"><span style="color:#5B8C74;">🌱</span><span style="font-family:'Quicksand',sans-serif;font-size:.85rem;color:#A68A6B;">${park.mood}</span></div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:16px;">${features}</div>
        </div>
      </div>
    </div>

    <div>
      <div style="margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <div>
          <h2 style="font-family:'Caveat',cursive;font-size:1.8rem;color:#5B8C74;margin:0 0 4px;font-weight:700;">大家的疗愈小本本 📌</h2>
          <p style="font-family:'Quicksand',sans-serif;font-size:.85rem;color:#A68A6B;margin:0;">${tips.length} 条来自森林浴客的真实发现</p>
        </div>
        <button class="forest-btn" onclick="openParkTipForm()" style="font-size:.88rem;padding:10px 18px;">＋ 添加我的小发现</button>
      </div>

      <div id="tips-wall" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px;">${tipCards || `<div style="text-align:center;padding:48px 24px;color:rgba(166,138,107,.5);font-family:'Quicksand',sans-serif;font-style:italic;grid-column:1/-1;"><p style="font-size:2rem;">🌱</p><p>还没有发现，成为第一个分享的人吧</p></div>`}
      </div>
    </div>
  </div>
</div>`;
}

function openParkTipForm() { const elUser = document.getElementById('tip-user'); const elContent = document.getElementById('tip-content'); if (elUser) elUser.value = ''; if (elContent) elContent.value = ''; const modal = document.getElementById('park-tip-modal'); if (modal) modal.classList.remove('hidden'); }

function handleParkTipSubmit(e) {
  e.preventDefault();
  const user = document.getElementById('tip-user').value.trim();
  const content = document.getElementById('tip-content').value.trim();
  if (!user || !content) return;

  const animals = ['🐿️','🦔','🐦','🦋','🐛','🐸','🦎','🐜','🐌'];
  const newTip = { id: 'new-' + Date.now(), user, content, animal: animals[Math.floor(Math.random() * animals.length)], rotation: (Math.random() - 0.5) * 4, isNew: true };

  parkTips[currentParkId] = [newTip, ...(parkTips[currentParkId] || [])];
  closeModal('park-tip-modal');
  showToast('📌 你的小发现已贴上墙啦！');
  renderParkDetail(currentParkId);
}

/* ============================================================
   NAVBAR LINKS
   ============================================================ */
function attachNavLinks() {
  document.querySelectorAll('[data-route]').forEach(el => { el.addEventListener('click', () => navigate(el.dataset.route)); });
  const logo = document.getElementById('navbar-logo'); if (logo) logo.addEventListener('click', (e) => { e.preventDefault(); navigate('/'); });
}

/* ============================================================
   INIT
   ============================================================ */
window.addEventListener('hashchange', render);
window.addEventListener('load', () => {
  document.body.setAttribute('data-season', currentSeason);
  updateParticles();
  attachNavLinks();
  render();
  const randomForm = document.getElementById('random-submit-form'); if (randomForm) randomForm.addEventListener('submit', handleRandomSubmit);
  const parkTipForm = document.getElementById('park-tip-form'); if (parkTipForm) parkTipForm.addEventListener('submit', handleParkTipSubmit);
});
