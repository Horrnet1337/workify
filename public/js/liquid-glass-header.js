/**
 * Navbar liquid glass — nikdelvin/liquid-glass approach.
 * https://github.com/nikdelvin/liquid-glass
 */
(function () {
  'use strict';

  var resizeTimer;

  var supportsBackdropFilterUrl = (function () {
    var testEl = document.createElement('div');
    testEl.style.cssText = 'backdrop-filter: url(#test)';
    return (
      testEl.style.backdropFilter === 'url(#test)' ||
      testEl.style.backdropFilter === 'url("#test")'
    );
  })();

  function parseRadius(el) {
    var value = getComputedStyle(el).borderRadius || '12px';
    var match = value.match(/([\d.]+)/);
    return match ? parseFloat(match[1]) : 12;
  }

  function redrawGlass(glassRoot) {
    var liquidGlass = glassRoot.querySelector('#liquid-glass');
    var content = glassRoot.querySelector('.lg-content');
    if (!liquidGlass || !content) return;

    var rect = content.getBoundingClientRect();
    var width = Math.max(1, Math.round(rect.width));
    var height = Math.max(1, Math.round(rect.height));

    var blur = parseFloat(liquidGlass.dataset.blur || '0');
    var chromaticAberration = parseFloat(liquidGlass.dataset.cab || '0');
    var depth = parseFloat(liquidGlass.dataset.depth || '10');
    var strength = parseFloat(liquidGlass.dataset.strength || '100');
    var saturate = parseFloat(liquidGlass.dataset.saturate || '1.5');
    var brightness = parseFloat(liquidGlass.dataset.brightness || '1.1');
    var radius = parseRadius(glassRoot);

    liquidGlass.style.width = width + 'px';
    liquidGlass.style.height = height + 'px';

    if (supportsBackdropFilterUrl && window.WorkifyLiquidGlass) {
      var filterUrl = window.WorkifyLiquidGlass.getDisplacementFilter({
        height: height,
        width: width,
        radius: radius,
        depth: depth,
        strength: strength,
        chromaticAberration: chromaticAberration,
      });

      var backdrop =
        'blur(' + (blur / 2) + 'px) url(\'' + filterUrl + '\') blur(' + blur + 'px) brightness(' + brightness + ') saturate(' + saturate + ')';

      liquidGlass.style.backdropFilter = backdrop;
      liquidGlass.style.webkitBackdropFilter = backdrop;
      glassRoot.classList.remove('liquid-glass-fallback');
      glassRoot.classList.add('liquid-glass-ready');
    } else {
      var fallbackBlur = Math.max(12, Math.round(width / 18));
      liquidGlass.style.backdropFilter = 'blur(' + fallbackBlur + 'px) saturate(180%)';
      liquidGlass.style.webkitBackdropFilter = 'blur(' + fallbackBlur + 'px) saturate(180%)';
      glassRoot.classList.add('liquid-glass-fallback');
      glassRoot.classList.remove('liquid-glass-ready');
    }
  }

  function scheduleRedraw(glassRoot) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      redrawGlass(glassRoot);
    }, 80);
  }

  function initGlass(glassRoot) {
    redrawGlass(glassRoot);

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(function () {
        scheduleRedraw(glassRoot);
      }).observe(glassRoot);
    } else {
      window.addEventListener('resize', function () {
        scheduleRedraw(glassRoot);
      });
    }
  }

  function init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var header = document.querySelector('.header.liquid-glass');
    if (!header) return;

    initGlass(header);

    window.addEventListener('load', function () {
      redrawGlass(header);
    });

    document.addEventListener('workify:page-updated', function () {
      scheduleRedraw(header);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
