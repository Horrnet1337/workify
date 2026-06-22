(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- persistent UI (header, nav, lang) ---------------- */
  function initHeader() {
    var header = document.querySelector('[data-header]');
    var toTop = document.querySelector('[data-to-top]');
    var progress = document.querySelector('[data-scroll-progress]');

    function onScroll() {
      var y = window.scrollY || 0;
      if (header) header.classList.toggle('is-scrolled', y > 12);
      if (toTop) toTop.classList.toggle('is-visible', y > 600);
      if (progress) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    }
  }

  function initNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function open() {
      document.body.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
    function close() {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', function () {
      document.body.classList.contains('nav-open') ? close() : open();
    });
    document.querySelectorAll('[data-nav-close]').forEach(function (el) {
      el.addEventListener('click', close);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
    window.__adtCloseNav = close;
  }

  function initLang() {
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('.lang__trigger');
      var openSwitchers = document.querySelectorAll('.lang.is-open');

      if (trigger) {
        var wrap = trigger.closest('[data-lang-switcher]');
        var isOpen = wrap.classList.contains('is-open');
        openSwitchers.forEach(function (s) { s.classList.remove('is-open'); s.querySelector('.lang__trigger').setAttribute('aria-expanded', 'false'); });
        if (!isOpen) {
          wrap.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
        return;
      }
      openSwitchers.forEach(function (s) { s.classList.remove('is-open'); s.querySelector('.lang__trigger').setAttribute('aria-expanded', 'false'); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.lang.is-open').forEach(function (s) { s.classList.remove('is-open'); });
      }
    });
  }

  /* ---------------- page content (re-run after navigation) --------- */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal], [data-reveal-children]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.hasAttribute('data-reveal-children')) {
          var step = parseFloat(el.getAttribute('data-stagger')) || 90;
          Array.prototype.forEach.call(el.children, function (child, i) {
            child.style.transitionDelay = (i * step) + 'ms';
          });
        }
        el.classList.add('is-visible');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = target; return; }
    var dur = 1600, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCount);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { io.observe(el); });
  }

  function initCardGlow() {
    if (window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  function initMarquee() {
    document.querySelectorAll('[data-marquee] .marquee__track').forEach(function (track) {
      if (track.dataset.cloned) return;
      track.dataset.cloned = '1';
      track.innerHTML += track.innerHTML;
    });
  }

  function initParallax() {
    if (reduceMotion) return;
    var els = document.querySelectorAll('[data-parallax]');
    if (!els.length) return;
    function onScroll() {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        var offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.transform = 'translateY(' + (-offset) + 'px)';
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initPage() {
    initReveal();
    initCounters();
    initCardGlow();
    initMarquee();
    initParallax();
  }

  function initGlobal() {
    initHeader();
    initNav();
    initLang();
  }

  window.ADT = { initPage: initPage };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initGlobal(); initPage(); });
  } else {
    initGlobal();
    initPage();
  }
})();
