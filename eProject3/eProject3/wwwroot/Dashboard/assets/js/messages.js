
    let msgFilter    = 'all';
    let searchQ      = '';
    let activeId     = null;

    function filterMessages(f, el) {
        msgFilter = f;
      document.querySelectorAll('.cat-tab').forEach(t=>t.classList.remove('active'));
    el.classList.add('active');
    activeId = null;
    renderInbox();
    showPlaceholder();
    }

    function searchMessages(v) {searchQ = v.toLowerCase(); renderInbox(); }

    function updateCounts() {
      const unread = messages.filter(m=>m.unread).length;
    document.getElementById('cnt-all').textContent    = `(${messages.length})`;
    document.getElementById('cnt-unread').textContent = `(${unread})`;
    document.getElementById('cnt-read').textContent   = `(${messages.filter(m => !m.unread).length})`;
      document.getElementById('unread-label').textContent = unread > 0 ? `${unread} unread message${unread > 1 ? 's' : ''}` : 'All messages read';
    updateNavBadges();
    }

    function getFiltered() {
        let list = [...messages];
      if (msgFilter === 'unread') list = list.filter(m=>m.unread);
      if (msgFilter === 'read')   list = list.filter(m=>!m.unread);
      if (searchQ) list = list.filter(m => JSON.stringify(m).toLowerCase().includes(searchQ));
    return list;
    }

    function renderInbox() {
      const list = getFiltered();
    const el   = document.getElementById('inbox-list');
    if (!list.length) {
        el.innerHTML = '<div class="empty-state"><i class="bi bi-inbox"></i><p>No messages found.</p></div>';
    return;
      }
      el.innerHTML = list.map(m => `
    <div class="inbox-item ${m.unread?'unread':''} ${activeId===m.id?'active':''}" onclick="openMessage(${m.id})">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <div style="display:flex;align-items:center;gap:8px;">
                ${m.unread ? '<div class="unread-dot"></div>' : '<div style="width:8px;"></div>'}
                <span class="msg-sender">${m.name}</span>
            </div>
            <span class="msg-date">${m.date}</span>
        </div>
        <div class="msg-subject">${m.subject}</div>
        <div class="msg-preview">${m.message}</div>
    </div>`).join('');
    updateCounts();
    }

    function showPlaceholder() {
        document.getElementById('inbox-detail').innerHTML = `
        <div class="detail-placeholder">
          <i class="bi bi-envelope-open"></i>
          <p style="font-size:14px;font-weight:500;">Select a message to read</p>
          <p style="font-size:12.5px;margin-top:4px;">Click any message on the left to view its full content.</p>
        </div>`;
    }

    function openMessage(id) {
        activeId = id;
      const m = messages.find(x=>x.id===id);
    m.unread = false;
    persist();
    renderInbox();
    updateCounts();

    document.getElementById('inbox-detail').innerHTML = `
    <div style="margin-bottom:20px;padding-bottom:18px;border-bottom:1px solid var(--border);">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;">
            <div>
                <h3 style="font-size:17px;font-weight:800;margin-bottom:6px;">${m.subject}</h3>
                <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                    <div style="width:36px;height:36px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700;">${m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                    <div>
                        <div style="font-size:13.5px;font-weight:600;">${m.name}</div>
                        <div style="font-size:12px;color:var(--text-muted);">${m.email}</div>
                    </div>
                </div>
            </div>
            <div style="display:flex;gap:6px;align-items:center;">
                <span style="font-size:12px;color:var(--text-muted);">${m.date}</span>
                <button class="btn-sm-icon btn-delete" onclick="deleteMessage(${m.id})" title="Delete"><i class="bi bi-trash-fill"></i></button>
            </div>
        </div>
    </div>
    <div class="detail-grid mb-4" style="max-width:400px;">
        <div class="detail-item"><label>Phone</label><p>${m.phone}</p></div>
        <div class="detail-item"><label>Date</label><p>${m.date}</p></div>
    </div>
    <div style="margin-bottom:20px;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:10px;">Message</div>
        <div style="background:var(--body-bg);border:1px solid var(--border);border-radius:10px;padding:18px;font-size:14px;line-height:1.8;color:var(--text-main);">${m.message}</div>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn-primary-custom" onclick="replyTo(${m.id})"><i class="bi bi-reply-fill"></i> Reply</button>
        <button class="btn-primary-custom" style="background:var(--danger);" onclick="deleteMessage(${m.id})"><i class="bi bi-trash-fill"></i> Delete</button>
    </div>`;
    }

    function replyTo(id) {
      const m = messages.find(x=>x.id===id);
    document.getElementById('email-to').value      = m.email;
    document.getElementById('email-subject').value = 'Re: ' + m.subject;
    document.getElementById('email-body').value    = `Dear ${m.name},\n\nThank you for reaching out to XYZ Pharmaceuticals.\n\n[Your reply here]\n\nBest regards,\nXYZ Pharmaceuticals Team`;
    openModal('modal-email');
    }

    function deleteMessage(id) {
      const m = messages.find(x=>x.id===id);
    confirmDelete(`Delete message from "${m.name}"? This cannot be undone.`, () => {
        messages = messages.filter(x => x.id !== id);
    persist();
    if (activeId === id) {activeId = null; showPlaceholder(); }
    renderInbox();
    updateCounts();
    showToast('Message deleted','bi-trash-fill');
      });
    }

    function markAllRead() {
        messages.forEach(m => m.unread = false);
    persist();
    renderInbox();
    updateCounts();
    showToast('All messages marked as read','bi-check2-all');
    }

    initModals();
    renderInbox();