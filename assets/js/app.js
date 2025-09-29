// Portfolio interactive script
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const toTop = document.querySelector('.to-top');
const yearEl = document.getElementById('year');
const statNums = document.querySelectorAll('.stat__num');
const panels = document.querySelectorAll('.fade-in');
const subtitleEl = document.querySelector('.typewriter');

yearEl.textContent = new Date().getFullYear();

// Theme persistence
const THEME_KEY = 'pref-theme';
const stored = localStorage.getItem(THEME_KEY);
if (stored) {
  document.documentElement.setAttribute('data-theme', stored);
  themeToggle.textContent = stored === 'dark' ? '🌙' : '☀️';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

// Mobile nav toggle
if (navToggle) navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
});

// Close nav on link click (mobile)
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  if (nav.classList.contains('open')) {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
}));

// Typewriter effect
function typeText(el) {
  const full = el.getAttribute('data-text') || '';
  let i = 0;
  const speed = 35;
  function step() {
    el.textContent = full.slice(0, i++);
    if (i <= full.length) requestAnimationFrame(step);
  }
  step();
}
if (subtitleEl) requestAnimationFrame(() => typeText(subtitleEl));

// Intersection animations
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

panels.forEach(p => io.observe(p));

// Stat counter
function animateCount(el) {
  const target = +el.dataset.count;
  const duration = 1600;
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

statNums.forEach(el => animateCount(el));

// Scroll listener for back to top
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) toTop?.classList.add('visible');
  else toTop?.classList.remove('visible');
});

// Parallax-ish hero background via canvas particles
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const P_COUNT = 80;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize, { passive: true });
resize();

function initParticles() {
  particles = Array.from({ length: P_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    hue: 220 + Math.random() * 80
  }));
}
initParticles();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'lighter';
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    const alpha = 0.12 + (p.r / 2) * 0.25;
    ctx.fillStyle = `hsla(${p.hue},70%,60%,${alpha})`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

// Contact form (client-side demo only)
const form = document.querySelector('.contact-form');
const statusEl = document.querySelector('.form-status');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    statusEl.textContent = 'Sending…';
    setTimeout(() => {
      statusEl.textContent = 'Message sent (demo)!';
      form.reset();
    }, 900);
  });
}

// Accessibility improvement: reduce motion respect
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.glitch').forEach(el => el.classList.remove('glitch'));
}
