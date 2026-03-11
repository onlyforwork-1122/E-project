/* ═══════════════════════════════════════════════════════
   XYZ Pharmaceuticals — Shared Data Store & Utilities
   All pages include this file.
   ═══════════════════════════════════════════════════════ */

// ── SHARED DATA (persisted in sessionStorage so edits carry across pages) ──
function loadData(key, fallback) {
  try {
    const raw = sessionStorage.getItem('xyz_' + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch(e) { return fallback; }
}
function saveData(key, val) {
  try { sessionStorage.setItem('xyz_' + key, JSON.stringify(val)); } catch(e){}
}

const DEFAULT_PRODUCTS = [
  { id:1, category:'capsule', name:'AutoCap 500', output:'50,000 caps/hr', size:'00', dimension:'2200×800×1600 mm', weight:450 },
  { id:2, category:'capsule', name:'MegaCap Pro', output:'80,000 caps/hr', size:'0', dimension:'2400×900×1700 mm', weight:580 },
  { id:3, category:'tablet', model:'TBL-320', dies:32, maxPressure:'80 kN', maxDia:25, maxDepth:18, capacity:'200,000 tabs/hr', size:'1200×700×1300 mm', weight:980 },
  { id:4, category:'tablet', model:'TBL-540', dies:54, maxPressure:'100 kN', maxDia:30, maxDepth:22, capacity:'350,000 tabs/hr', size:'1500×800×1400 mm', weight:1200 },
  { id:5, category:'liquid', modelName:'LiqFill-X1', airPressure:'0.6 MPa', airVolume:'0.5 m³/min', speed:60, fillRange:'5–500 ml' },
  { id:6, category:'liquid', modelName:'LiqFill-Pro', airPressure:'0.8 MPa', airVolume:'0.8 m³/min', speed:120, fillRange:'10–1000 ml' },
];
const DEFAULT_CAREERS = [
  { id:1, name:'Sarah Mitchell', email:'sarah.m@email.com', phone:'+1-555-0101', position:'Quality Assurance Specialist', education:'B.Sc. Chemistry', university:'MIT', graduation:'2021', gpa:'3.8', applied:'2025-11-01', status:'pending', resume:true },
  { id:2, name:'James Wilson',   email:'james.w@email.com', phone:'+1-555-0202', position:'Pharmaceutical Researcher',    education:'M.Sc. Pharmacology', university:'Stanford', graduation:'2022', gpa:'3.9', applied:'2025-11-05', status:'interview', resume:true },
  { id:3, name:'Priya Sharma',   email:'priya.s@email.com', phone:'+1-555-0303', position:'Production Supervisor',        education:'B.Tech Chemical Eng.', university:'IIT Delhi', graduation:'2020', gpa:'3.7', applied:'2025-11-08', status:'rejected', resume:true },
  { id:4, name:'Carlos Rivera',  email:'carlos.r@email.com',phone:'+1-555-0404', position:'Lab Technician',               education:'B.Sc. Biology', university:'UCLA', graduation:'2023', gpa:'3.5', applied:'2025-11-10', status:'pending', resume:true },
];
const DEFAULT_QUOTES = [
  { id:1, fullName:'Dr. Robert Kim',     company:'MedCorp Ltd.',        address:'450 Park Ave',        city:'New York', state:'NY',    postal:'10022', country:'USA',     email:'r.kim@medcorp.com',       phone:'+1-212-555-0111', comments:'We are interested in bulk order of capsule filling machines for our new production facility. Please provide pricing details and delivery timeline.' },
  { id:2, fullName:'Ms. Elena Fischer',  company:'EuroPharma GmbH',     address:'Berliner Str. 99',    city:'Berlin',   state:'Berlin',postal:'10115', country:'Germany', email:'e.fischer@europharma.de', phone:'+49-30-555-0222', comments:'Excellent product quality. Very satisfied with the LiqFill-X1 machine performance. Looking forward to future collaboration.' },
  { id:3, fullName:'Mr. Ahmed Al-Rashid',company:'Gulf Medical Supplies',address:'Al Barsha District', city:'Dubai',    state:'Dubai', postal:'00000', country:'UAE',     email:'a.rashid@gulfmed.ae',     phone:'+971-4-555-0333', comments:'Need quotation for 3 units of TBL-540 tablet press with installation service included.' },
];
const DEFAULT_MESSAGES = [
  { id:1, name:'Lisa Chen',      email:'lisa.c@techhealth.com',  phone:'+1-415-555-0155', subject:'Partnership Inquiry',      message:'Hi, we are a healthcare startup looking to partner with established pharmaceutical equipment manufacturers. We would love to explore opportunities.', date:'2025-11-12', unread:true },
  { id:2, name:'Michael Torres', email:'m.torres@pharmalab.com', phone:'+1-310-555-0266', subject:'Spare Parts Availability', message:'We currently operate two AutoCap 500 units and need to know about availability of spare parts and annual maintenance contracts.',                          date:'2025-11-10', unread:true },
  { id:3, name:'Dr. Fatima Noor',email:'f.noor@hospital.pk',     phone:'+92-51-555-0377', subject:'Product Demo Request',     message:'We are planning to upgrade our liquid filling line. Could you arrange a product demonstration at your facility?',                                     date:'2025-11-08', unread:false },
];

let products  = loadData('products',  DEFAULT_PRODUCTS);
let careers   = loadData('careers',   DEFAULT_CAREERS);
let quotes    = loadData('quotes',    DEFAULT_QUOTES);
let messages  = loadData('messages',  DEFAULT_MESSAGES);
let nextProductId = loadData('nextProductId', 7);

function persist() {
  saveData('products', products);
  saveData('careers',  careers);
  saveData('quotes',   quotes);
  saveData('messages', messages);
  saveData('nextProductId', nextProductId);
}

// ── TOAST ──
let _toastTimer;
function showToast(msg, icon = 'bi-check-circle-fill') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.querySelector('i').className = 'bi ' + icon;
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

// ── MODALS ──
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });
}

// ── CONFIRM DELETE ──
function confirmDelete(msg, cb) {
  document.getElementById('confirm-text').textContent = msg;
  document.getElementById('confirm-ok-btn').onclick = () => { cb(); closeModal('modal-confirm'); };
  openModal('modal-confirm');
}

// ── SIDEBAR MOBILE ──
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
}

// ── NOTIFICATION DROPDOWN ──
function toggleNotif() { document.getElementById('notif-dropdown').classList.toggle('open'); }
function closeNotif()  { document.getElementById('notif-dropdown').classList.remove('open'); }

// ── EMAIL MODAL ──
function openEmailModal(email, name) {
  document.getElementById('email-to').value      = email;
  document.getElementById('email-subject').value = 'Interview Invitation — XYZ Pharmaceuticals';
  document.getElementById('email-body').value    =
    `Dear ${name},\n\nWe are pleased to invite you for an interview at XYZ Pharmaceuticals.\n\nPlease reply with your availability so we can schedule a convenient time.\n\nWarm regards,\nHR Department\nXYZ Pharmaceuticals`;
  openModal('modal-email');
}
function sendEmail() {
  const to = document.getElementById('email-to').value.trim();
  if (!to) { showToast('Please enter a recipient email', 'bi-exclamation-circle-fill'); return; }
  closeModal('modal-email');
  showToast('Email sent to ' + to, 'bi-send-fill');
}

// ── NAV BADGE COUNTS ──
function updateNavBadges() {
  const sel = id => document.getElementById(id);
  if (sel('nav-products-count'))  sel('nav-products-count').textContent  = products.length;
  if (sel('nav-careers-count'))   sel('nav-careers-count').textContent   = careers.length;
  if (sel('nav-quotes-count'))    sel('nav-quotes-count').textContent    = quotes.length;
  if (sel('nav-messages-count'))  sel('nav-messages-count').textContent  = messages.filter(m=>m.unread).length;
}

// ── STATUS HELPERS ──
const STATUS_COLORS  = { pending:'background:#fff3e0;color:#c77700;', interview:'background:var(--primary-pale);color:var(--primary);', rejected:'background:var(--danger-light);color:var(--danger);' };
const STATUS_LABELS  = { pending:'⏳ Pending', interview:'📅 Interview', rejected:'✗ Rejected' };

// ── FIELD GETTER ──
function g(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }

// ── CLOSE NOTIF ON OUTSIDE CLICK ──
document.addEventListener('click', e => {
  const nd = document.getElementById('notif-dropdown');
  if (nd && !e.target.closest('[onclick="toggleNotif()"]') && !e.target.closest('#notif-dropdown'))
    nd.classList.remove('open');
});
