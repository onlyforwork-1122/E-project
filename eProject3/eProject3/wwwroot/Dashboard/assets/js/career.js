
    let statusFilter = 'all';
    let searchQ      = '';

    function filterStatus(s, el) {
        statusFilter = s;
      document.querySelectorAll('.cat-tab').forEach(t=>t.classList.remove('active'));
    el.classList.add('active');
    renderCareers();
    }

    function searchApplicants(v) {searchQ = v.toLowerCase(); renderCareers(); }

    function updateCounts() {
        document.getElementById('cnt-all').textContent = `(${careers.length})`;
    document.getElementById('cnt-pending').textContent  = `(${careers.filter(c => c.status === 'pending').length})`;
    document.getElementById('cnt-interview').textContent= `(${careers.filter(c => c.status === 'interview').length})`;
    document.getElementById('cnt-rejected').textContent = `(${careers.filter(c => c.status === 'rejected').length})`;
    updateNavBadges();
    }

    function renderCareers() {
        let list = statusFilter === 'all' ? [...careers] : careers.filter(c=>c.status===statusFilter);
      if (searchQ) list = list.filter(c => JSON.stringify(c).toLowerCase().includes(searchQ));

    const tbody = document.getElementById('careers-tbody');
    if (!list.length) {
        tbody.innerHTML = '<tr><td colspan="8"><div class="empty-state"><i class="bi bi-people"></i><p>No applicants found.</p></div></td></tr>';
    return;
      }

      tbody.innerHTML = list.map((c,i) => `
    <tr>
        <td><span style="font-family:'DM Mono',monospace;font-size:12px;color:var(--text-muted);">${String(i + 1).padStart(2, '0')}</span></td>
        <td>
            <div style="display:flex;align-items:center;gap:10px;">
                <div class="applicant-avatar">${initials(c.name)}</div>
                <div>
                    <div style="font-weight:600;font-size:13.5px;">${c.name}</div>
                    <div style="font-size:12px;color:var(--text-muted);">${c.email}</div>
                </div>
            </div>
        </td>
        <td style="font-size:13px;max-width:180px;">${c.position}</td>
        <td style="font-size:13px;">${c.education}</td>
        <td style="font-size:13px;">${c.university}</td>
        <td style="font-size:12.5px;color:var(--text-muted);">${c.applied}</td>
        <td>
            <select class="status-select" style="${STATUS_COLORS[c.status]}" onchange="changeStatus(${c.id},this.value)">
                <option value="pending" ${c.status === 'pending' ? 'selected' : ''}>⏳ Pending</option>
                <option value="interview" ${c.status === 'interview' ? 'selected' : ''}>📅 Interview</option>
                <option value="rejected" ${c.status === 'rejected' ? 'selected' : ''}>✗ Rejected</option>
            </select>
        </td>
        <td>
            <div class="actions">
                <button class="btn-sm-icon btn-view" onclick="viewApplicant(${c.id})" title="View"><i class="bi bi-eye-fill"></i></button>
                ${c.resume ? `<button class="btn-sm-icon btn-dl" onclick="showToast('Downloading resume for ${c.name}','bi-download')" title="Resume"><i class="bi bi-download"></i></button>` : ''}
                <button class="btn-sm-icon btn-email" onclick="openEmailModal('${c.email}','${c.name}')" title="Email"><i class="bi bi-envelope-fill"></i></button>
                <button class="btn-sm-icon btn-delete" onclick="deleteApplicant(${c.id})" title="Delete"><i class="bi bi-trash-fill"></i></button>
            </div>
        </td>
    </tr>`).join('');
    }

    function initials(name) { return name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase(); }

    function changeStatus(id, val) {
      const c = careers.find(x=>x.id===id);
    if (c) {c.status = val; persist(); renderCareers(); updateCounts(); showToast(`Status updated to ${val}`,'bi-check-circle-fill'); }
    }

    function viewApplicant(id) {
      const c = careers.find(x=>x.id===id);
    document.getElementById('applicant-detail-body').innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border);">
        <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px;font-weight:700;">${initials(c.name)}</div>
        <div>
            <div style="font-size:18px;font-weight:800;">${c.name}</div>
            <div style="color:var(--text-muted);font-size:13px;margin-top:2px;">${c.position}</div>
            <span class="badge-pill mt-2" style="${STATUS_COLORS[c.status]}">${STATUS_LABELS[c.status]}</span>
        </div>
    </div>
    <div class="mb-4">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid var(--border);">Personal Information</div>
        <div class="detail-grid">
            <div class="detail-item"><label>Full Name</label><p>${c.name}</p></div>
            <div class="detail-item"><label>Email</label><p>${c.email}</p></div>
            <div class="detail-item"><label>Phone</label><p>${c.phone}</p></div>
            <div class="detail-item"><label>Applied On</label><p>${c.applied}</p></div>
            <div class="detail-item" style="grid-column:1/-1;"><label>Position Applied</label><p>${c.position}</p></div>
        </div>
    </div>
    <div class="mb-4">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid var(--border);">Education Details</div>
        <div class="detail-grid">
            <div class="detail-item"><label>Degree</label><p>${c.education}</p></div>
            <div class="detail-item"><label>University / Institute</label><p>${c.university}</p></div>
            <div class="detail-item"><label>Graduation Year</label><p>${c.graduation}</p></div>
            <div class="detail-item"><label>CGPA / GPA</label><p>${c.gpa} / 4.0</p></div>
        </div>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;padding-top:12px;border-top:1px solid var(--border);">
        ${c.resume ? `<button class="btn-primary-custom" style="background:var(--warning);" onclick="showToast('Downloading resume for ${c.name}','bi-download')"><i class="bi bi-download"></i> Download Resume</button>` : ''}
        <button class="btn-primary-custom" onclick="closeModal('modal-applicant');openEmailModal('${c.email}','${c.name}')"><i class="bi bi-envelope-fill"></i> Send Interview Email</button>
    </div>`;
    openModal('modal-applicant');
    }

    function deleteApplicant(id) {
      const c = careers.find(x=>x.id===id);
    confirmDelete(`Delete applicant "${c.name}"? This cannot be undone.`, () => {
        careers = careers.filter(x => x.id !== id);
    persist();
    renderCareers();
    updateCounts();
    showToast('Applicant deleted','bi-trash-fill');
      });
    }

    function exportAll() {
      const rows = [['Name','Email','Phone','Position','Education','University','GPA','Applied','Status']];
      careers.forEach(c => rows.push([c.name,c.email,c.phone,c.position,c.education,c.university,c.gpa,c.applied,c.status]));
      const csv = rows.map(r=>r.map(v=>`"${v}"`).join(',')).join('\n');
    const a   = document.createElement('a');
    a.href    = 'data:text/csv,' + encodeURIComponent(csv);
    a.download= 'applicants.csv';
    a.click();
    showToast('CSV exported!','bi-download');
    }

    initModals();
    updateCounts();
    renderCareers();