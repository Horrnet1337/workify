(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supportsVT = typeof document.startViewTransition === 'function';

  function isInternal(a) {
    if (!a || a.tagName !== 'A') return false;
    if (a.hasAttribute('download') || a.hasAttribute('data-lang-link')) return false;
    if (a.target === '_blank' || a.origin !== location.origin) return false;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return false;
    return true;
  }

  function syncHeader(doc) {
    var pairs = [
      ['.nav__link', true],
      ['.nav__lang-btn', true],
      ['.lang__option', true],
      ['.lang__current', false]
    ];
    pairs.forEach(function (p) {
      var cur = document.querySelectorAll(p[0]);
      var next = doc.querySelectorAll(p[0]);
      cur.forEach(function (el, i) {
        if (!next[i]) return;
        if (p[1]) {
          el.className = next[i].className;
          if (next[i].hasAttribute('href')) el.setAttribute('href', next[i].getAttribute('href'));
          if (next[i].hasAttribute('aria-selected')) el.setAttribute('aria-selected', next[i].getAttribute('aria-selected'));
        } else {
          el.textContent = next[i].textContent;
        }
      });
    });
  }

  function swap(doc, url, mode) {
    var newMain = doc.querySelector('main');
    var main = document.querySelector('main');
    if (!newMain || !main) { window.location.href = url; return; }

    main.innerHTML = newMain.innerHTML;
    document.title = doc.title;
    document.body.className = doc.body.className;
    document.body.setAttribute('data-page', doc.body.getAttribute('data-page') || '');
    var html = document.documentElement;
    if (doc.documentElement.getAttribute('lang')) html.setAttribute('lang', doc.documentElement.getAttribute('lang'));
    syncHeader(doc);

    if (mode === 'push') window.history.pushState({ spa: true }, '', url);
    window.scrollTo({ top: 0, behavior: 'auto' });

    if (window.ADT && window.ADT.initPage) window.ADT.initPage();
  }

  function overlayTransition(doFn) {
    document.body.classList.add('is-navigating', 'page-leaving');
    return new Promise(function (resolve) {
      setTimeout(function () {
        doFn();
        document.body.classList.remove('page-leaving');
        document.body.classList.add('page-entering');
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            document.body.classList.remove('page-entering', 'is-navigating');
            resolve();
          });
        });
      }, reduceMotion ? 0 : 320);
    });
  }

  function fetchDoc(url) {
    return fetch(url, { headers: { Accept: 'text/html' }, credentials: 'same-origin' })
      .then(function (r) { if (!r.ok) throw new Error('nav'); return r.text(); })
      .then(function (h) { return new DOMParser().parseFromString(h, 'text/html'); });
  }

  function navigate(url, mode) {
    document.body.classList.add('is-navigating');
    return fetchDoc(url).then(function (doc) {
      var run = function () { swap(doc, url, mode || 'push'); };
      if (supportsVT && !reduceMotion) {
        return document.startViewTransition(run).finished.catch(function () {});
      }
      return overlayTransition(run);
    }).catch(function () {
      window.location.href = url;
    }).then(function () {
      document.body.classList.remove('is-navigating');
    });
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest('a');
    if (!isInternal(a)) return;
    var url = a.href;
    if (url === location.href) { e.preventDefault(); return; }
    e.preventDefault();
    navigate(url, 'push');
  });

  window.addEventListener('popstate', function () {
    navigate(location.href, 'replace');
  });
})();
