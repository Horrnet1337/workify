const baseSite = require('../config/site');
const { detectLocale, getLocale, i18n } = require('../locales');

function setLangCookie(res, lang) {
  res.setHeader(
    'Set-Cookie',
    `${i18n.cookieName}=${encodeURIComponent(lang)}; Path=/; Max-Age=31536000; SameSite=Lax`
  );
}

function buildSite(loc) {
  return {
    name: baseSite.name,
    url: baseSite.url,
    credit: baseSite.credit,
    tagline: loc.site.tagline,
    description: loc.site.description,
    nav: loc.site.nav,
    stats: loc.site.stats,
    contact: {
      ...baseSite.contact,
      hours: loc.site.contact.hours,
      address: loc.site.contact.address,
    },
  };
}

module.exports = function localeMiddleware(req, res, next) {
  const lang = detectLocale(req);
  const loc = getLocale(lang);

  if (req.query.lang && i18n.supported.some((l) => l.code === req.query.lang)) {
    setLangCookie(res, req.query.lang);
  }

  req.lang = lang;
  req.loc = loc;

  res.locals.lang = lang;
  res.locals.loc = loc;
  res.locals.ui = loc.ui;
  res.locals.site = buildSite(loc);
  res.locals.langs = i18n.supported;
  res.locals.currentLang = i18n.supported.find((l) => l.code === lang) || i18n.supported[0];
  res.locals.langSwitch = (code) => `/lang/${code}?r=${encodeURIComponent(req.originalUrl.split('?')[0])}`;

  next();
};

module.exports.setLangCookie = setLangCookie;
