const i18n = require('../config/i18n');
const structure = require('./structure');

const ru = require('./ru');
const en = require('./en');
const de = require('./de');
const pl = require('./pl');

const codes = i18n.supported.map((l) => l.code);

function mergeById(items, dict = {}) {
  return items.map((item) => ({ ...item, ...(dict[item.id] || {}) }));
}

function buildLocale(text) {
  return {
    ...text,
    nav: structure.nav.map((n) => ({ ...n, label: text.navLabels[n.id] })),
    divisions: mergeById(structure.divisions, text.divisions),
    facades: mergeById(structure.facades, text.facades),
    materials: mergeById(structure.materials, text.materials),
    cooperation: mergeById(structure.cooperation, text.cooperation),
    niches: mergeById(structure.niches, text.niches),
    clients: structure.clients,
    cities: structure.cities.map((id) => ({ id, name: text.cities[id] })),
  };
}

const locales = {
  ru: buildLocale(ru),
  en: buildLocale(en),
  de: buildLocale(de),
  pl: buildLocale(pl),
};

function getCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return null;
  const match = header.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function parseAcceptLanguage(header) {
  if (!header) return null;
  const parsed = header
    .split(',')
    .map((part) => {
      const [langPart, qPart] = part.trim().split(';q=');
      const lang = langPart.split('-')[0].toLowerCase();
      return { lang: lang === 'uk' ? 'ru' : lang, q: qPart ? parseFloat(qPart) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return parsed.find((item) => codes.includes(item.lang))?.lang || null;
}

function detectLocale(req) {
  const queryLang = req.query.lang;
  if (queryLang && codes.includes(queryLang)) return queryLang;

  const cookieLang = getCookie(req, i18n.cookieName);
  if (cookieLang && codes.includes(cookieLang)) return cookieLang;

  const acceptLang = parseAcceptLanguage(req.headers['accept-language']);
  if (acceptLang) return acceptLang;

  return i18n.defaultLocale;
}

function getLocale(lang) {
  return locales[lang] || locales[i18n.defaultLocale];
}

module.exports = {
  i18n,
  locales,
  codes,
  detectLocale,
  getLocale,
};
