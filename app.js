// ===== Catalog with more images + resources =====
const CATALOG = [
  {
    name: 'Kyoto, Japan',
    tags: ['temples','culture','asia'],
    img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d8?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d8?q=80&w=1200',
      'https://images.unsplash.com/photo-1526481280698-8fcc13fd1f52?q=80&w=1200'
    ],
    resources: [
      {label:'Japan-Guide Kyoto', url:'https://www.japan-guide.com/e/e2158.html'},
      {label:'Lonely Planet', url:'https://www.lonelyplanet.com/japan/kansai/kyoto'}
    ]
  },
  {
    name: 'Santorini, Greece',
    tags: ['islands','europe','beach'],
    img: 'https://images.unsplash.com/photo-1504731239160-1f6fcbb4f85a?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1504731239160-1f6fcbb4f85a?q=80&w=1200',
      'https://images.unsplash.com/photo-1507568237455-03288f3f1b8f?q=80&w=1200'
    ],
    resources: [
      {label:'Visit Greece', url:'https://www.visitgreece.gr/islands/cyclades/santorini/'},
      {label:'Lonely Planet', url:'https://www.lonelyplanet.com/greece/santorini'}
    ]
  },
  {
    name: 'Marrakech, Morocco',
    tags: ['markets','africa','desert'],
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200'
    ],
    resources: [
      {label:'Visit Morocco', url:'https://www.visitmorocco.com/en'},
      {label:'Lonely Planet', url:'https://www.lonelyplanet.com/morocco/marrakesh'}
    ]
  },
  {
    name: 'Banff, Canada',
    tags: ['mountains','lakes','north america'],
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200',
      'https://images.unsplash.com/photo-1508261303786-0e3b16d6d38d?q=80&w=1200'
    ],
    resources: [
      {label:'Parks Canada', url:'https://parks.canada.ca/pn-np/ab/banff'},
      {label:'Travel Alberta', url:'https://www.travelalberta.com/ca/places-to-go/canadian-rockies/banff/'}
    ]
  },
  {
    name: 'Hoi An, Vietnam',
    tags: ['heritage','lanterns','asia'],
    img: 'https://images.unsplash.com/photo-1562457753-6867bda0283b?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1562457753-6867bda0283b?q=80&w=1200',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200'
    ],
    resources: [
      {label:'Vietnam Tourism', url:'https://vietnam.travel/places-to-go/hoi-an'},
      {label:'UNESCO', url:'https://whc.unesco.org/en/list/948/'}
    ]
  },
  {
    name: 'Reykjavík, Iceland',
    tags: ['northern lights','europe','adventure'],
    img: 'https://images.unsplash.com/photo-1500043357865-c6b8827edf39?q=80&w=1200&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1500043357865-c6b8827edf39?q=80&w=1200',
      'https://images.unsplash.com/photo-1527489377706-5bf97e608852?q=80&w=1200'
    ],
    resources: [
      {label:'Visit Reykjavík', url:'https://visitreykjavik.is/'},
      {label:'Visit Iceland', url:'https://visiticeland.com/'}
    ]
  }
];

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const results = document.getElementById('results');
function render(list){
  if(!results) return;
  if(!list.length){
    results.innerHTML = '<p style="color:var(--muted);margin:6px 0 0">No results. Try another keyword (e.g., "islands", "culture", "mountains").</p>';
    return;
  }
  results.innerHTML = list.map(item => `
    <div class="result-card">
      <img src="${item.img}" alt="${item.name}" />
      <div class="info">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
          <strong>${item.name}</strong>
          <span class="tag">Top pick</span>
        </div>
        <div class="chips">
          ${item.tags.map(t=>`<span class="chip">${t}</span>`).join('')}
        </div>
        <div class="resources">
          ${item.resources.map(r=>`<a href="${r.url}" target="_blank" rel="noopener">${r.label}</a>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Initial render
if (results) render(CATALOG.slice(0,6));

// Search
const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
if (form && input) {
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const q = (input.value||'').trim().toLowerCase();
    if(!q){ render(CATALOG.slice(0,6)); return; }
    const filtered = CATALOG.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.tags.join(' ').includes(q)
    );
    render(filtered);
  });
  input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter'){ form.dispatchEvent(new Event('submit')); }});
}

// ===== Featured destination cards (multi-photo) =====
const destGrid = document.getElementById('destGrid');
if (destGrid) {
  destGrid.innerHTML = CATALOG.map(d => `
    <div class="dest-card">
      <header>${d.name}</header>
      <div class="dest-photos">
        ${d.photos.map(p=>`<img src="${p}" alt="${d.name} photo">`).join('')}
      </div>
      <div style="padding:10px 14px">
        <div class="chips">${d.tags.map(t=>`<span class="chip">${t}</span>`).join('')}</div>
        <div class="resources">${d.resources.map(r=>`<a href="${r.url}" target="_blank" rel="noopener">${r.label}</a>`).join('')}</div>
      </div>
    </div>
  `).join('');
}

// ===== Schedule Demo modal =====
const openDemoBtn = document.getElementById('openDemo');
const closeDemoBtn = document.getElementById('closeDemo');
const modal = document.getElementById('demoModal');
const back = document.getElementById('demoBackdrop');
function openModal(){ modal.classList.add('show'); back.classList.add('show'); }
function closeModal(){ modal.classList.remove('show'); back.classList.remove('show'); }
if (openDemoBtn){ openDemoBtn.addEventListener('click', openModal); }
if (closeDemoBtn){ closeDemoBtn.addEventListener('click', closeModal); }
if (back){ back.addEventListener('click', closeModal); }

const demoForm = document.getElementById('demoForm');
const demoMsg = document.getElementById('demoMsg');
if (demoForm){
  demoForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(demoForm).entries());
    demoMsg.textContent = `Thanks ${data.name}! We’ll confirm your demo on ${new Date(data.datetime).toLocaleString()} via ${data.email}.`;
    demoForm.reset();
  });
}
