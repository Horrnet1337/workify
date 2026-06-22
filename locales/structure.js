// Language-neutral structure: ids, icons, images, hrefs.
// Localized text lives in locales/{ru,en,de,pl}.js and is merged by id.

module.exports = {
  nav: [
    { id: 'home', href: '/' },
    { id: 'services', href: '/uslugi' },
    { id: 'facades', href: '/fasady' },
    { id: 'wholesale', href: '/hurtownia' },
    { id: 'cooperation', href: '/wspolpraca' },
    { id: 'partners', href: '/partnerzy' },
  ],

  divisions: [
    { id: 'agency', icon: 'users', href: '/uslugi' },
    { id: 'temporary', icon: 'clock', href: '/uslugi' },
    { id: 'recruitment', icon: 'search', href: '/uslugi' },
    { id: 'outsourcing', icon: 'workflow', href: '/wspolpraca' },
    { id: 'facades', icon: 'layers', href: '/fasady' },
    { id: 'wholesale', icon: 'package', href: '/hurtownia' },
  ],

  facades: [
    { id: 'ventilated', icon: 'layers' },
    { id: 'etics', icon: 'shield' },
    { id: 'clinker', icon: 'brick' },
    { id: 'glass', icon: 'glass' },
    { id: 'composite', icon: 'panel' },
    { id: 'wood', icon: 'leaf' },
    { id: 'stone', icon: 'gem' },
    { id: 'metal', icon: 'grid' },
  ],

  materials: [
    { id: 'facade', icon: 'layers' },
    { id: 'insulation', icon: 'shield' },
    { id: 'fixings', icon: 'wrench' },
    { id: 'composite', icon: 'panel' },
    { id: 'profiles', icon: 'grid' },
    { id: 'chemistry', icon: 'flask' },
  ],

  cooperation: [
    { id: 'process', icon: 'workflow' },
    { id: 'temporary', icon: 'clock' },
    { id: 'leasing', icon: 'users' },
    { id: 'project', icon: 'target' },
    { id: 'permanent', icon: 'search' },
    { id: 'managed', icon: 'handshake' },
  ],

  niches: [
    { id: 'logistics', icon: 'truck', companies: ['dhl', 'dpd', 'inpost'] },
    { id: 'manufacturing', icon: 'factory', companies: ['orlen', 'amazon'] },
    { id: 'construction', icon: 'building', companies: [] },
    { id: 'retail', icon: 'store', companies: ['biedronka', 'lidl', 'kaufland', 'zabka'] },
    { id: 'ecommerce', icon: 'cart', companies: ['allegro', 'amazon'] },
    { id: 'facade', icon: 'layers', companies: [] },
  ],

  // Templated, well-known brands (logos in /public/images/clients).
  clients: [
    'allegro', 'amazon', 'biedronka', 'dhl', 'dpd',
    'inpost', 'kaufland', 'lidl', 'orlen', 'zabka',
  ],

  cities: ['warszawa', 'krakow', 'wroclaw', 'poznan', 'gdansk', 'lodz', 'katowice', 'szczecin'],
};
