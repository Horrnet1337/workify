(function () {
  'use strict';

  var FILTER_ID = 'workify-liquid-glass-filter';
  var HEADER_SELECTOR = '.header';
  var MAP_SCALE = 1;
  var CHANNEL_DEPTH = 127;
  var SAMPLES = 127;
  var resizeTimer;

  function convexSquircle(x) {
    return Math.pow(1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 4), 0.25);
  }

  function squirclePrime(x) {
    var d = 0.001;
    var x1 = Math.max(0, x - d);
    var x2 = Math.min(1, x + d);
    return (convexSquircle(x2) - convexSquircle(x1)) / (x2 - x1);
  }

  function buildDispLUT() {
    var lut = new Float32Array(SAMPLES + 1);
    var maxDisp = 0;

    for (var i = 0; i <= SAMPLES; i++) {
      var x = i / SAMPLES;
      var slope = squirclePrime(x);
      var d = slope / (1 + slope * slope);
      lut[i] = d;
      if (d > maxDisp) maxDisp = d;
    }

    for (var j = 0; j <= SAMPLES; j++) lut[j] /= maxDisp || 1;
    return lut;
  }

  var DISP_LUT = buildDispLUT();

  function sampleDispLUT(t) {
    var idx = Math.min(SAMPLES, Math.max(0, Math.floor(t * SAMPLES)));
    return DISP_LUT[idx];
  }

  function sdfRoundedRect(px, py, w, h, r) {
    var cx = w / 2;
    var cy = h / 2;
    var qx = Math.abs(px - cx) - cx + r;
    var qy = Math.abs(py - cy) - cy + r;
    var outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
    var inside = Math.min(Math.max(qx, qy), 0);
    return outside + inside - r;
  }

  function sdfGradient(px, py, w, h, r) {
    var e = 0.75;
    var dx = sdfRoundedRect(px + e, py, w, h, r) - sdfRoundedRect(px - e, py, w, h, r);
    var dy = sdfRoundedRect(px, py + e, w, h, r) - sdfRoundedRect(px, py - e, w, h, r);
    var mag = Math.hypot(dx, dy) || 1;
    return { x: dx / mag, y: dy / mag };
  }

  function HeaderLiquidGlass(header) {
    this.header = header;
    this.width = 0;
    this.height = 0;
    this.dispCanvas = document.createElement('canvas');
    this.specCanvas = document.createElement('canvas');
    this.dispCtx = this.dispCanvas.getContext('2d', { willReadFrequently: true });
    this.specCtx = this.specCanvas.getContext('2d', { willReadFrequently: true });
    this.buildSvg();
  }

  HeaderLiquidGlass.prototype.buildSvg = function () {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';

    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    var filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', FILTER_ID);
    filter.setAttribute('filterUnits', 'userSpaceOnUse');
    filter.setAttribute('color-interpolation-filters', 'sRGB');

    this.feImageDisp = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
    this.feImageDisp.setAttribute('result', 'displacement_map');

    this.feImageSpec = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
    this.feImageSpec.setAttribute('result', 'specular_map');

    this.feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
    this.feDisplacementMap.setAttribute('in', 'SourceGraphic');
    this.feDisplacementMap.setAttribute('in2', 'displacement_map');
    this.feDisplacementMap.setAttribute('xChannelSelector', 'R');
    this.feDisplacementMap.setAttribute('yChannelSelector', 'G');
    this.feDisplacementMap.setAttribute('result', 'refracted');

    this.feBlend = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
    this.feBlend.setAttribute('in', 'refracted');
    this.feBlend.setAttribute('in2', 'specular_map');
    this.feBlend.setAttribute('mode', 'screen');

    this.filter = filter;
    filter.appendChild(this.feImageDisp);
    filter.appendChild(this.feImageSpec);
    filter.appendChild(this.feDisplacementMap);
    filter.appendChild(this.feBlend);
    defs.appendChild(filter);
    svg.appendChild(defs);
    document.body.appendChild(svg);
    this.svg = svg;
  };

  HeaderLiquidGlass.prototype.measure = function () {
    var rect = this.header.getBoundingClientRect();
    this.width = Math.max(1, Math.round(rect.width));
    this.height = Math.max(1, Math.round(rect.height));

    this.filter.setAttribute('x', '0');
    this.filter.setAttribute('y', '0');
    this.filter.setAttribute('width', String(this.width));
    this.filter.setAttribute('height', String(this.height));

    this.feImageDisp.setAttribute('width', String(this.width));
    this.feImageDisp.setAttribute('height', String(this.height));
    this.feImageSpec.setAttribute('width', String(this.width));
    this.feImageSpec.setAttribute('height', String(this.height));
  };

  HeaderLiquidGlass.prototype.updateMaps = function () {
    if (!this.width || !this.height) return;

    var w = Math.max(1, Math.round(this.width * MAP_SCALE));
    var h = Math.max(1, Math.round(this.height * MAP_SCALE));
    this.dispCanvas.width = w;
    this.dispCanvas.height = h;
    this.specCanvas.width = w;
    this.specCanvas.height = h;

    var radius = Math.min(12, h / 2 - 1);
    var bezel = Math.min(36, Math.max(22, Math.round(h * 0.42)));
    var scale = bezel * 1.15;

    var lightX = Math.cos(-Math.PI / 3);
    var lightY = Math.sin(-Math.PI / 3);

    var dispData = new Uint8ClampedArray(w * h * 4);
    var specData = new Uint8ClampedArray(w * h * 4);

    for (var py = 0; py < h; py++) {
      for (var px = 0; px < w; px++) {
        var idx = (py * w + px) * 4;
        var sdf = sdfRoundedRect(px + 0.5, py + 0.5, w, h, radius);
        var dist = -sdf;

        var r = 128;
        var g = 128;
        var sr = 0;
        var sg = 0;
        var sb = 0;
        var sa = 0;

        if (dist > 0 && dist < bezel) {
          var t = dist / bezel;
          var mag = sampleDispLUT(t);
          var n = sdfGradient(px + 0.5, py + 0.5, w, h, radius);
          var dx = -n.x * mag;
          var dy = -n.y * mag;

          r = Math.round(128 + dx * CHANNEL_DEPTH);
          g = Math.round(128 + dy * CHANNEL_DEPTH);
          r = Math.max(0, Math.min(255, r));
          g = Math.max(0, Math.min(255, g));

          var inNorm = { x: -n.x, y: -n.y };
          var rim = Math.pow(1 - t, 1.6);
          var spec = Math.max(0, inNorm.x * lightX + inNorm.y * lightY) * rim;
          var edgeBoost = Math.pow(1 - t, 3) * 0.55;
          var intensity = Math.min(1, spec * 0.92 + edgeBoost);
          var v = Math.round(intensity * 255);
          sr = v;
          sg = v;
          sb = v;
          sa = Math.round(intensity * 200);
        }

        dispData[idx] = r;
        dispData[idx + 1] = g;
        dispData[idx + 2] = 128;
        dispData[idx + 3] = 255;

        specData[idx] = sr;
        specData[idx + 1] = sg;
        specData[idx + 2] = sb;
        specData[idx + 3] = sa;
      }
    }

    this.dispCtx.putImageData(new ImageData(dispData, w, h), 0, 0);
    this.specCtx.putImageData(new ImageData(specData, w, h), 0, 0);

    this.feImageDisp.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'href',
      this.dispCanvas.toDataURL('image/png')
    );
    this.feImageSpec.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'href',
      this.specCanvas.toDataURL('image/png')
    );
    this.feDisplacementMap.setAttribute('scale', String(scale));
  };

  HeaderLiquidGlass.prototype.refresh = function () {
    this.measure();
    this.updateMaps();
    this.header.classList.add('liquid-glass-ready');
  };

  function scheduleRefresh(instance) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      instance.refresh();
    }, 100);
  }

  function init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var header = document.querySelector(HEADER_SELECTOR);
    if (!header || !document.querySelector('.header__glass')) return;

    var instance = new HeaderLiquidGlass(header);
    instance.refresh();

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(function () {
        scheduleRefresh(instance);
      }).observe(header);
    } else {
      window.addEventListener('resize', function () {
        scheduleRefresh(instance);
      });
    }

    window.addEventListener('load', function () {
      instance.refresh();
    });

    document.addEventListener('workify:page-updated', function () {
      scheduleRefresh(instance);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
