/* =====================================================
   XYZ Pharmaceuticals — Candidate Portal
   app.js  |  Shared across all pages
   ===================================================== */

/* ── Theme ── */
(function () {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon();
}

function updateThemeIcon() {
    const theme = document.documentElement.getAttribute('data-theme');
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.innerHTML = theme === 'dark'
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="5"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

document.addEventListener('DOMContentLoaded', function () {
    updateThemeIcon();

    /* Highlight active nav item based on current page */
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(el => {
        const href = el.getAttribute('href') || '';
        if (href && href.includes(page)) el.classList.add('active');
    });

    /* Animate progress bars */
    document.querySelectorAll('.progress-fill[data-pct]').forEach(el => {
        setTimeout(() => {
            el.style.width = el.getAttribute('data-pct') + '%';
        }, 400);
    });

    /* Close modals on overlay click */
    document.querySelectorAll('.modal-overlay').forEach(ov => {
        ov.addEventListener('click', function (e) {
            if (e.target === this) closeModal(this.id);
        });
    });

    /* Escape key closes modal */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.open').forEach(m => {
                m.classList.remove('open');
            });
        }
    });
});

/* ── Toast ── */
let toastTimer;
function showToast(msg, type = 'success') {
    let t = document.getElementById('toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'toast';
        t.className = 'toast';
        t.innerHTML = `<div class="toast-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg>
    </div><span id="toast-msg"></span>`;
        document.body.appendChild(t);
    }
    t.className = 'toast ' + type;
    t.querySelector('#toast-msg').textContent = msg;
    if (type === 'error') {
        t.querySelector('.toast-icon').innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    } else {
        t.querySelector('.toast-icon').innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg>`;
    }
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── Modal helpers ── */
function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('open');
}
function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('open');
}

/* ── File upload helpers ── */
function setupUpload(inputId, zoneId, outputId, onFile) {
    const input = document.getElementById(inputId);
    const zone = document.getElementById(zoneId);
    if (!input || !zone) return;

    zone.addEventListener('click', () => input.click());
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const f = e.dataTransfer.files[0];
        if (f && onFile) onFile(f);
    });
    input.addEventListener('change', function () {
        if (this.files[0] && onFile) onFile(this.files[0]);
    });
}

function renderFileChip(file, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const ext = file.name.split('.').pop().toLowerCase();
    const typeClass = ext === 'pdf' ? 'pdf' : 'doc';
    const size = file.size < 1024 * 1024
        ? Math.round(file.size / 1024) + ' KB'
        : (file.size / (1024 * 1024)).toFixed(1) + ' MB';

    el.innerHTML = `
    <div class="file-chip">
      <div class="file-type-badge ${typeClass}">
        <span class="file-type-text">${ext.toUpperCase()}</span>
      </div>
      <div>
        <div class="file-name">${file.name}</div>
        <div class="file-meta">${size} &nbsp;·&nbsp; Just uploaded</div>
      </div>
      <div class="file-actions">
        <button class="btn btn-ghost btn-sm btn-icon" title="Remove" onclick="this.closest('.file-chip').parentElement.innerHTML=''">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="15" height="15" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>`;
}

/* ── Sidebar navigation builder (reusable) ── */
const NAV_ITEMS = [
    { label: 'Dashboard', icon: 'grid', href: 'index.html', section: 'Main' },
    { label: 'Personal Details', icon: 'user', href: 'personal.html', section: 'My Profile' },
    { label: 'Education', icon: 'book-open', href: 'education.html', section: 'My Profile' },
    { label: 'Resume', icon: 'file-text', href: 'resume.html', section: 'My Profile' },
];

const ICONS = {
    grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
    'book-open': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>`,
    'file-text': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>`,
};
