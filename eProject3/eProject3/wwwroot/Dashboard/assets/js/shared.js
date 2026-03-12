/* ═══════════════════════════════════════════════════════
   XYZ Pharmaceuticals — Shared Data Store & Utilities
   All pages include this file.
   ═══════════════════════════════════════════════════════ */

// ── SHARED DATA (persisted in sessionStorage so edits carry across pages) ──

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



// ── CLOSE NOTIF ON OUTSIDE CLICK ──
document.addEventListener('click', e => {
  const nd = document.getElementById('notif-dropdown');
  if (nd && !e.target.closest('[onclick="toggleNotif()"]') && !e.target.closest('#notif-dropdown'))
    nd.classList.remove('open');
});
