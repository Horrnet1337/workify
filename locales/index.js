const i18n = require('../config/i18n');
const pl = require('./pl');
const de = require('./de');
const ru = require('./ru');
const ua = require('./ua');

const locales = { pl, de, ru, ua };
const codes = i18n.supported.map((l) => l.code);

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
      return { lang: lang === 'uk' ? 'ua' : lang, q: qPart ? parseFloat(qPart) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  return parsed.find((item) => codes.includes(item.lang))?.lang || null;
}

function detectLocale(req) {
  const queryLang = req.query.lang;
  if (queryLang && codes.includes(queryLang)) {
    return queryLang;
  }

  const cookieLang = getCookie(req, i18n.cookieName);
  if (cookieLang && codes.includes(cookieLang)) {
    return cookieLang;
  }

  const acceptLang = parseAcceptLanguage(req.headers['accept-language']);
  if (acceptLang) {
    return acceptLang;
  }

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
