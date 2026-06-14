const express = require('express');
const { body, validationResult } = require('express-validator');

const clients = require('../data/clients');
const { codes } = require('../locales');
const { setLangCookie } = require('../middleware/locale');

const router = express.Router();

function renderPage(req, res, view, options = {}) {
  res.render('layouts/main', {
    bodyPartial: view,
    ...options,
  });
}

function findBySlug(items, slug) {
  return items.find((item) => item.slug === slug);
}

function contactValidation(loc) {
  return [
    body('name').trim().notEmpty().withMessage(loc.validation.name).isLength({ max: 100 }),
    body('company').trim().notEmpty().withMessage(loc.validation.company).isLength({ max: 150 }),
    body('email').trim().isEmail().withMessage(loc.validation.email).normalizeEmail(),
    body('phone').optional({ checkFalsy: true }).trim().isLength({ max: 30 }),
    body('message').trim().notEmpty().withMessage(loc.validation.message).isLength({ max: 2000 }),
    body('service').optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  ];
}

router.get('/lang/:code', (req, res) => {
  const code = req.params.code;
  const redirect = req.query.r || '/';

  if (!codes.includes(code)) {
    return res.redirect(redirect);
  }

  setLangCookie(res, code);
  res.redirect(redirect);
});

router.get('/', (req, res) => {
  const loc = req.loc;
  renderPage(req, res, 'home', {
    title: loc.meta.home.title,
    pageId: 'home',
    metaDescription: loc.meta.home.description,
    services: loc.services.slice(0, 4),
    industries: loc.industries.slice(0, 4),
    clients,
    stats: res.locals.site.stats,
  });
});

router.get('/o-nas', (req, res) => {
  const loc = req.loc;
  renderPage(req, res, 'about', {
    title: loc.meta.about.title,
    pageId: 'about',
    metaDescription: loc.meta.about.description,
    stats: res.locals.site.stats,
    clients,
  });
});

router.get('/uslugi', (req, res) => {
  const loc = req.loc;
  renderPage(req, res, 'services', {
    title: loc.meta.services.title,
    pageId: 'services',
    metaDescription: loc.meta.services.description,
    services: loc.services,
  });
});

router.get('/uslugi/:slug', (req, res) => {
  const loc = req.loc;
  const service = findBySlug(loc.services, req.params.slug);

  if (!service) {
    return res.status(404).render('layouts/main', {
      bodyPartial: '404',
      title: loc.meta.notFound.title,
      pageId: '404',
      metaDescription: loc.meta.notFound.description,
    });
  }

  renderPage(req, res, 'service-detail', {
    title: `${service.title} — Workify`,
    pageId: 'services',
    metaDescription: service.shortDesc,
    service,
    related: loc.services.filter((s) => s.slug !== service.slug).slice(0, 2),
  });
});

router.get('/branze', (req, res) => {
  const loc = req.loc;
  renderPage(req, res, 'industries', {
    title: loc.meta.industries.title,
    pageId: 'industries',
    metaDescription: loc.meta.industries.description,
    industries: loc.industries,
  });
});

router.get('/branze/:slug', (req, res) => {
  const loc = req.loc;
  const industry = findBySlug(loc.industries, req.params.slug);

  if (!industry) {
    return res.status(404).render('layouts/main', {
      bodyPartial: '404',
      title: loc.meta.notFound.title,
      pageId: '404',
      metaDescription: loc.meta.notFound.description,
    });
  }

  renderPage(req, res, 'industry-detail', {
    title: `${industry.title} — Workify`,
    pageId: 'industries',
    metaDescription: industry.shortDesc,
    industry,
    related: loc.industries.filter((i) => i.slug !== industry.slug).slice(0, 3),
  });
});

router.get('/lokalizacje', (req, res) => {
  const loc = req.loc;
  renderPage(req, res, 'locations', {
    title: loc.meta.locations.title,
    pageId: 'locations',
    metaDescription: loc.meta.locations.description,
    locations: loc.locations,
    extraStyles: ['/vendor/leaflet/leaflet.css'],
    extraScripts: ['/vendor/leaflet/leaflet.js', '/js/locations-map.js'],
  });
});

router.get('/jak-dzialamy', (req, res) => {
  const loc = req.loc;
  renderPage(req, res, 'process', {
    title: loc.meta.process.title,
    pageId: 'process',
    metaDescription: loc.meta.process.description,
    steps: loc.process,
  });
});

router.get('/faq', (req, res) => {
  const loc = req.loc;
  renderPage(req, res, 'faq', {
    title: loc.meta.faq.title,
    pageId: 'faq',
    metaDescription: loc.meta.faq.description,
    faqItems: loc.faq,
  });
});

router.get('/kontakt', (req, res) => {
  const loc = req.loc;
  renderPage(req, res, 'contact', {
    title: loc.meta.contact.title,
    pageId: 'contact',
    metaDescription: loc.meta.contact.description,
    services: loc.services,
    sent: req.query.sent === '1',
    formData: {},
    errors: [],
  });
});

router.post('/kontakt', (req, res, next) => {
  const validators = contactValidation(req.loc);
  Promise.all(validators.map((v) => v.run(req)))
    .then(() => next())
    .catch(next);
}, (req, res) => {
  const loc = req.loc;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return renderPage(req, res, 'contact', {
      title: loc.meta.contact.title,
      pageId: 'contact',
      metaDescription: loc.meta.contact.description,
      services: loc.services,
      sent: false,
      formData: req.body,
      errors: errors.array(),
    });
  }

  console.log('[Kontakt]', {
    ...req.body,
    lang: req.lang,
    date: new Date().toISOString(),
  });

  res.redirect('/kontakt?sent=1');
});

router.use((req, res) => {
  const loc = req.loc;
  res.status(404).render('layouts/main', {
    bodyPartial: '404',
    title: loc.meta.notFound.title,
    pageId: '404',
    metaDescription: loc.meta.notFound.description,
  });
});

module.exports = router;
