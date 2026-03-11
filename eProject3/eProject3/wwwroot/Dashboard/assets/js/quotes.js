
    let currentView = 'card';
    let searchQ = '';

    function setView(v) {
        currentView = v;
    document.getElementById('quotes-cards').style.display      = v === 'card'  ? 'block' : 'none';
    document.getElementById('quotes-table-wrap').style.display = v === 'table' ? 'block' : 'none';
    document.getElementById('toggle-card').style.background    = v === 'card'  ? 'var(--accent-light)' : 'var(--body-bg)';
    document.getElementById('toggle-card').style.color         = v === 'card'  ? 'var(--accent)' : 'var(--text-muted)';
    document.getElementById('toggle-table').style.background   = v === 'table' ? 'var(--accent-light)' : 'var(--body-bg)';
    document.getElementById('toggle-table').style.color        = v === 'table' ? 'var(--accent)' : 'var(--text-muted)';
    renderQuotes();
    }

    function searchQuotes(v) {searchQ = v.toLowerCase(); renderQuotes(); }

    function getFiltered() {
      if (!searchQ) return [...quotes];
      return quotes.filter(q => JSON.stringify(q).toLowerCase().includes(searchQ));
    }

    function renderQuotes() {
      const list = getFiltered();
    document.getElementById('quotes-count').textContent = `${list.length} record${list.length !== 1 ? 's' : ''}`;
    updateNavBadges();

    if (currentView === 'card') {
        if (!list.length) {
        document.getElementById('quotes-cards').innerHTML = '<div class="empty-state"><i class="bi bi-chat-quote"></i><p>No feedback found.</p></div>';
    return;
        }
        document.getElementById('quotes-cards').innerHTML = list.map(q => `
    <div class="feedback-card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:46px;height:46px;border-radius:50%;background:var(--primary-pale);display:flex;align-items:center;justify-content:center;color:var(--primary);font-size:15px;font-weight:700;flex-shrink:0;">${q.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                <div>
                    <div style="font-size:15px;font-weight:700;">${q.fullName}</div>
                    <div style="font-size:12.5px;color:var(--text-muted);margin-top:2px;"><i class="bi bi-building me-1"></i>${q.company} &nbsp;·&nbsp; <i class="bi bi-geo-alt me-1"></i>${q.city}, ${q.country}</div>
                </div>
            </div>
            <div style="display:flex;gap:6px;">
                <button class="btn-sm-icon btn-view" onclick="viewFeedback(${q.id})" title="View Details"><i class="bi bi-eye-fill"></i></button>
                <button class="btn-sm-icon btn-delete" onclick="deleteFeedback(${q.id})" title="Delete"><i class="bi bi-trash-fill"></i></button>
            </div>
        </div>
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid #f0f4f9;">
            <div class="quote-icon"><i class="bi bi-quote"></i></div>
            <p style="font-size:13.5px;color:var(--text-main);line-height:1.65;margin-top:4px;">${q.comments.length > 200 ? q.comments.slice(0, 200) + '…' : q.comments}</p>
        </div>
        <div style="margin-top:12px;display:flex;gap:20px;flex-wrap:wrap;padding-top:10px;border-top:1px solid #f0f4f9;">
            <span style="font-size:12px;color:var(--text-muted);"><i class="bi bi-envelope me-1"></i>${q.email}</span>
            <span style="font-size:12px;color:var(--text-muted);"><i class="bi bi-telephone me-1"></i>${q.phone}</span>
            <span style="font-size:12px;color:var(--text-muted);"><i class="bi bi-pin-map me-1"></i>${q.address}, ${q.postal}, ${q.state}</span>
        </div>
    </div>`).join('');
      } else {
        if (!list.length) {
        document.getElementById('quotes-tbody').innerHTML = '<tr><td colspan="7"><div class="empty-state"><i class="bi bi-chat-quote"></i><p>No feedback found.</p></div></td></tr>';
    return;
        }
        document.getElementById('quotes-tbody').innerHTML = list.map((q,i) => `
    <tr>
        <td><span style="font-family:'DM Mono',monospace;font-size:12px;color:var(--text-muted);">${String(i + 1).padStart(2, '0')}</span></td>
        <td><strong>${q.fullName}</strong></td>
        <td>${q.company}</td>
        <td><span class="badge-pill" style="background:var(--primary-pale);color:var(--primary);">${q.country}</span></td>
        <td style="font-size:12.5px;">${q.email}</td>
        <td style="font-size:12.5px;">${q.phone}</td>
        <td><div class="actions">
            <button class="btn-sm-icon btn-view" onclick="viewFeedback(${q.id})" title="View"><i class="bi bi-eye-fill"></i></button>
            <button class="btn-sm-icon btn-delete" onclick="deleteFeedback(${q.id})" title="Delete"><i class="bi bi-trash-fill"></i></button>
        </div></td>
    </tr>`).join('');
      }
    }

    function viewFeedback(id) {
      const q = quotes.find(x=>x.id===id);
    document.getElementById('feedback-detail-body').innerHTML = `
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-bottom:18px;border-bottom:1px solid var(--border);">
        <div style="width:56px;height:56px;border-radius:50%;background:var(--primary-pale);display:flex;align-items:center;justify-content:center;color:var(--primary);font-size:18px;font-weight:700;">${q.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
        <div>
            <div style="font-size:17px;font-weight:800;">${q.fullName}</div>
            <div style="font-size:13px;color:var(--text-muted);">${q.company}</div>
        </div>
    </div>
    <div class="mb-4">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px;">Contact Information</div>
        <div class="detail-grid">
            <div class="detail-item"><label>Email</label><p>${q.email}</p></div>
            <div class="detail-item"><label>Phone</label><p>${q.phone}</p></div>
        </div>
    </div>
    <div class="mb-4">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px;">Address Details</div>
        <div class="detail-grid">
            <div class="detail-item"><label>Street Address</label><p>${q.address}</p></div>
            <div class="detail-item"><label>City</label><p>${q.city}</p></div>
            <div class="detail-item"><label>State / Province</label><p>${q.state}</p></div>
            <div class="detail-item"><label>Postal Code</label><p>${q.postal}</p></div>
            <div class="detail-item"><label>Country</label><p>${q.country}</p></div>
        </div>
    </div>
    <div>
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:10px;">Comments / Message</div>
        <div style="background:var(--body-bg);border:1px solid var(--border);border-radius:8px;padding:16px;font-size:13.5px;line-height:1.75;color:var(--text-main);">${q.comments}</div>
    </div>`;
    openModal('modal-feedback');
    }

    function deleteFeedback(id) {
      const q = quotes.find(x=>x.id===id);
    confirmDelete(`Delete feedback from "${q.fullName}"? This cannot be undone.`, () => {
        quotes = quotes.filter(x => x.id !== id);
    persist();
    renderQuotes();
    showToast('Feedback deleted','bi-trash-fill');
      });
    }

    function exportQuotes() {
      const rows = [['Full Name','Company','Address','City','State','Postal','Country','Email','Phone','Comments']];
      quotes.forEach(q => rows.push([q.fullName,q.company,q.address,q.city,q.state,q.postal,q.country,q.email,q.phone,q.comments.replace(/"/g,"'")]));
      const csv = rows.map(r=>r.map(v=>`"${v}"`).join(',')).join('\n');
    const a   = document.createElement('a');
    a.href    = 'data:text/csv,' + encodeURIComponent(csv);
    a.download= 'quotes-feedback.csv';
    a.click();
    showToast('CSV exported!','bi-download');
    }

    initModals();
    setView('card');
