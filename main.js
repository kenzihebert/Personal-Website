/* =====================================================================
   McKenzie Hebert - portfolio
   Interactions: smooth scroll, nav, hero chart draw, reveals, counters,
   pictogram, project dialogs.

   Scroll work is one rAF-coalesced pass with cached offsets. Everything
   that animates does so once, on entry, and then stays still.
   ===================================================================== */

(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  function scrollToEl(id) {
    const el = $(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.2 });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---------- nav, progress ---------- */
  const nav = $('#nav');
  const progress = $('#progress');
  const links = $$('.nav-links a');
  const sections = links.map((l) => $(l.getAttribute('href'))).filter(Boolean);
  let offsets = [];
  let docH = 1;
  function measure() {
    offsets = sections.map((s) => ({ id: s.id, top: s.getBoundingClientRect().top + window.scrollY }));
    docH = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  }
  let ticking = false, scrolled = false, activeId = null;
  function frame() {
    ticking = false;
    const y = window.scrollY;
    const s = y > 24;
    if (s !== scrolled) { scrolled = s; nav.classList.toggle('scrolled', s); }
    progress.style.transform = 'scaleX(' + Math.min(y / docH, 1).toFixed(4) + ')';
    const probe = y + window.innerHeight * 0.35;
    let id = null;
    for (let i = 0; i < offsets.length; i++) if (offsets[i].top <= probe) id = offsets[i].id;
    if (id !== activeId) {
      activeId = id;
      links.forEach((l) => l.classList.toggle('active', !!id && l.getAttribute('href') === '#' + id));
    }
  }
  function tick() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', () => { measure(); tick(); });
  window.addEventListener('load', () => { measure(); tick(); });
  measure(); tick();
  if (window.ResizeObserver) new ResizeObserver(() => { measure(); tick(); }).observe(document.body);

  /* ---------- anchors, mobile menu ---------- */
  const burger = $('#burger');
  const menu = $('#mobile-menu');
  function closeMenu() {
    burger.classList.remove('open');
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', () => {
    const open = !menu.classList.contains('open');
    burger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && $(id)) { e.preventDefault(); closeMenu(); scrollToEl(id); }
    });
  });

  /* ---------- hero entrance + chart draw ---------- */
  const line = $('#ili-line');
  const area = $('#ili-area');
  const peak = $('.peak');
  if (window.gsap && !reduced) {
    const heroLines = $$('.hero h1 .line span');
    const heroBits = $$('.hero-copy > *:not(h1)');
    const photo = $('.hero-photo');
    gsap.set(heroLines, { yPercent: 110 });
    gsap.set(heroBits, { opacity: 0, y: 18 });
    if (photo) gsap.set(photo, { opacity: 0, scale: 0.94 });
    const len = line.getTotalLength();
    gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
    gsap.set(area, { opacity: 0 });
    const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power4.out' } })
      .to(heroLines, { yPercent: 0, duration: 1.1, stagger: 0.12 })
      .to(heroBits, { opacity: 1, y: 0, duration: 0.8, stagger: 0.07 }, '-=0.7')
      .to(photo || {}, { opacity: 1, scale: 1, duration: 1 }, '-=0.9')
      .to(line, { strokeDashoffset: 0, duration: 2.6, ease: 'power2.inOut' }, '-=0.9')
      .to(area, { opacity: 1, duration: 1.2, ease: 'power1.out' }, '-=0.9')
      .add(() => { peak.classList.add('in'); gsap.set(line, { strokeDasharray: 'none' }); }, '-=0.5');
    // if frames are being throttled and nothing has moved, show the content rather than wait
    setTimeout(() => { if (tl.progress() < 0.05) { tl.progress(1); peak.classList.add('in'); } }, 3500);
  } else {
    peak.classList.add('in');
  }

  /* ---------- reveals ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal').forEach((el, i) => io.observe(el));

  // siblings that enter together get a small stagger
  $$('.cards, .timeline, .awards, .skills, .contact-grid, .specs').forEach((group) => {
    $$(':scope > .reveal', group).forEach((el, i) => { el.style.transitionDelay = Math.min(i * 70, 420) + 'ms'; });
  });

  /* ---------- counters ---------- */
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      cio.unobserve(el);
      if (reduced) return;
      const end = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.dec || '0', 10);
      const t0 = performance.now();
      // never leave a half-counted number on screen if frames stall
      setTimeout(() => { el.textContent = end.toFixed(dec); }, 1800);
      (function step(now) {
        const t = Math.min((now - t0) / 1400, 1);
        const e = 1 - Math.pow(1 - t, 4);
        el.textContent = (end * e).toFixed(dec);
        if (t < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((el) => cio.observe(el));

  /* ---------- pictogram: 100 people, 23 highlighted ---------- */
  const picto = $('#picto');
  if (picto) {
    const N = 23;
    const ns = 'http://www.w3.org/2000/svg';
    const people = [];
    for (let i = 0; i < 100; i++) {
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', '0 0 20 40');
      const use = document.createElementNS(ns, 'use');
      use.setAttribute('href', '#person');
      svg.appendChild(use);
      picto.appendChild(svg);
      people.push(svg);
    }
    // same layout as her app: highlighted figures fill the right-hand columns
    const order = [];
    for (let c = 9; c >= 0; c--) for (let r = 0; r < 10; r++) order.push(r * 10 + c);
    const hits = order.slice(0, N);
    const pio = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      pio.disconnect();
      hits.forEach((idx, k) => setTimeout(() => people[idx].classList.add('hit'), reduced ? 0 : 300 + k * 55));
    }, { threshold: 0.4 });
    pio.observe(picto);
  }

  /* ---------- project dialogs ---------- */
  $$('[data-open]').forEach((btn) => {
    const dlg = document.getElementById(btn.dataset.open);
    if (!dlg || !dlg.showModal) return;
    btn.addEventListener('click', () => { dlg.showModal(); if (lenis) lenis.stop(); });
    dlg.addEventListener('close', () => { if (lenis) lenis.start(); });
    dlg.addEventListener('click', (e) => {
      const r = dlg.getBoundingClientRect();
      const outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      if (e.target === dlg && outside) dlg.close();
    });
    $('.modal-close', dlg).addEventListener('click', () => dlg.close());
  });

  /* ---------- resume viewer fallback ---------- */
  const rf = $('#resume-frame');
  if (rf) {
    const ua = navigator.userAgent;
    const mobile = /iPhone|iPad|iPod|Android/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (mobile) { rf.style.display = 'none'; $('.resume-fallback').style.display = 'block'; }
  }

  $('#year').textContent = new Date().getFullYear();
})();
