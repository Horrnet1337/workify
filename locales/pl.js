const buildLocale = require('./merge');
const ui = require('./pl-ui');
const group = require('./content/group-pl');
const services = require('../data/services');
const industries = require('../data/industries');
const faq = require('../data/faq');
const process = require('../data/process');
const locations = require('../data/locations');

const pick = (arr, keys) =>
  arr.map((item) =>
    keys.reduce((o, k) => {
      o[k] = item[k];
      return o;
    }, {})
  );

module.exports = buildLocale({
  code: 'pl',
  label: 'PL',
  name: 'Polski',
  flag: '🇵🇱',
  ui,
  meta: {
    home: {
      title: 'Workify — Agencja Pracy dla Firm',
      description:
        'Workify dostarcza wykwalifikowany personel na magazyny, fabryki, budowy i roboty drogowe w Polsce i Niemczech.',
    },
    about: {
      title: 'O nas — Workify',
      description:
        'Poznaj Workify — agencję pracy tymczasowej specjalizującą się w dostarczaniu personelu dla firm w Polsce i Niemczech.',
    },
    services: {
      title: 'Usługi — Workify',
      description:
        'Leasing pracowniczy, rekrutacja stała, outsourcing kadrowy i personel projektowy — kompleksowe rozwiązania kadrowe Workify.',
    },
    industries: {
      title: 'Branże — Workify',
      description:
        'Personel dla magazynów, fabryk, budownictwa, robót drogowych i wielu innych branż w Polsce i Niemczech.',
    },
    locations: {
      title: 'Lokalizacje — Workify',
      description:
        'Workify działa w Polsce i Niemczech — Warszawa, Berlin, Monachium i inne kluczowe regiony przemysłowe.',
    },
    process: {
      title: 'Jak działamy — Workify',
      description:
        'Proces współpracy z Workify — od analizy potrzeb po wdrożenie personelu w 5 prostych krokach.',
    },
    faq: {
      title: 'FAQ — Workify',
      description: 'Najczęściej zadawane pytania o współpracę z agencją pracy Workify.',
    },
    contact: {
      title: 'Kontakt — Workify',
      description:
        'Skontaktuj się z Workify — przygotujemy ofertę dopasowaną do Twoich potrzeb kadrowych.',
    },
    facades: {
      title: 'Fasady — Workify',
      description:
        'Kompleksowe rozwiązania elewacyjne grupy Workify — projekt, wykonanie i serwis fasad w Polsce i Niemczech.',
    },
    wholesale: {
      title: 'Hurtownia — Workify',
      description:
        'Hurtownia materiałów budowlanych i elewacyjnych Workify — dostawy w Polsce i Niemczech.',
    },
    cooperation: {
      title: 'Współpraca — Workify',
      description:
        'Modele współpracy B2B i outsourcing procesów w grupie Workify.',
    },
    notFound: {
      title: 'Nie znaleziono — Workify',
      description: 'Strona, której szukasz, nie istnieje.',
    },
  },
  site: {
    tagline: 'Grupa spółek — kadry, fasady i materiały dla firm',
    description:
      'Workify to grupa spółek działająca w Polsce i Niemczech: agencja pracy, rekrutacja, outsourcing, fasady i hurtownia materiałów.',
    nav: [
      { label: 'O nas', href: '/o-nas', id: 'about' },
      { label: 'Usługi', href: '/uslugi', id: 'services' },
      { label: 'Fasady', href: '/fasady', id: 'facades' },
      { label: 'Hurtownia', href: '/hurtownia', id: 'wholesale' },
      { label: 'Współpraca', href: '/wspolpraca', id: 'cooperation' },
      { label: 'Branże', href: '/branze', id: 'industries' },
      { label: 'Lokalizacje', href: '/lokalizacje', id: 'locations' },
    ],
    stats: [
      { value: '500+', label: 'Zatrudnionych pracowników rocznie' },
      { value: '120+', label: 'Firm partnerskich' },
      { value: '2', label: 'Kraje — Polska i Niemcy' },
      { value: '48h', label: 'Średni czas dostarczenia personelu' },
    ],
    contact: {
      hours: 'Pon–Pt, 8:00–17:00',
      address: {
        pl: 'ul. Przykładowa 12, 00-001 Warszawa, Polska',
        de: 'Musterstraße 8, 10115 Berlin, Niemcy',
      },
    },
  },
  validation: {
    name: 'Podaj imię i nazwisko.',
    company: 'Podaj nazwę firmy.',
    email: 'Podaj prawidłowy adres e-mail.',
    message: 'Napisz wiadomość.',
  },
  services: pick(services, ['title', 'shortDesc', 'desc', 'benefits']),
  industries: pick(industries, ['title', 'shortDesc', 'desc', 'roles']),
  faq: pick(faq, ['q', 'a']),
  process: pick(process, ['title', 'desc']),
  locations: {
    pl: pick([locations.pl], ['name', 'desc', 'address'])[0],
    de: pick([locations.de], ['name', 'desc', 'address'])[0],
  },
  divisions: group.divisions,
  facades: group.facades,
  wholesale: group.wholesale,
  cooperation: group.cooperation,
});
