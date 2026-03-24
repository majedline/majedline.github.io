/* ============================================================
   WASEL — وصل | Navigation & Profile Sheet (nav.js)
   No auth guard — all pages accessible for testing.
   Call buildNav(pageName) after initData() resolves.
   ============================================================ */

function buildNav(activePage) {
  const unread = Object.values(CHAT_HISTORY)
    .flat()
    .filter(m => m.from === 'them' && !m.read).length;

  const av = WaselState.selectedAvatar
    || WaselState.currentUser?.avatar
    || '👤';

  // Remove any existing nav first (safe re-render)
  document.querySelector('.bottom-nav')?.remove();

  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.innerHTML = `
    <a class="nav-item ${activePage === 'discover' ? 'active' : ''}" href="discover.html">
      <span class="nav-icon">🔍</span>
      <span>Discover</span>
    </a>
    <a class="nav-item ${activePage === 'messages' ? 'active' : ''}" href="messages.html">
      <span class="nav-icon">💬</span>
      <span>Messages</span>
      ${unread > 0 ? `<span class="badge">${unread}</span>` : ''}
    </a>
    <a class="nav-item ${activePage === 'games' ? 'active' : ''}" href="games.html">
      <span class="nav-icon">🎮</span>
      <span>Games</span>
    </a>
    <a class="nav-item ${activePage === 'profile' ? 'active' : ''}" href="profile.html">
      <span class="nav-icon">${av}</span>
      <span>Profile</span>
    </a>
  `;
  document.body.appendChild(nav);

  // Ensure toast element exists
  if (!document.getElementById('toast')) {
    const t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
}

/* ----------------------------------------------------------
   Profile Sheet — inject once, reuse on every openProfile()
   ---------------------------------------------------------- */
function buildProfileSheet() {
  if (document.getElementById('profile-overlay')) return;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="profile-overlay" id="profile-overlay" onclick="closeProfileIfOutside(event)">
      <div class="profile-sheet">
        <div class="profile-sheet-header">
          <span class="big-avatar" id="pv-avatar">👤</span>
          <h3 id="pv-name">—</h3>
          <p id="pv-sub" style="color:var(--text-muted);font-size:14px;margin-top:4px;">—</p>
          <p id="pv-since" style="color:var(--text-dim);font-size:11px;margin-top:2px;"></p>
        </div>
        <div class="profile-detail-grid">
          <div class="detail-box">Age<div class="val" id="pv-age">—</div></div>
          <div class="detail-box">Gender<div class="val" id="pv-gender">—</div></div>
          <div class="detail-box">City<div class="val" id="pv-city">—</div></div>
          <div class="detail-box">Status<div class="val" id="pv-status">—</div></div>
        </div>
        <div id="pv-tags" style="display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 14px;"></div>
        <p id="pv-bio" style="font-size:13px;color:var(--text-muted);margin-bottom:16px;line-height:1.5;"></p>
        <div class="profile-actions">
          <button class="btn-teal" onclick="pvGoChat()">💬 Message</button>
          <button class="btn-ghost" onclick="pvChallenge()">🎮 Challenge</button>
        </div>
        <button class="btn-ghost" style="width:100%;margin-top:10px;" onclick="closeProfile()">
          Close
        </button>
      </div>
    </div>
  `);
}

let _currentProfilePerson = null;

function openProfile(id) {
  buildProfileSheet();
  const p = PEOPLE.find(x => x.id === id);
  if (!p) return;
  _currentProfilePerson = p;

  document.getElementById('pv-avatar').textContent  = p.avatar;
  document.getElementById('pv-name').textContent    = p.name;
  document.getElementById('pv-sub').textContent     = p.community.join(' · ');
  document.getElementById('pv-since').textContent   = p.memberSince ? 'Member since ' + p.memberSince : '';
  document.getElementById('pv-age').textContent     = p.age;
  document.getElementById('pv-gender').textContent  = p.gender;
  document.getElementById('pv-city').textContent    = p.city;

  const statusEl = document.getElementById('pv-status');
  if (p.online) {
    statusEl.textContent   = '🟢 Online';
    statusEl.style.color   = 'var(--green)';
  } else {
    statusEl.textContent   = p.lastSeen || 'Offline';
    statusEl.style.color   = 'var(--text-muted)';
  }

  document.getElementById('pv-bio').textContent = p.bio || '';

  const tagsEl = document.getElementById('pv-tags');
  tagsEl.innerHTML = [
    ...p.community.map(c => `<span class="tag-sm">${c}</span>`),
    ...p.interests.map(i  => `<span class="tag-sm tag-teal">${i}</span>`),
  ].join('');

  document.getElementById('profile-overlay').classList.add('open');
}

function closeProfile() {
  document.getElementById('profile-overlay')?.classList.remove('open');
}

function closeProfileIfOutside(e) {
  if (e.target === document.getElementById('profile-overlay')) closeProfile();
}

function pvGoChat() {
  if (!_currentProfilePerson) return;
  closeProfile();
  window.location.href = `chat.html?id=${_currentProfilePerson.id}`;
}

function pvChallenge() {
  if (!_currentProfilePerson) return;
  closeProfile();
  showToast('Challenge sent to ' + _currentProfilePerson.name.split(' ')[0] + '! 🎮');
  setTimeout(() => window.location.href = 'games.html', 800);
}
