
(function(){
  // theme
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved) html.setAttribute('data-theme', saved);
  document.getElementById('themeToggle')?.addEventListener('click', ()=>{
    const cur = html.getAttribute('data-theme')==='dark' ? 'light' : 'dark';
    if(cur==='light') html.removeAttribute('data-theme'); else html.setAttribute('data-theme','dark');
    localStorage.setItem('theme', cur);
  });

  // active nav
  const active = window.__ACTIVE;
  document.querySelectorAll('[data-active="'+active+'"]').forEach(a=>a.classList.add('active'));
  // mobile menu
  const btn = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  if(btn && menu){ btn.addEventListener('click', ()=> menu.classList.toggle('open')); }
  // page transitions
  const LINKS = Array.from(document.querySelectorAll('a[href]'));
  LINKS.forEach(a=>{
    const href = a.getAttribute('href');
    if(!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target==='_blank') return;
    a.addEventListener('click', (e)=>{ if(href.startsWith('#')) return; e.preventDefault(); document.body.classList.add('fade-out'); setTimeout(()=>{ location.href = href; }, 220); });
  });
})();

const $ = s => document.querySelector(s);
$('#calc')?.addEventListener('click', () => {/* hitung & render */});
$('#copy')?.addEventListener('click', () => {/* copy */});
$('#reset')?.addEventListener('click', () => {
  $('#nights').value = 1;
  $('#rate').value = 15000;
  $('#tax').value = 10;
  $('#disc').value = 0;
  $('#out').textContent = '—';
});

// MENU TOGGLE
(function(){
  const btn  = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  if(!btn || !menu) return;

  btn.addEventListener('click', ()=>{
    menu.classList.toggle('is-open');
    const open = menu.classList.contains('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // tutup saat klik link/luar
  document.addEventListener('click', (e)=>{
    if(!menu.classList.contains('is-open')) return;
    if(e.target.closest('#menu') || e.target.closest('#menuToggle')) return;
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded','false');
  });
})();
