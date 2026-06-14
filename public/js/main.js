(function () {
  'use strict';

  var SLIDE_MS = 260;
  var SLIDE_EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
  var langCache = window.__workifyLangCache || (window.__workifyLangCache = new Map());

  function isMobileView() {
    return window.matchMedia('(max-width: 900px)').matches;
  }

  function slideDistance() {
    return isMobileView() ? '100vw' : '100%';
  }

  function runCrossSlide(outgoing, incoming) {
    var dist = slideDistance();
    var opts = { duration: SLIDE_MS, easing: SLIDE_EASE, fill: 'forwards' };

    outgoing.style.willChange = 'transform';
    incoming.style.willChange = 'transform';

    var outAnim = outgoing.animate(
      [
        { transform: 'translate3d(0, 0, 0)' },
        { transform: 'translate3d(-' + dist + ', 0, 0)' },
      ],
      opts
    );

    var inAnim = incoming.animate(
      [
        { transform: 'translate3d(' + dist + ', 0, 0)' },
        { transform: 'translate3d(0, 0, 0)' },
      ],
      opts
    );

    return Promise.all([outAnim.finished, inAnim.finished]).then(function () {
      outAnim.cancel();
      inAnim.cancel();
      outgoing.style.willChange = '';
      incoming.style.willChange = '';
      incoming.style.transform = '';
    });
  }

  function fetchLangPage(href) {
    if (langCache.has(href)) {
      return Promise.resolve(langCache.get(href));
    }

    return fetch(href, {
      credentials: 'same-origin',
      headers: { Accept: 'text/html' },
    }).then(function (response) {
      if (!response.ok) throw new Error('Language fetch failed');
      return response.text().then(function (html) {
        var result = {
          doc: new DOMParser().parseFromString(html, 'text/html'),
          url: response.url,
        };
        langCache.set(href, result);
        return result;
      });
    });
  }

  function prefetchLangPage(href) {
    if (langCache.has(href)) return;
    fetchLangPage(href).catch(function () { /* ignore */ });
  }

  function openMobileMenu() {
    document.body.classList.add('menu-open');
    var toggle = document.querySelector('.menu-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    document.body.classList.remove('menu-open');
    var toggle = document.querySelector('.menu-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMobileMenu() {
    if (document.body.classList.contains('menu-open')) {
      closeMobileMenu();
    } else {
      closeLangSwitchers();
      openMobileMenu();
    }
  }

  function initIndustryPicker() {
    const pickerForm = document.getElementById('industry-picker');
    const dropdown = document.querySelector('[data-industry-dropdown]');

    if (!pickerForm || !dropdown || dropdown.dataset.bound === '1') return;

    dropdown.dataset.bound = '1';

    const trigger = dropdown.querySelector('.industry-picker__trigger');
    const valueEl = dropdown.querySelector('.industry-picker__value');
    const hiddenInput = dropdown.querySelector('input[name="industry"]');
    const menu = dropdown.querySelector('.industry-picker__menu');
    const options = Array.from(dropdown.querySelectorAll('.industry-picker__option'));
    let focusedIndex = -1;

    function setOpen(open) {
      dropdown.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;

      if (!open) {
        focusedIndex = -1;
        options.forEach(function (opt) {
          opt.classList.remove('is-focused');
        });
      }
    }

    function selectOption(option) {
      const value = option.dataset.value;
      const label = option.textContent.trim();

      hiddenInput.value = value;
      valueEl.textContent = label;
      valueEl.classList.toggle('is-placeholder', !value);

      options.forEach(function (opt) {
        const selected = opt === option;
        opt.classList.toggle('is-selected', selected);
        opt.setAttribute('aria-selected', String(selected));
      });

      setOpen(false);
      trigger.focus();
    }

    function moveFocus(direction) {
      if (!dropdown.classList.contains('is-open')) return;

      const start = focusedIndex < 0 ? (direction > 0 ? 0 : options.length - 1) : focusedIndex;
      focusedIndex = Math.max(0, Math.min(options.length - 1, start + direction));

      options.forEach(function (opt) {
        opt.classList.remove('is-focused');
      });

      const target = options[focusedIndex];
      target.classList.add('is-focused');
      target.scrollIntoView({ block: 'nearest' });
    }

    trigger.addEventListener('click', function () {
      setOpen(!dropdown.classList.contains('is-open'));
    });

    options.forEach(function (option, index) {
      option.addEventListener('click', function () {
        selectOption(option);
      });

      option.addEventListener('mouseenter', function () {
        focusedIndex = index;
        options.forEach(function (opt) {
          opt.classList.remove('is-focused');
        });
        option.classList.add('is-focused');
      });
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!dropdown.classList.contains('is-open')) {
          setOpen(true);
          moveFocus(1);
        } else if (e.key === 'ArrowDown') {
          moveFocus(1);
        }
      } else if (e.key === 'ArrowUp' && dropdown.classList.contains('is-open')) {
        e.preventDefault();
        moveFocus(-1);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    });

    menu.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveFocus(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveFocus(-1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const focused = options.find(function (opt) {
          return opt.classList.contains('is-focused');
        });
        if (focused) selectOption(focused);
      } else if (e.key === 'Escape') {
        setOpen(false);
        trigger.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        setOpen(false);
      }
    });

    pickerForm.addEventListener('submit', function (e) {
      const val = hiddenInput.value;
      if (val) {
        e.preventDefault();
        window.location.href = '/branze/' + val;
      }
    });
  }

  function closeLangSwitchers() {
    document.querySelectorAll('[data-lang-switcher].is-open').forEach(function (switcher) {
      switcher.classList.remove('is-open');
      const trigger = switcher.querySelector('.lang-switcher__trigger');
      const menu = switcher.querySelector('.lang-switcher__menu');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (menu) menu.hidden = true;
    });
  }

  function prefetchAllLangs(switcher) {
    switcher.querySelectorAll('[data-lang-link]').forEach(function (link) {
      prefetchLangPage(link.href);
    });
  }

  async function switchLanguage(link) {
    if (window.__workifyLangBusy) return;

    const href = link.href;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      window.location.href = href;
      return;
    }

    const stage = document.querySelector('[data-lang-stage]');
    const outgoing = stage && stage.querySelector('[data-lang-panel]');

    if (!stage || !outgoing) {
      window.location.href = href;
      return;
    }

    closeMobileMenu();
    closeLangSwitchers();
    window.__workifyLangBusy = true;
    document.body.classList.add('lang-switching');

    let payload;

    try {
      payload = await fetchLangPage(href);
    } catch (err) {
      window.__workifyLangBusy = false;
      document.body.classList.remove('lang-switching');
      window.location.href = href;
      return;
    }

    const incomingRoot = payload.doc.querySelector('[data-lang-panel]') || payload.doc.querySelector('.page-slide');
    if (!incomingRoot) {
      window.__workifyLangBusy = false;
      document.body.classList.remove('lang-switching');
      window.location.href = href;
      return;
    }

    const incoming = incomingRoot.cloneNode(true);
    incoming.setAttribute('data-lang-panel', '');
    incoming.classList.add('page-slide--incoming');
    outgoing.classList.add('page-slide--outgoing');

    stage.appendChild(incoming);

    document.documentElement.lang = payload.doc.documentElement.lang;
    document.title = payload.doc.title;
    document.body.className = payload.doc.body.className + ' lang-switching';

    void incoming.offsetWidth;

    try {
      await runCrossSlide(outgoing, incoming);
    } catch (animErr) {
      /* continue cleanup */
    }

    incoming.classList.remove('page-slide--incoming');
    outgoing.remove();

    document.body.classList.remove('lang-switching');

    const url = new URL(payload.url, window.location.origin);
    window.history.replaceState({ lang: true }, '', url.pathname + url.search);

    initIndustryPicker();
    document.dispatchEvent(new CustomEvent('workify:page-updated'));

    window.__workifyLangBusy = false;
  }

  function initUiDelegation() {
    if (window.__workifyUiDelegation) return;
    window.__workifyUiDelegation = true;

    document.addEventListener('click', function (e) {
      if (e.target.closest('.menu-toggle')) {
        e.preventDefault();
        toggleMobileMenu();
        return;
      }

      if (e.target.closest('[data-nav-close]')) {
        closeMobileMenu();
        return;
      }

      if (e.target.closest('.nav__link')) {
        closeMobileMenu();
      }

      const trigger = e.target.closest('.lang-switcher__trigger');
      if (trigger) {
        e.preventDefault();
        const switcher = trigger.closest('[data-lang-switcher]');
        if (!switcher) return;

        const isOpen = switcher.classList.contains('is-open');
        closeLangSwitchers();

        if (!isOpen) {
          switcher.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          const menu = switcher.querySelector('.lang-switcher__menu');
          if (menu) menu.hidden = false;
          prefetchAllLangs(switcher);
        }
        return;
      }

      if (!e.target.closest('[data-lang-switcher]')) {
        closeLangSwitchers();
      }

      const link = e.target.closest('[data-lang-link]');
      if (!link) return;

      e.preventDefault();
      e.stopImmediatePropagation();
      switchLanguage(link);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeLangSwitchers();
        closeMobileMenu();
      }
    });

    document.addEventListener('mouseover', function (e) {
      const link = e.target.closest('[data-lang-link]');
      if (!link) return;
      prefetchLangPage(link.href);
    });

    document.addEventListener('touchstart', function (e) {
      const link = e.target.closest('[data-lang-link]');
      if (!link) return;
      prefetchLangPage(link.href);
    }, { passive: true });
  }

  initIndustryPicker();
  initUiDelegation();
})();
