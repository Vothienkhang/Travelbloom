// Simple in-memory catalog + search rendering
const CATALOG = [
  { name: 'Kyoto, Japan', tags:['temples','culture','asia'], img:'https://images.unsplash.com/photo-1545569341-9eb8b30979d8?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Santorini, Greece', tags:['islands','europe','beach'], img:'https://images.unsplash.com/photo-1504731239160-1f6fcbb4f85a?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Marrakech, Morocco', tags:['markets','africa','desert'], img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Banff, Canada', tags:['mountains','lakes','north america'], img:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Hoi An, Vietnam', tags:['heritage','lanterns','asia'], img:'https://images.unsplash.com/photo-1562457753-6867bda0283b?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Reykjavík, Iceland', tags:['northern lights','europe','adventure'], img:'https://images.unsplash.com/photo-1500043357865-c6b8827edf39?q=80&w=1200&auto=format&fit=crop' },
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
      </div>
    </div>
  `).join('');
}

if (results) {
  render(CATALOG.slice(0,4));
}

const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
if (form && input) {
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const q = (input.value||'').trim().toLowerCase();
    if(!q){ render(CATALOG.slice(0,6)); return; }
    const filtered = CATALOG.filter(item =>
      item.name.toLowerCase().includes(q) || item.tags.join(' ').includes(q)
    );
    render(filtered);
  });
  input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){ form.dispatchEvent(new Event('submit')); }
  });
}
