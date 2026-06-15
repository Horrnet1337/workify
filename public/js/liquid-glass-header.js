(function () {
  'use strict';

  var FILTER_ID = 'workify-liquid-glass-filter';
  var MAP_ID = 'workify-liquid-glass-map';
  var HEADER_SELECTOR = '.header';
  var GLASS_SELECTOR = '.header__glass';
  var MAP_SCALE = 0.75;
  var resizeTimer;

  function smoothStep(edge0, edge1, x) {
    var t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  function vecLength(x, y) {
    return Math.sqrt(x * x + y * y);
  }

  function roundedRectSDF(x, y, halfW, halfH, radius) {
    var qx = Math.abs(x) - halfW + radius;
    var qy = Math.abs(y) - halfH + radius;
    return Math.min(Math.max(qx, qy), 0) + vecLength(Math.max(qx, 0), Math.max(qy, 0)) - radius;
  }

  function sampleFragment(uv, halfW, halfH, radius, bezel) {
    var ix = uv.x - 0.5;
    var iy = uv.y - 0.5;
    var distanceToEdge = roundedRectSDF(ix, iy, halfW, halfH, radius);
    var displacement = smoothStep(0.04, -bezel, distanceToEdge);
    var scaled = smoothStep(0, 1, displacement);
    var factor = 1 - scaled * 0.11;
    return {
      x: ix * factor + 0.5,
      y: iy * factor + 0.5,
    };
  }

  function HeaderLiquidGlass(header, glass) {
    this.header = header;
    this.glass = glass;
    this.width = 0;
    this.height = 0;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d', { willReadFrequently: true });
    this.svg = null;
    this.feImage = null;
    this.feDisplacementMap = null;
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

    this.feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
    this.feImage.setAttribute('id', MAP_ID);
    this.feImage.setAttribute('result', 'displacement_map');

    this.feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
    this.feDisplacementMap.setAttribute('in', 'SourceGraphic');
    this.feDisplacementMap.setAttribute('in2', 'displacement_map');
    this.feDisplacementMap.setAttribute('xChannelSelector', 'R');
    this.feDisplacementMap.setAttribute('yChannelSelector', 'G');

    this.filter = filter;
    filter.appendChild(this.feImage);
    filter.appendChild(this.feDisplacementMap);
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

    this.feImage.setAttribute('width', String(this.width));
    this.feImage.setAttribute('height', String(this.height));
  };

  HeaderLiquidGlass.prototype.updateDisplacementMap = function () {
    if (!this.width || !this.height) return;

    var w = Math.max(1, Math.round(this.width * MAP_SCALE));
    var h = Math.max(1, Math.round(this.height * MAP_SCALE));
    this.canvas.width = w;
    this.canvas.height = h;

    var halfW = 0.47;
    var halfH = 0.44;
    var radius = Math.min(halfW, halfH) * 0.92;
    var bezel = 0.14;

    var data = new Uint8ClampedArray(w * h * 4);
    var rawValues = [];
    var maxScale = 0;

    for (var i = 0; i < data.length; i += 4) {
      var x = (i / 4) % w;
      var y = Math.floor(i / 4 / w);
      var pos = sampleFragment({ x: x / w, y: y / h }, halfW, halfH, radius, bezel);
      var dx = pos.x * w - x;
      var dy = pos.y * h - y;
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      rawValues.push(dx, dy);
    }

    maxScale = Math.max(maxScale * 0.55, 1);
    var index = 0;

    for (var j = 0; j < data.length; j += 4) {
      var r = rawValues[index++] / maxScale + 0.5;
      var g = rawValues[index++] / maxScale + 0.5;
      data[j] = r * 255;
      data[j + 1] = g * 255;
      data[j + 2] = 128;
      data[j + 3] = 255;
    }

    this.context.putImageData(new ImageData(data, w, h), 0, 0);
    this.feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.canvas.toDataURL('image/png'));
    this.feDisplacementMap.setAttribute('scale', String(maxScale / MAP_SCALE));
  };

  HeaderLiquidGlass.prototype.refresh = function () {
    this.measure();
    this.updateDisplacementMap();
    this.header.classList.add('liquid-glass-ready');
  };

  HeaderLiquidGlass.prototype.destroy = function () {
    if (this.svg) this.svg.remove();
    this.header.classList.remove('liquid-glass-ready');
  };

  function scheduleRefresh(instance) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      instance.refresh();
    }, 120);
  }

  function init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var header = document.querySelector(HEADER_SELECTOR);
    var glass = document.querySelector(GLASS_SELECTOR);
    if (!header || !glass) return;

    var instance = new HeaderLiquidGlass(header, glass);
    instance.refresh();

    if (typeof ResizeObserver !== 'undefined') {
      var observer = new ResizeObserver(function () {
        scheduleRefresh(instance);
      });
      observer.observe(header);
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
