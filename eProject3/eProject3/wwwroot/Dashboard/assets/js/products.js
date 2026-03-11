
    let currentFilter   = 'all';
    let editingId       = null;
    let searchQuery     = '';

    function updateChips() {
        document.getElementById('chip-all').textContent = products.length;
      document.getElementById('chip-capsule').textContent = products.filter(p=>p.category==='capsule').length;
      document.getElementById('chip-tablet').textContent  = products.filter(p=>p.category==='tablet').length;
      document.getElementById('chip-liquid').textContent  = products.filter(p=>p.category==='liquid').length;
    updateNavBadges();
    }

    function filterProducts(cat, el) {
        currentFilter = cat;
      document.querySelectorAll('.cat-tab').forEach(t=>t.classList.remove('active'));
    el.classList.add('active');
    renderProducts();
    }

    function searchProducts(val) {searchQuery = val.toLowerCase(); renderProducts(); }

    function renderProducts() {
        let list = currentFilter === 'all' ? [...products] : products.filter(p=>p.category===currentFilter);
    if (searchQuery) {
        list = list.filter(p => {
            const str = JSON.stringify(p).toLowerCase();
            return str.includes(searchQuery);
        });
      }

    const thead = document.getElementById('products-thead');
    const tbody = document.getElementById('products-tbody');

    if (!list.length) {
        thead.innerHTML = '';
    tbody.innerHTML = '<tr><td colspan="10"><div class="empty-state"><i class="bi bi-box-seam"></i><p>No products found.</p></div></td></tr>';
    return;
      }

    const cat = currentFilter;
    let cols, rows;

    if (cat === 'capsule') {
        cols = ['#', 'Product Name', 'Output', 'Cap Size (mm)', 'Machine Dimension', 'Weight (kg)', 'Actions'];
        rows = list.map((p,i) => row(i, [
    mono(i+1), `<strong>${p.name || '—'}</strong>`, p.output||'—', p.size||'—', p.dimension||'—', p.weight||'—'
    ], p.id));
      } else if (cat === 'tablet') {
        cols = ['#', 'Model', 'Dies', 'Max Pressure', 'Max Dia (mm)', 'Max Depth (mm)', 'Capacity', 'Weight (kg)', 'Actions'];
        rows = list.map((p,i) => row(i, [
    mono(i+1), `<strong>${p.model || '—'}</strong>`, p.dies||'—', p.maxPressure||'—', p.maxDia||'—', p.maxDepth||'—', p.capacity||'—', p.weight||'—'
    ], p.id));
      } else if (cat === 'liquid') {
        cols = ['#', 'Model Name', 'Air Pressure', 'Air Volume', 'Speed (bpm)', 'Fill Range (ml)', 'Actions'];
        rows = list.map((p,i) => row(i, [
    mono(i+1), `<strong>${p.modelName || '—'}</strong>`, p.airPressure||'—', p.airVolume||'—', p.speed||'—', p.fillRange||'—'
    ], p.id));
      } else {
        cols = ['#', 'Category', 'Name / Model', 'Key Spec', 'Weight (kg)', 'Actions'];
        rows = list.map((p,i) => {
          const badge = {capsule:`<span class="badge-pill" style="background:var(--primary-pale);color:var(--primary);">Capsule</span>`, tablet:`<span class="badge-pill" style="background:var(--purple-light);color:var(--purple);">Tablet</span>`, liquid:`<span class="badge-pill" style="background:var(--accent-light);color:var(--accent);">Liquid</span>` }[p.category];
    const name  = p.name || p.model || p.modelName || '—';
    const spec  = p.output || p.capacity || (p.speed ? p.speed+' bpm' : '—') || '—';
    return row(i, [mono(i+1), badge, `<strong>${name}</strong>`, spec, p.weight||'—'], p.id);
        });
      }

      thead.innerHTML = cols.map(c=>`<th>${c}</th>`).join('');
    tbody.innerHTML = rows.join('');
    }

    function mono(n) { return `<span style="font-family:'DM Mono',monospace;font-size:12px;color:var(--text-muted);">${String(n).padStart(2, '0')}</span>`; }

    function row(i, cells, id) {
      return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}<td><div class="actions">
        <button class="btn-sm-icon btn-edit" onclick="editProduct(${id})" title="Edit"><i class="bi bi-pencil-fill"></i></button>
        <button class="btn-sm-icon btn-delete" onclick="deleteProductConfirm(${id})" title="Delete"><i class="bi bi-trash-fill"></i></button>
    </div></td></tr>`;
    }

    // ── ADD / EDIT ──
    function openAddProduct() {
        editingId = null;
    document.getElementById('modal-product-title').textContent = 'Add Product';
    document.getElementById('product-category').value = 'capsule';
    renderProductFields();
    openModal('modal-product');
    }

    function editProduct(id) {
        editingId = id;
      const p = products.find(x=>x.id===id);
    document.getElementById('modal-product-title').textContent = 'Edit Product';
    document.getElementById('product-category').value = p.category;
    renderProductFields(p);
    openModal('modal-product');
    }

    function renderProductFields(data = { }) {
      const cat = document.getElementById('product-category').value;
    let html = '';
    if (cat === 'capsule') {
        html = flds([
            ['product-name', 'Product Name', 'text', data.name, '', 'col-md-6'],
            ['product-output', 'Output', 'text', data.output, 'e.g. 50,000 caps/hr', 'col-md-6'],
            ['product-size', 'Capsule Size (mm)', 'text', data.size, 'e.g. 00, 0, 1', 'col-md-4'],
            ['product-dimension', 'Machine Dimension', 'text', data.dimension, 'L×W×H mm', 'col-md-4'],
            ['product-weight', 'Shipping Weight (kg)', 'number', data.weight, '', 'col-md-4'],
        ]);
      } else if (cat === 'tablet') {
        html = flds([
            ['product-model', 'Model Number', 'text', data.model, '', 'col-md-6'],
            ['product-dies', 'Dies', 'number', data.dies, '', 'col-md-6'],
            ['product-maxPressure', 'Max Pressure', 'text', data.maxPressure, 'e.g. 80 kN', 'col-md-4'],
            ['product-maxDia', 'Max Diameter (mm)', 'number', data.maxDia, '', 'col-md-4'],
            ['product-maxDepth', 'Max Depth of Fill (mm)', 'number', data.maxDepth, '', 'col-md-4'],
            ['product-capacity', 'Production Capacity', 'text', data.capacity, '', 'col-md-6'],
            ['product-size2', 'Machine Size', 'text', data.size, 'L×W×H mm', 'col-md-6'],
            ['product-weight', 'Net Weight (kg)', 'number', data.weight, '', 'col-md-6'],
        ]);
      } else {
        html = flds([
            ['product-modelName', 'Model Name', 'text', data.modelName, '', 'col-md-6'],
            ['product-airPressure', 'Air Pressure', 'text', data.airPressure, 'e.g. 0.6 MPa', 'col-md-6'],
            ['product-airVolume', 'Air Volume', 'text', data.airVolume, 'e.g. 0.5 m³/min', 'col-md-6'],
            ['product-speed', 'Filling Speed (Bottles/min)', 'number', data.speed, '', 'col-md-6'],
            ['product-fillRange', 'Filling Range (ml)', 'text', data.fillRange, 'e.g. 5–500 ml', 'col-md-12'],
        ]);
      }
    document.getElementById('product-fields').innerHTML = '<div class="row g-3">' + html + '</div>';
    }

    function flds(arr) {
      return arr.map(([id,label,type,val,ph,cls]) =>
    `<div class="${cls||'col-md-6'}">
        <label class="form-label-custom">${label}</label>
        <input type="${type}" id="${id}" class="form-control-custom" value="${val||''}" placeholder="${ph||''}">
    </div>`).join('');
    }

    function saveProduct() {
      const cat = document.getElementById('product-category').value;
    let p = {category: cat };
    if (cat === 'capsule') {
        p = { ...p, name: g('product-name'), output: g('product-output'), size: g('product-size'), dimension: g('product-dimension'), weight: g('product-weight') };
    if (!p.name) {showToast('Product Name is required', 'bi-exclamation-circle-fill'); return; }
      } else if (cat === 'tablet') {
        p = { ...p, model: g('product-model'), dies: g('product-dies'), maxPressure: g('product-maxPressure'), maxDia: g('product-maxDia'), maxDepth: g('product-maxDepth'), capacity: g('product-capacity'), size: g('product-size2'), weight: g('product-weight') };
    if (!p.model) {showToast('Model Number is required', 'bi-exclamation-circle-fill'); return; }
      } else {
        p = { ...p, modelName: g('product-modelName'), airPressure: g('product-airPressure'), airVolume: g('product-airVolume'), speed: g('product-speed'), fillRange: g('product-fillRange') };
    if (!p.modelName) {showToast('Model Name is required', 'bi-exclamation-circle-fill'); return; }
      }

    if (editingId) {
        const idx = products.findIndex(x=>x.id===editingId);
    products[idx] = {...products[idx], ...p };
    showToast('Product updated!','bi-check-circle-fill');
      } else {
        products.push({ id: nextProductId++, ...p });
    showToast('Product added!','bi-plus-circle-fill');
      }
    persist();
    closeModal('modal-product');
    updateChips();
    renderProducts();
    }

    function deleteProductConfirm(id) {
      const p   = products.find(x=>x.id===id);
    const name = p.name || p.model || p.modelName;
    confirmDelete(`Delete product "${name}"? This cannot be undone.`, () => {
        products = products.filter(x => x.id !== id);
    persist();
    updateChips();
    renderProducts();
    showToast('Product deleted','bi-trash-fill');
      });
    }

    // ── INIT ──
    initModals();
    updateChips();
    renderProducts();
