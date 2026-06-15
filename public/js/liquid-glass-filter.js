/**
 * Liquid glass displacement filters (MIT — adapted from nikdelvin/liquid-glass).
 * https://github.com/nikdelvin/liquid-glass
 */
(function (global) {
  'use strict';

  function getDisplacementMap(opts) {
    var height = opts.height;
    var width = opts.width;
    var radius = opts.radius;
    var depth = opts.depth;
    var y1 = Math.ceil((radius / height) * 15);
    var y2 = Math.floor(100 - (radius / height) * 15);
    var x1 = Math.ceil((radius / width) * 15);
    var x2 = Math.floor(100 - (radius / width) * 15);

    var svg =
      '<svg height="' + height + '" width="' + width + '" viewBox="0 0 ' + width + ' ' + height + '" xmlns="http://www.w3.org/2000/svg">' +
      '<style>.mix { mix-blend-mode: screen; }</style>' +
      '<defs>' +
      '<linearGradient id="Y" x1="0" x2="0" y1="' + y1 + '%" y2="' + y2 + '%">' +
      '<stop offset="0%" stop-color="#0F0" /><stop offset="100%" stop-color="#000" />' +
      '</linearGradient>' +
      '<linearGradient id="X" x1="' + x1 + '%" x2="' + x2 + '%" y1="0" y2="0">' +
      '<stop offset="0%" stop-color="#F00" /><stop offset="100%" stop-color="#000" />' +
      '</linearGradient>' +
      '</defs>' +
      '<rect x="0" y="0" height="' + height + '" width="' + width + '" fill="#808080" />' +
      '<g filter="blur(2px)">' +
      '<rect x="0" y="0" height="' + height + '" width="' + width + '" fill="#000080" />' +
      '<rect x="0" y="0" height="' + height + '" width="' + width + '" fill="url(#Y)" class="mix" />' +
      '<rect x="0" y="0" height="' + height + '" width="' + width + '" fill="url(#X)" class="mix" />' +
      '<rect x="' + depth + '" y="' + depth + '" height="' + (height - 2 * depth) + '" width="' + (width - 2 * depth) + '" fill="#808080" rx="' + radius + '" ry="' + radius + '" filter="blur(' + depth + 'px)" />' +
      '</g></svg>';

    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function getDisplacementFilter(opts) {
    var height = opts.height;
    var width = opts.width;
    var radius = opts.radius;
    var depth = opts.depth;
    var strength = opts.strength != null ? opts.strength : 100;
    var chromaticAberration = opts.chromaticAberration != null ? opts.chromaticAberration : 0;
    var mapHref = getDisplacementMap({ height: height, width: width, radius: radius, depth: depth });
    var scaleR = strength + chromaticAberration * 2;
    var scaleG = strength + chromaticAberration;
    var scaleB = strength;

    var svg =
      '<svg height="' + height + '" width="' + width + '" viewBox="0 0 ' + width + ' ' + height + '" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<filter id="displace" color-interpolation-filters="sRGB">' +
      '<feImage x="0" y="0" height="' + height + '" width="' + width + '" href="' + mapHref + '" result="displacementMap" />' +
      '<feDisplacementMap transform-origin="center" in="SourceGraphic" in2="displacementMap" scale="' + scaleR + '" xChannelSelector="R" yChannelSelector="G" />' +
      '<feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedR" />' +
      '<feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="' + scaleG + '" xChannelSelector="R" yChannelSelector="G" />' +
      '<feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedG" />' +
      '<feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="' + scaleB + '" xChannelSelector="R" yChannelSelector="G" />' +
      '<feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="displacedB" />' +
      '<feBlend in="displacedR" in2="displacedG" mode="screen" />' +
      '<feBlend in2="displacedB" mode="screen" />' +
      '</filter></defs></svg>';

    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg) + '#displace';
  }

  global.WorkifyLiquidGlass = {
    getDisplacementFilter: getDisplacementFilter,
  };
})(typeof window !== 'undefined' ? window : this);
