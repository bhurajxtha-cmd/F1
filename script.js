/* ---- CURSOR ---- */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

/* ---- NAV SCROLL ---- */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});



/* ---- MARQUEE ---- */
const marqueeItems = [
  'Monaco Grand Prix', 'Silverstone Circuit', 'Suzuka Circuit',
  'Spa-Francorchamps', 'Monza Temple of Speed', 'Bahrain International',
  'Las Vegas Strip Circuit', 'Abu Dhabi Season Finale', 'Singapore Night Race'
];
const mi = document.getElementById('marqueeInner');
const mContent = [...marqueeItems, ...marqueeItems].map(
  i => `<span class="marquee-item">${i}</span>`
).join('');
mi.innerHTML = mContent + mContent;

/* ---- CAR DATA & RENDER ---- */
const cars = [
  { num: '1',  team: 'Red Bull Racing',    model: 'RB21',              color: '#3671C6', pw: '1025hp', wt: '800kg', top: '355km/h' },
  { num: '16', team: 'Scuderia Ferrari',   model: 'SF-25',             color: '#E8001D', pw: '1015hp', wt: '798kg', top: '350km/h' },
  { num: '4',  team: 'McLaren F1 Team',    model: 'MCL39',             color: '#FF8000', pw: '1005hp', wt: '799kg', top: '345km/h' },
  { num: '44', team: 'Mercedes-AMG F1',    model: 'W16 E Performance', color: '#00D2BE', pw: '1010hp', wt: '798kg', top: '340km/h' },
  { num: '14', team: 'Aston Martin F1',    model: 'AMR25',             color: '#358C75', pw: '998hp',  wt: '800kg', top: '338km/h' },
  { num: '10', team: 'Alpine F1 Team',     model: 'A525',              color: '#0090FF', pw: '990hp',  wt: '800kg', top: '335km/h' },
];

function buildCarSVG(color) {
  const id = 'g' + color.replace('#','');
  return `<svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg" style="width:92%;height:92%;filter:drop-shadow(0 10px 40px ${color}25)">
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.55"/>
        <stop offset="50%" stop-color="${color}"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0.45"/>
      </linearGradient>
    </defs>
    <ellipse cx="170" cy="98" rx="148" ry="8" fill="${color}" opacity="0.06"/>
    <rect x="18" y="40" width="44" height="7" rx="2" fill="${color}"/>
    <rect x="26" y="47" width="2" height="22" fill="${color}" opacity="0.65"/>
    <rect x="50" y="47" width="2" height="22" fill="${color}" opacity="0.65"/>
    <ellipse cx="66" cy="83" rx="23" ry="15" fill="#141418" stroke="${color}" stroke-width="3.5"/>
    <ellipse cx="66" cy="83" rx="10" ry="7" fill="#0A0A0B"/>
    <path d="M58 70 L88 60 L128 54 L170 51 L222 51 L252 55 L282 62 L292 74 L272 83 L220 87 L170 89 L108 86 L72 81 Z" fill="url(#${id})"/>
    <path d="M128 55 L182 52 L182 91 L128 89 Z" fill="${color}" opacity="0.5"/>
    <path d="M202 52 L252 56 L252 89 L202 91 Z" fill="${color}" opacity="0.5"/>
    <path d="M158 37 L202 37 L212 51 L148 51 Z" fill="${color}" opacity="0.88"/>
    <path d="M163 39 L197 39 L202 50 L156 50 Z" fill="#0A0A0B" opacity="0.82"/>
    <path d="M268 76 L312 69 L320 77 L312 84 L268 82 Z" fill="${color}"/>
    <rect x="283" y="65" width="37" height="6" rx="2" fill="${color}" opacity="0.75"/>
    <ellipse cx="290" cy="84" rx="19" ry="13" fill="#141418" stroke="${color}" stroke-width="3.5"/>
    <ellipse cx="290" cy="84" rx="8" ry="6" fill="#0A0A0B"/>
    <path d="M160 36 Q180 28 202 36" stroke="${color}" stroke-width="3" fill="none" opacity="0.65"/>
  </svg>`;
}

const carsGrid = document.getElementById('carsGrid');
cars.forEach(c => {
  const div = document.createElement('div');
  div.className = 'car-card';
  div.innerHTML = `
    <div class="car-visual">
      <div class="car-svg-wrap">${buildCarSVG(c.color)}</div>
    </div>
    <div class="car-info">
      <div class="car-number">${c.num}</div>
      <div class="car-team-name">${c.team}</div>
      <div class="car-model">${c.model}</div>
      <div class="car-specs">
        <div class="spec-item">
          <div class="spec-val">${c.pw}</div>
          <div class="spec-label">Power</div>
        </div>
        <div class="spec-item">
          <div class="spec-val">${c.wt}</div>
          <div class="spec-label">Weight</div>
        </div>
        <div class="spec-item">
          <div class="spec-val">${c.top}</div>
          <div class="spec-label">Top Speed</div>
        </div>
      </div>
    </div>
    <div class="car-accent-line"></div>`;
  carsGrid.appendChild(div);
});

/* ---- CIRCUIT DATA ---- */
const circuits = [
  { round: 'Round 01', name: 'Bahrain', country: 'Bahrain', len: '5.412km', laps: '57', lap: '1:31.447' },
  { round: 'Round 03', name: 'Australia', country: 'Australia', len: '5.278km', laps: '58', lap: '1:20.235' },
  { round: 'Round 06', name: 'Monaco', country: 'Monaco', len: '3.337km', laps: '78', lap: '1:12.909' },
  { round: 'Round 09', name: 'Silverstone', country: 'United Kingdom', len: '5.891km', laps: '52', lap: '1:27.097' },
  { round: 'Round 13', name: 'Monza', country: 'Italy', len: '5.793km', laps: '53', lap: '1:21.046' },
  { round: 'Round 17', name: 'Suzuka', country: 'Japan', len: '5.807km', laps: '53', lap: '1:30.983' },
  { round: 'Round 21', name: 'Las Vegas', country: 'USA', len: '6.201km', laps: '50', lap: '1:35.490' },
  { round: 'Round 24', name: 'Abu Dhabi', country: 'UAE', len: '5.281km', laps: '58', lap: '1:26.103' },
];

const cGrid = document.getElementById('circuitsGrid');
circuits.forEach(c => {
  const div = document.createElement('div');
  div.className = 'circuit-card';
  div.innerHTML = `
    <div class="circuit-round">${c.round}</div>
    <div class="circuit-name">${c.name}</div>
    <div class="circuit-country">${c.country}</div>
    <div class="circuit-detail">
      <div class="circuit-row"><span class="key">Length</span><span class="val">${c.len}</span></div>
      <div class="circuit-row"><span class="key">Laps</span><span class="val">${c.laps}</span></div>
      <div class="circuit-row"><span class="key">Lap Record</span><span class="val">${c.lap}</span></div>
    </div>`;
  cGrid.appendChild(div);
});

/* ---- DRIVER DATA ---- */
const drivers = [
  { num: '1', pos: 'P1', first: 'Max', last: 'Verstappen', team: 'Red Bull Racing', pts: '77', color: '#3671C6' },
  { num: '4', pos: 'P2', first: 'Lando', last: 'Norris', team: 'McLaren F1', pts: '62', color: '#FF8000' },
  { num: '16', pos: 'P3', first: 'Charles', last: 'Leclerc', team: 'Scuderia Ferrari', pts: '48', color: '#E8001D' },
  { num: '81', pos: 'P4', first: 'Oscar', last: 'Piastri', team: 'McLaren F1', pts: '44', color: '#FF8000' },
  { num: '44', pos: 'P5', first: 'Lewis', last: 'Hamilton', team: 'Scuderia Ferrari', pts: '36', color: '#E8001D' },
  { num: '63', pos: 'P6', first: 'George', last: 'Russell', team: 'Mercedes-AMG', pts: '32', color: '#00D2BE' },
  { num: '14', pos: 'P7', first: 'Fernando', last: 'Alonso', team: 'Aston Martin', pts: '14', color: '#358C75' },
  { num: '18', pos: 'P8', first: 'Lance', last: 'Stroll', team: 'Aston Martin', pts: '9', color: '#358C75' },
];

const dGrid = document.getElementById('driversGrid');
drivers.forEach(d => {
  const div = document.createElement('div');
  div.className = 'driver-card';
  div.style.setProperty('--team-color', d.color);
  div.innerHTML = `
    <div class="driver-num">${d.num}</div>
    <div class="driver-pos">${d.pos} Championship</div>
    <div class="driver-name">${d.first}<br>${d.last.toUpperCase()}</div>
    <div class="driver-team">${d.team}</div>
    <div class="driver-pts">
      <span class="pts-num">${d.pts}</span>
      <span class="pts-label">Points</span>
    </div>`;
  dGrid.appendChild(div);
});

/* ---- SCROLL PROGRESS BARS ---- */
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.prog-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.tech-block').forEach(b => progressObserver.observe(b));



/* ---- UNMUTE BUTTON ---- */
const navCta = document.querySelector('.nav-cta');
const heroVideo = document.getElementById('heroVideo');
let muted = true;

navCta.addEventListener('click', () => {
  muted = !muted;
  heroVideo.muted = muted;
  navCta.textContent = muted ? 'Enter Paddock' : '🔊 Live Audio';
});