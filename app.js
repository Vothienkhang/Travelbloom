// ===== Catalog with more images + resources =====
const CATALOG = [
  {
    name: 'Kyoto, Japan',
    tags: ['temples','culture','asia'],
    img: 'https://www.neverendingvoyage.com/wp-content/uploads/2019/09/kyoto-japan-26.jpg',
    photos: [
      'https://i0.wp.com/www.touristjapan.com/wp-content/uploads/2025/01/map-of-kyoto-japan-travel.jpg?resize=1024%2C683&ssl=1',
      'https://i0.wp.com/handluggageonly.co.uk/wp-content/uploads/2017/05/iStock-509472000.jpg?fit=1600%2C1067&ssl=1'
    ],
    resources: [
      {label:'Japan-Guide Kyoto', url:'https://www.japan-guide.com/e/e2158.html'},
      {label:'Lonely Planet', url:'https://www.lonelyplanet.com/japan/kansai/kyoto'}
    ]
  },
  {
    name: 'Santorini, Greece',
    tags: ['islands','europe','beach'],
    img: 'https://sothebysrealty.gr/wp-content/uploads/2016/11/Santorini-sunset-at-dawn-Greece-Sothebys-International-Realty.jpg',
    photos: [
      'https://www.royalcaribbean.com/media-assets/pmc/content/dam/shore-x/santorini-jtr/soc2-pyrgos-village-and-fira-town-with-wine-tasting/stock-photo-fira-town-volcano-sea-santorini_149799614.jpg?w=1920',
      'https://secure.s.forbestravelguide.com/img/destinations/Santorini-CreditiStock_Maglara.jpg'
    ],
    resources: [
      {label:'Visit Greece', url:'https://www.visitgreece.gr/islands/cyclades/santorini/'},
      {label:'Lonely Planet', url:'https://www.lonelyplanet.com/greece/santorini'}
    ]
  },
  {
    name: 'Marrakech, Morocco',
    tags: ['markets','africa','desert'],
    img: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0e/eb/1b/d4.jpg',
    photos: [
      'https://b1858819.smushcdn.com/1858819/wp-content/uploads/2018/11/Marrakech-Souks-Spice-Market-Stall-scaled.jpg?lossy=2&strip=1&webp=1',
      'https://i0.wp.com/www.worldwanderista.com/wp-content/uploads/2019/05/Marrakech-travel-guide.jpg?ssl=1'
    ],
    resources: [
      {label:'Visit Morocco', url:'https://www.visitmorocco.com/en'},
      {label:'Lonely Planet', url:'https://www.lonelyplanet.com/morocco/marrakesh'}
    ]
  },
  {
    name: 'Banff, Canada',
    tags: ['mountains','lakes','north america'],
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIS302cAif9HK1WYvm7MPeE-qj0Wj5LkXctg&s',
    photos: [
      'https://cdn.discoverholidays.io/media/general/y/yba-istock-1368035096.webp',
      'https://pacificnorthwestexplorer.com/wp-content/uploads/2022/12/20190813_095212-B-1024x892.jpg'
    ],
    resources: [
      {label:'Parks Canada', url:'https://parks.canada.ca/pn-np/ab/banff'},
      {label:'Travel Alberta', url:'https://www.travelalberta.com/ca/places-to-go/canadian-rockies/banff/'}
    ]
  },
  {
    name: 'Hoi An, Vietnam',
    tags: ['heritage','lanterns','asia'],
    img: 'https://vietnam.travel/sites/default/files/inline-images/292-Qu%E1%BA%A3ng%20Nam-tmluong50%40gmail.com-thuyen%20hoa.jpg',
    photos: [
      'https://www.remotelands.com/travelogues/app/uploads/2024/04/How-to-Hoi-An-header.jpg',
      'https://image.vietnam.travel/sites/default/files/2021-12/shutterstock_1506184586_resize_0.jpg?v=1757145245'
    ],
    resources: [
      {label:'Vietnam Tourism', url:'https://vietnam.travel/places-to-go/hoi-an'},
      {label:'UNESCO', url:'https://whc.unesco.org/en/list/948/'}
    ]
  },
  {
    name: 'Reykjavík, Iceland',
    tags: ['northern lights','europe','adventure'],
    img: 'https://cdn.britannica.com/71/73371-050-9DFAEC1E/Reykjavik-Iceland.jpg',
    photos: [
      'https://res.cloudinary.com/enchanting/q_70,f_auto,w_1024,h_731,c_fit/quark-web/2024/09/Intro_Reykjavik20Cityscape_AdobeStock_208894627.jpeg',
      'https://www.gonext.com/wp-content/uploads/2019/12/Reykjavi%CC%81k_538038355_iS_web.jpg'
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
