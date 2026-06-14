(function () {
  'use strict';

  function initLocationsMap() {
    const mapEl = document.getElementById('locations-map');
    const dataEl = document.getElementById('locations-map-data');

    if (!mapEl || !dataEl || typeof L === 'undefined') return;

    if (mapEl._leafletMap) {
      mapEl._leafletMap.remove();
      mapEl._leafletMap = null;
    }

    let markers;
    try {
      markers = JSON.parse(dataEl.textContent);
    } catch (e) {
      return;
    }

    const map = L.map(mapEl, {
      scrollWheelZoom: false,
      zoomControl: true,
    });

    mapEl._leafletMap = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    function createIcon(label) {
      return L.divIcon({
        className: 'locations-map-marker',
        html: '<span class="locations-map-marker__dot"></span><span class="locations-map-marker__label">' + label + '</span>',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -22],
      });
    }

    const leafletMarkers = {};
    const bounds = L.latLngBounds([]);

    markers.forEach(function (item) {
      const marker = L.marker([item.lat, item.lng], {
        icon: createIcon(item.code),
        title: item.city,
      }).addTo(map);

      marker.bindPopup(
        '<div class="locations-map-popup">' +
          '<strong>' + item.flag + ' ' + item.name + '</strong>' +
          '<span>' + item.city + '</span>' +
          '<em>' + item.address + '</em>' +
        '</div>'
      );

      leafletMarkers[item.id] = marker;
      bounds.extend([item.lat, item.lng]);
    });

    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 6 });

    document.querySelectorAll('[data-map-target]').forEach(function (card) {
      function focusMarker() {
        const id = card.getAttribute('data-map-target');
        const marker = leafletMarkers[id];
        if (!marker) return;

        map.setView(marker.getLatLng(), 8, { animate: true });
        marker.openPopup();
      }

      card.addEventListener('click', focusMarker);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          focusMarker();
        }
      });
    });

    mapEl.addEventListener('mouseenter', function () {
      map.scrollWheelZoom.enable();
    });

    mapEl.addEventListener('mouseleave', function () {
      map.scrollWheelZoom.disable();
    });
  }

  initLocationsMap();
  document.addEventListener('workify:page-updated', initLocationsMap);
})();
