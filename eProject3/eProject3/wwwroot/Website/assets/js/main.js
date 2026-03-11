// ═══════════════════════════════════════════════════════
//  XYZ Pharmaceuticals — master.js
//  All pages · All functions
// ═══════════════════════════════════════════════════════

// ── Data ──
const DB = {
  candidates: [
    { id:1, fname:'Rahul', lname:'Mehta', email:'rahul@email.com', pass:'pass1234', phone:'9876543210', role:'Mechanical Engineer', status:'new', dob:'1995-04-12', city:'Mumbai', edu:'Bachelor\'s (B.E./B.Tech)', field:'Mechanical Engineering', inst:'VJTI Mumbai', year:'2018', exp:'5–10 years', employer:'Atlas Copco', skills:'AutoCAD, SolidWorks, GMP, Lean Manufacturing', hasResume:true },
    { id:2, fname:'Ananya', lname:'Singh', email:'ananya@email.com', pass:'pass1234', phone:'9812345678', role:'Quality Assurance', status:'reviewed', dob:'1997-09-23', city:'Pune', edu:'Master\'s (M.E./M.Tech/MBA)', field:'Pharmaceutical Technology', inst:'ICT Mumbai', year:'2020', exp:'2–5 years', employer:'Sun Pharma', skills:'QA/QC, GMP, HPLC, Stability Testing', hasResume:true },
    { id:3, fname:'Vishal', lname:'Kumar', email:'vishal@email.com', pass:'pass1234', phone:'9944332211', role:'Software / Automation Engineer', status:'new', dob:'1993-12-05', city:'Hyderabad', edu:'Bachelor\'s (B.E./B.Tech)', field:'Electronics & Communication', inst:'JNTU Hyderabad', year:'2016', exp:'5–10 years', employer:'Siemens', skills:'Siemens PLC, SCADA, HMI, Python', hasResume:false },
    { id:4, fname:'Divya', lname:'Patel', email:'divya@email.com', pass:'pass1234', phone:'9823456789', role:'Sales Executive', status:'hired', dob:'1990-07-18', city:'Ahmedabad', edu:'Master\'s (M.E./M.Tech/MBA)', field:'Business Administration', inst:'IIM Ahmedabad', year:'2014', exp:'10+ years', employer:'Bosch', skills:'B2B Sales, CRM, Pharma Equipment, International Markets', hasResume:true },
  ],
  loggedInCandidate: null,
  adminLoggedIn: false,
};

// persistence helpers
function saveDBtoStorage() {
  try { localStorage.setItem('xyz-db', JSON.stringify({
      candidates: DB.candidates,
      loggedInCandidate: DB.loggedInCandidate,
      adminLoggedIn: DB.adminLoggedIn
  })); } catch(e) {}
}
function loadDBfromStorage() {
  try {
    const stored = localStorage.getItem('xyz-db');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.candidates) {
        DB.candidates = parsed.candidates;
        DB.loggedInCandidate = parsed.loggedInCandidate;
        DB.adminLoggedIn = parsed.adminLoggedIn;
      }
    }
  } catch(e) {}
}

function setLoggedInCandidate(cand) {
  if (!cand) return;
  DB.loggedInCandidate = cand;
  saveDBtoStorage();
  // update UI if present
  if (document.getElementById('career-landing')) {
    document.getElementById('career-landing').classList.add('hidden');
    document.getElementById('career-dashboard').classList.remove('hidden');
    document.getElementById('dash-greeting').textContent = `Welcome back, ${cand.fname}!`;
    document.getElementById('cand-sb-avatar').textContent = cand.fname[0] + cand.lname[0];
    document.getElementById('cand-sb-name').textContent = cand.fname + ' ' + cand.lname;
    document.getElementById('cand-sb-role').textContent = cand.role;
    document.getElementById('d-fname').value = cand.fname;
    document.getElementById('d-lname').value = cand.lname;
    document.getElementById('d-email').value = cand.email;
    updateResumeStatDisplay(cand);
    switchDashPanel('overview');
    showToast(`Welcome back, ${cand.fname}!`);
  }
}

function clearLoggedInCandidate() {
  DB.loggedInCandidate = null;
  saveDBtoStorage();
}

function setAdminLoggedIn(val) {
  DB.adminLoggedIn = !!val;
  saveDBtoStorage();
  if (DB.adminLoggedIn && document.getElementById('admin-login-panel')) {
    document.getElementById('admin-login-panel').classList.add('hidden');
    document.getElementById('admin-dashboard').classList.remove('hidden');
    renderCandidates();
    renderAdminOverviewCandidates();
    switchAdminPanel('overview');
    showToast('Admin access granted.');
  }
}

function clearAdminLoggedIn() {
  DB.adminLoggedIn = false;
  saveDBtoStorage();
}

const candPanelMeta = {
  overview:      { title: 'Dashboard Overview',  breadcrumb: 'Overview' },
  personal:      { title: 'Personal Details',    breadcrumb: 'Personal Details' },
  education:     { title: 'Education & Experience', breadcrumb: 'Education' },
  resume:        { title: 'Resume Upload',        breadcrumb: 'Resume' },
  applications:  { title: 'My Applications',     breadcrumb: 'Applications' },
  notifications: { title: 'Notifications',       breadcrumb: 'Notifications' },
}
const adminPanelMeta = {
  overview:   { title: 'Dashboard Overview',  breadcrumb: 'Overview' },
  candidates: { title: 'Job Applicants',      breadcrumb: 'Job Applicants' },
  quotes:     { title: 'Quote Requests',      breadcrumb: 'Quote Requests' },
  messages:   { title: 'Messages',            breadcrumb: 'Messages' },
  analytics:  { title: 'Analytics',           breadcrumb: 'Analytics' },
  settings:   { title: 'Site Settings',       breadcrumb: 'Settings' },
}

// ── Functions ──

// toggleTheme
// toggleTheme
// ═══════════════════════════════════════
//  THEME TOGGLE
// ═══════════════════════════════════════
function toggleTheme() {
  // flip between light / dark and update label to show current theme
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  // label reflects *current* theme, not the action
  const lbl = document.getElementById('themeLabel');
  if (lbl) lbl.textContent = next === 'dark' ? 'Dark' : 'Light';
  try { localStorage.setItem('xyz-theme', next); } catch(e) {}
}

// initTheme
// initTheme
function initTheme() {
  let saved = 'light';
  try { saved = localStorage.getItem('xyz-theme') || 'light'; } catch(e) {}
  document.documentElement.setAttribute('data-theme', saved);
  const lbl = document.getElementById('themeLabel');
  if (lbl) lbl.textContent = saved === 'dark' ? 'Dark' : 'Light';
}

// showPage
// showPage
// ═══════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════
function showPage(id, opts = {}) {
  const pages = {
    home: 'index.html',
    about: 'about.html',
    products: 'products.html',
    contact: 'contact.html',
    quote: 'quote.html',
    career: 'career.html',
    admin: 'admin.html',
  };
  // remember desired product tab when navigating
  if (id === 'products' && opts.tab) {
    try { localStorage.setItem('xyz-prod-tab', opts.tab); } catch(e) {}
  }
  if (pages[id]) { window.location.href = pages[id]; }
}

// showToast
// showToast
// ═══════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════
function showToast(msg, type='success') {
  const t = document.getElementById('toast');
  t.className = `toast toast-${type} show`;
  t.innerHTML = (type === 'success' ? '✓ ' : '✗ ') + msg;
  setTimeout(() => t.classList.remove('show'), 3500);
}

// setProductTab
// setProductTab
// ═══════════════════════════════════════
//  PRODUCTS
// ═══════════════════════════════════════
function setProductTab(tab) {
  const tabs = ['capsule','tablet','liquid','blending','process','used'];
  document.querySelectorAll('.product-tab').forEach((b,i) => {
    b.classList.toggle('active', tabs[i] === tab);
  });
  document.querySelectorAll('.product-cat-section').forEach(s => s.classList.remove('active'));
  const section = document.getElementById('prod-' + tab);
  if (section) section.classList.add('active');
}

// switchCareerTab
// switchCareerTab
function switchCareerTab(tab) {
  ['login','register'].forEach(t => {
    document.getElementById('career-tab-' + t).classList.toggle('active', t === tab);
  });
  document.querySelectorAll('#career-landing .tab-btn').forEach((b,i) => {
    b.classList.toggle('active', i === (tab === 'login' ? 0 : 1));
  });
}

// toggleSidebar
// toggleSidebar
// ═══════════════════════════════════════
//  SIDEBAR TOGGLE
// ═══════════════════════════════════════
function toggleSidebar(id) {
  const sb = document.getElementById(id);
  sb.classList.toggle('collapsed');
  const btn = sb.querySelector('.sidebar-collapse-btn');
  btn.textContent = sb.classList.contains('collapsed') ? '›' : '‹';
}

// switchDashPanel
// switchDashPanel
function switchDashPanel(panel) {
  const urls = {"overview": "candidate_overview.html", "personal": "candidate_personal.html", "education": "candidate_education.html", "resume": "candidate_resume.html", "applications": "candidate_applications.html", "notifications": "candidate_notifications.html"};
  if (urls[panel]) window.location.href = urls[panel];
}

// switchDashTab
// switchDashTab
// Legacy tab compat (keep for any old calls)
function switchDashTab(tab) { switchDashPanel(tab); }

// switchAdminPanel
// switchAdminPanel
function switchAdminPanel(panel) {
  const urls = {"overview": "admin_overview.html", "candidates": "admin_candidates.html", "quotes": "admin_quotes.html", "messages": "admin_messages.html", "analytics": "admin_analytics.html", "settings": "admin_settings.html"};
  if (urls[panel]) window.location.href = urls[panel];
}

// switchAdminTab
// switchAdminTab
// Legacy compat
function switchAdminTab(tab) { switchAdminPanel(tab); }

// submitContact
// submitContact
// ═══════════════════════════════════════
//  CONTACT FORM
// ═══════════════════════════════════════

//function submitContact() {
//  const email = document.getElementById('c-email').value.trim();
//  const fname = document.getElementById('c-fname').value.trim();
//  if (!fname || !email) { showToast('Please fill in required fields.', 'error'); return; }
//  document.getElementById('contact-success').classList.remove('hidden');
//  showToast('Message sent successfully!');
//  ['c-fname','c-lname','c-email','c-phone','c-subject','c-message'].forEach(id => document.getElementById(id).value = '');
//  setTimeout(() => document.getElementById('contact-success').classList.add('hidden'), 5000);
//}

// submitQuote
// submitQuote
// ═══════════════════════════════════════
//  QUOTE FORM
// ═══════════════════════════════════════


// doLogin
// doLogin
// ═══════════════════════════════════════
//  CAREER AUTH
// ═══════════════════════════════════════
function doLogin() {
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pass = document.getElementById('login-pass').value;
  const cand = DB.candidates.find(c => c.email === email && c.pass === pass);
  document.getElementById('login-error').classList.toggle('hidden', !!cand);
  if (!cand) return;
  setLoggedInCandidate(cand);
}

// doRegister
// doRegister


// doLogout
// doLogout


// savePersonal
// savePersonal


// saveEducation
// saveEducation
function saveEducation() {
  showToast('Education details saved!');
}

// handleResumeUpload
// handleResumeUpload
function handleResumeUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { showToast('File too large. Max 5MB.', 'error'); return; }
  const allowed = ['.pdf','.doc','.docx'];
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  if (!allowed.includes(ext)) { showToast('Invalid file type. Use PDF, DOC, or DOCX.', 'error'); return; }
  if (DB.loggedInCandidate) {
    DB.loggedInCandidate.hasResume = true;
    saveDBtoStorage();
    updateResumeStatDisplay(DB.loggedInCandidate);
  }
  const status = document.getElementById('resume-status');
  status.classList.remove('hidden');
  status.innerHTML = `<div class="alert alert-success">✓ Resume uploaded: <strong>${file.name}</strong> (${(file.size/1024).toFixed(0)} KB)</div>`;
  showToast('Resume uploaded successfully!');
}

// updateResumeStatDisplay
// updateResumeStatDisplay
// ═══════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════
function updateResumeStatDisplay(cand) {
  const sv = document.getElementById('cand-stat-resume');
  const ss = document.getElementById('cand-stat-resume-sub');
  if (sv) sv.textContent = cand.hasResume ? '✓' : '—';
  if (ss) { ss.textContent = cand.hasResume ? 'Uploaded' : 'Not uploaded'; ss.style.color = cand.hasResume ? 'var(--success)' : '#6e8bff'; }
  const stepResume = document.getElementById('step-resume');
  if (stepResume) { stepResume.textContent = cand.hasResume ? '✓ Done' : 'Pending'; stepResume.style.color = cand.hasResume ? 'var(--success)' : 'var(--text-muted)'; }
  updateProfileCompletion(cand);
}

// updateProfileCompletion
// updateProfileCompletion
function updateProfileCompletion(cand) {
  const steps = [true, cand.hasResume]; // personal always done after login, resume
  const pct = Math.round((steps.filter(Boolean).length / 3) * 100) + 33; // 33% base for logging in
  const capped = Math.min(pct, 100);
  const bar = document.getElementById('cand-profile-bar');
  const label = document.getElementById('cand-pct-label');
  const headLabel = document.getElementById('cand-profile-pct');
  if (bar) bar.style.width = capped + '%';
  if (label) label.textContent = capped + '%';
  if (headLabel) headLabel.textContent = capped + '%';
}

// adminLogin
// adminLogin
// ═══════════════════════════════════════
//  ADMIN AUTH
// ═══════════════════════════════════════


// adminLogout
// adminLogout


// renderCandidates
// renderCandidates
function renderCandidates(filter='', statusFilter='') {
  const list = document.getElementById('candidate-list');
  if (!list) return;
  const filtered = DB.candidates.filter(c => {
    const matchText = (c.fname + ' ' + c.lname + ' ' + c.email + ' ' + c.role).toLowerCase().includes(filter.toLowerCase());
    const matchStatus = !statusFilter || c.status === statusFilter;
    return matchText && matchStatus;
  });
  if (filtered.length === 0) { list.innerHTML = '<div style="color:var(--text-muted);font-size:0.875rem;padding:1rem;">No candidates found.</div>'; return; }
  list.innerHTML = filtered.map(c => `
    <div class="admin-candidate-row">
      <div class="candidate-avatar">${c.fname[0]}${c.lname[0]}</div>
      <div>
        <div class="candidate-name">${c.fname} ${c.lname}</div>
        <div class="candidate-role">${c.role} · ${c.city || 'Location not set'}</div>
      </div>
      <div class="candidate-meta">
        <span class="badge badge-${c.status}">${c.status}</span>
        ${c.hasResume ? '<span style="font-size:0.75rem;color:var(--teal);">📄 Resume</span>' : '<span style="font-size:0.75rem;color:var(--text-muted);">No Resume</span>'}
        <button class="btn btn-outline btn-sm" onclick="viewCandidate(${c.id})">View</button>
        <button class="btn btn-outline btn-sm" onclick="openEmailModal('${c.fname} ${c.lname}','${c.email}')">✉ Email</button>
      </div>
    </div>
  `).join('');
}

// filterCandidates
// filterCandidates
function filterCandidates(val) { renderCandidates(val); }

// filterByStatus
// filterByStatus
function filterByStatus(status) {
  renderCandidates('', status);
}

// viewCandidate
// viewCandidate
function viewCandidate(id) {
  const c = DB.candidates.find(x => x.id === id);
  if (!c) return;
  document.getElementById('cand-modal-name').textContent = c.fname + ' ' + c.lname;
  document.getElementById('cand-modal-body').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
      <div><div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">Email</div><div style="color:var(--text-head);font-size:0.9rem;">${c.email}</div></div>
      <div><div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">Phone</div><div style="color:var(--text-head);font-size:0.9rem;">${c.phone || 'Not provided'}</div></div>
      <div><div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">Applying For</div><div style="color:var(--text-head);font-size:0.9rem;">${c.role}</div></div>
      <div><div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">Status</div><span class="badge badge-${c.status}">${c.status}</span></div>
      <div><div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">Education</div><div style="color:var(--text-head);font-size:0.9rem;">${c.edu || '—'}</div></div>
      <div><div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">Field</div><div style="color:var(--text-head);font-size:0.9rem;">${c.field || '—'}</div></div>
      <div><div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">Institution</div><div style="color:var(--text-head);font-size:0.9rem;">${c.inst || '—'}</div></div>
      <div><div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">Experience</div><div style="color:var(--text-head);font-size:0.9rem;">${c.exp || '—'}</div></div>
      <div><div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">Last Employer</div><div style="color:var(--text-head);font-size:0.9rem;">${c.employer || '—'}</div></div>
      <div><div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">Resume</div><div style="color:var(--text-head);font-size:0.9rem;">${c.hasResume ? '✓ Uploaded' : 'Not uploaded'}</div></div>
    </div>
    ${c.skills ? `<div style="margin-bottom:1.5rem;"><div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.5rem;">Skills</div><div style="display:flex;flex-wrap:wrap;gap:0.4rem;">${c.skills.split(',').map(s => `<span style="background:rgba(0,194,168,0.1);border:1px solid rgba(0,194,168,0.2);border-radius:100px;padding:0.2rem 0.7rem;font-size:0.78rem;color:var(--teal);">${s.trim()}</span>`).join('')}</div></div>` : ''}
    <div style="display:flex;gap:1rem;flex-wrap:wrap;">
      <select id="cand-status-select" style="flex:1;" onchange="updateCandidateStatus(${c.id},this.value)">
        <option value="new" ${c.status==='new'?'selected':''}>New</option>
        <option value="reviewed" ${c.status==='reviewed'?'selected':''}>Reviewed</option>
        <option value="hired" ${c.status==='hired'?'selected':''}>Hired</option>
      </select>
      <button class="btn btn-primary" onclick="document.getElementById('candidate-modal').classList.remove('open');openEmailModal('${c.fname} ${c.lname}','${c.email}')">✉ Email Candidate</button>
    </div>
  `;
  document.getElementById('candidate-modal').classList.add('open');
}

// updateCandidateStatus
// updateCandidateStatus
function updateCandidateStatus(id, status) {
  const c = DB.candidates.find(x => x.id === id);
  if (c) { c.status = status; saveDBtoStorage(); renderCandidates(); showToast(`Status updated to "${status}"`); }
}

// renderAdminOverviewCandidates
// renderAdminOverviewCandidates
function renderAdminOverviewCandidates() {
  const el = document.getElementById('admin-overview-candidates');
  if (!el) return;
  const recent = DB.candidates.slice(-4).reverse();
  el.innerHTML = recent.map(c => `
    <div style="display:flex;align-items:center;gap:0.875rem;padding:0.875rem 1.5rem;border-bottom:1px solid var(--border);">
      <div class="candidate-avatar" style="width:32px;height:32px;font-size:0.78rem;">${c.fname[0]}${c.lname[0]}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-weight:600;font-size:0.85rem;color:var(--text-head);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.fname} ${c.lname}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);">${c.role}</div>
      </div>
      <span class="badge badge-${c.status}">${c.status}</span>
      <button class="btn btn-outline btn-sm" onclick="openEmailModal('${c.fname} ${c.lname}','${c.email}')">✉ Email</button>
    </div>
  `).join('');
}

// updateAdminStats
// updateAdminStats
function updateAdminStats() {
  const badgeEl = document.getElementById('admin-badge-cands');
  const statEl = document.getElementById('admin-stat-candidates');
  if (badgeEl) badgeEl.textContent = DB.candidates.length;
  if (statEl) statEl.textContent = DB.candidates.length;
}

// openEmailModal
// openEmailModal
// ═══════════════════════════════════════
//  EMAIL MODAL
// ═══════════════════════════════════════
function openEmailModal(name, email) {
  document.getElementById('email-to').value = email;
  document.getElementById('email-to-name').textContent = 'To: ' + name;
  document.getElementById('email-subject').value = 'Interview Invitation — XYZ Pharmaceuticals';
  document.getElementById('email-body').value = `Dear ${name.split(' ')[0]},\n\nWe have reviewed your application and are pleased to invite you for an interview at XYZ Pharmaceuticals.\n\nPlease reply with your availability for the upcoming week.\n\nBest regards,\nHR Department\nXYZ Pharmaceuticals`;
  document.getElementById('email-send-success').classList.add('hidden');
  document.getElementById('email-modal').classList.add('open');
}

// closeEmailModal
// closeEmailModal
function closeEmailModal() {
  document.getElementById('email-modal').classList.remove('open');
}

// sendEmail
// sendEmail
function sendEmail() {
  const to = document.getElementById('email-to').value;
  const subj = document.getElementById('email-subject').value;
  if (!to || !subj) { showToast('Please fill TO and Subject fields.', 'error'); return; }
  document.getElementById('email-send-success').classList.remove('hidden');
  showToast('Email sent to ' + to);
  setTimeout(closeEmailModal, 2200);
}

// ═══════════════════════════════════════════════════════
//  AUTO PAGE INIT — runs on every page automatically
// ═══════════════════════════════════════════════════════
(function() {
  // load any saved data before page-specific logic
  loadDBfromStorage();
  // initialize theme immediately (will run again after DOM ready)
  initTheme();
  const pageMeta = {"index.html": {"nav": "home", "init": ""}, "about.html": {"nav": "about", "init": ""}, "products.html": {"nav": "products", "init": "setProductTab('capsule');"}, "contact.html": {"nav": "contact", "init": ""}, "quote.html": {"nav": "quote", "init": ""}, "career.html": {"nav": "career", "init": "switchCareerTab('login');"}, "admin.html": {"nav": "admin", "init": ""}, "candidate_overview.html": {"nav": "career", "init": ""}, "candidate_personal.html": {"nav": "career", "init": ""}, "candidate_education.html": {"nav": "career", "init": ""}, "candidate_resume.html": {"nav": "career", "init": ""}, "candidate_applications.html": {"nav": "career", "init": ""}, "candidate_notifications.html": {"nav": "career", "init": ""}, "admin_overview.html": {
    nav: "admin",
    init: "if (typeof renderAdminOverviewCandidates !== 'undefined') { renderAdminOverviewCandidates(); } if (typeof updateAdminStats !== 'undefined') { updateAdminStats(); }"
  },

  "admin_candidates.html": {
    nav: "admin",
    init: "if (typeof renderCandidates !== 'undefined') { renderCandidates(); }"
  }, "admin_quotes.html": {"nav": "admin", "init": ""}, "admin_messages.html": {"nav": "admin", "init": ""}, "admin_analytics.html": {"nav": "admin", "init": ""}, "admin_settings.html": {"nav": "admin", "init": ""}};
  
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const meta = pageMeta[currentFile] || { nav: '', init: '' };

  document.addEventListener('DOMContentLoaded', function() {
    // Theme
    initTheme();

    // Active nav link
    if (meta.nav) {
      document.querySelectorAll('.nav-links a').forEach(function(a) {
        if (a.dataset.page === meta.nav) a.classList.add('active');
      });
    }

    // Page-specific init
    if (meta.init) {
      try { eval(meta.init); } catch(e) { console.warn('Page init error:', e); }
    }
    // restore any queued product tab selection
    if (currentFile === 'products.html') {
      try {
        const t = localStorage.getItem('xyz-prod-tab');
        if (t) {
          setProductTab(t);
          localStorage.removeItem('xyz-prod-tab');
        }
      } catch(e) {}
    }
    // set correct sidebar highlight for candidate subpages
    if (currentFile.startsWith('candidate_')) {
      const panel = currentFile.split('_')[1].split('.')[0];
      document.querySelectorAll('.sidebar-nav-item').forEach(el => el.classList.remove('active'));
      const navEl = document.getElementById('cand-nav-' + panel);
      if (navEl) navEl.classList.add('active');
    }
    // set sidebar highlight for admin subpages
    if (currentFile.startsWith('admin_')) {
      const panel = currentFile.split('_')[1].split('.')[0];
      document.querySelectorAll('.sidebar-nav-item').forEach(el => el.classList.remove('active'));
      const navEl = document.getElementById('admin-nav-' + panel);
      if (navEl) navEl.classList.add('active');
    }

    // restore admin session without re-triggering login
if (DB.adminLoggedIn) {

  const loginPanel = document.getElementById('admin-login-panel');
  const dashboard = document.getElementById('admin-dashboard');

  if (loginPanel) loginPanel.classList.add('hidden');
  if (dashboard) dashboard.classList.remove('hidden');

}
  });
})();
