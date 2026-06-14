module.exports = {
  name: 'Workify',
  tagline: 'Agencja pracy tymczasowej dla firm',
  description:
    'Workify dostarcza wykwalifikowany personel na magazyny, fabryki, budowy i roboty drogowe w Polsce i Niemczech.',
  url: process.env.SITE_URL || 'http://localhost:3000',
  contact: {
    email: 'kontakt@workify.pl',
    phone: '+48 123 456 789',
    phoneDisplay: '+48 123 456 789',
    address: {
      pl: 'ul. Przykładowa 12, 00-001 Warszawa, Polska',
      de: 'Musterstraße 8, 10115 Berlin, Niemcy',
    },
    hours: 'Pon–Pt, 8:00–17:00',
  },
  nav: [
    { label: 'O nas', href: '/o-nas', id: 'about' },
    { label: 'Usługi', href: '/uslugi', id: 'services' },
    { label: 'Branże', href: '/branze', id: 'industries' },
    { label: 'Lokalizacje', href: '/lokalizacje', id: 'locations' },
  ],
  stats: [
    { value: '500+', label: 'Zatrudnionych pracowników rocznie' },
    { value: '120+', label: 'Firm partnerskich' },
    { value: '2', label: 'Kraje — Polska i Niemcy' },
    { value: '48h', label: 'Średni czas dostarczenia personelu' },
  ],
  credit: {
    name: 'Kappa Studio',
    url: 'https://kappastudio.pl',
  },
};
