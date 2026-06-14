(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supportsViewTransition = typeof document.startViewTransition === 'function';

  function isInternalNavigation(anchor) {
    if (!anchor || anchor.tagName !== 'A') return false;
    if (anchor.hasAttribute('download')) return false;
    if (anchor.hasAttribute('data-lang-link')) return false;
    if (anchor.target === '_blank') return false;
    if (anchor.origin !== location.origin) return false;

    var href = anchor.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return false;
    }

    return true;
  }

  function needsFullReload() {
    return false;
  }

  function syncNavFromDoc(doc) {
    var currentLinks = document.querySelectorAll('.nav__link');
    var newLinks = doc.querySelectorAll('.nav__link');

    currentLinks.forEach(function (link, index) {
      if (newLinks[index]) {
        link.className = newLinks[index].className;
      }
    });

    var currentLangBtns = document.querySelectorAll('.nav__lang-btn');
    var newLangBtns = doc.querySelectorAll('.nav__lang-btn');
    currentLangBtns.forEach(function (btn, index) {
      if (newLangBtns[index]) {
        btn.className = newLangBtns[index].className;
        btn.href = newLangBtns[index].href;
      }
    });

    var currentSwitcher = document.querySelector('[data-lang-switcher]');
    var newSwitcher = doc.querySelector('[data-lang-switcher]');
    if (currentSwitcher && newSwitcher) {
      currentSwitcher.innerHTML = newSwitcher.innerHTML;
    }

    var currentCta = document.querySelector('.header__cta');
    var newCta = doc.querySelector('.header__cta');
    if (currentCta && newCta) {
      currentCta.className = newCta.className;
    }

    var drawerCta = document.querySelector('.nav__drawer-cta');
    var newDrawerCta = doc.querySelector('.nav__drawer-cta');
    if (drawerCta && newDrawerCta) {
      drawerCta.className = newDrawerCta.className;
    }
  }

  function runScripts(container) {
    container.querySelectorAll('script').forEach(function (oldScript) {
      var script = document.createElement('script');
      if (oldScript.src) {
        script.src = oldScript.src;
      } else {
        script.textContent = oldScript.textContent;
      }
      oldScript.replaceWith(script);
    });
  }

  function updatePage(doc, url, historyMode) {
    var newMain = doc.querySelector('main');
    var main = document.querySelector('main');

    if (!newMain || !main) {
      window.location.href = url;
      return false;
    }

    main.innerHTML = newMain.innerHTML;
    document.title = doc.title;
    document.body.className = doc.body.className;
    syncNavFromDoc(doc);

    runScripts(main);

    if (historyMode === 'push') {
      window.history.pushState({ spa: true }, '', url);
    }

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    return true;
  }

  function fallbackTransition(updateFn) {
    document.body.classList.add('is-navigating', 'page-leaving');

    return new Promise(function (resolve) {
      setTimeout(function () {
        updateFn();
        document.body.classList.remove('page-leaving');
        document.body.classList.add('page-entering');

        requestAnimationFrame(function () {
          document.body.classList.remove('page-entering', 'is-navigating');
          resolve();
        });
      }, prefersReducedMotion ? 0 : 300);
    });
  }

  async function fetchPage(url) {
    var response = await fetch(url, {
      headers: { Accept: 'text/html' },
      credentials: 'same-origin',
    });

    if (!response.ok) throw new Error('Navigation failed');

    var html = await response.text();
    return new DOMParser().parseFromString(html, 'text/html');
  }

  async function navigate(url, historyMode) {
    if (needsFullReload(url)) {
      window.location.href = url;
      return;
    }

    document.body.classList.add('is-navigating');

    try {
      var doc = await fetchPage(url);

      var performUpdate = function () {
        return updatePage(doc, url, historyMode || 'push');
      };

      if (supportsViewTransition && !prefersReducedMotion) {
        var transition = document.startViewTransition(function () {
          performUpdate();
        });
        await transition.finished;
      } else {
        await fallbackTransition(performUpdate);
      }
    } catch (err) {
      window.location.href = url;
    } finally {
      document.body.classList.remove('is-navigating');
    }
  }

  document.addEventListener('click', function (event) {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var anchor = event.target.closest('a');
    if (!isInternalNavigation(anchor)) return;

    var url = anchor.href;
    if (url === location.href) return;

    event.preventDefault();
    navigate(url, 'push');
  });

  window.addEventListener('popstate', function () {
    navigate(location.href, 'none');
  });

  document.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('mouseenter', function () {
      if (!link.href || link.origin !== location.origin) return;
      var prefetch = document.createElement('link');
      prefetch.rel = 'prefetch';
      prefetch.href = link.href;
      prefetch.as = 'document';
      document.head.appendChild(prefetch);
    }, { once: true });
  });
})();
