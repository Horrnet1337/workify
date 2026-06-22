const express = require('express');
const { codes } = require('../locales');
const { setLangCookie } = require('../middleware/locale');

const router = express.Router();

function renderPage(req, res, view, options = {}) {
  res.render('layouts/main', {
    bodyPartial: view,
    ...options,
  });
}

function renderNotFound(req, res) {
  const loc = req.loc;
  res.status(404).render('layouts/main', {
    bodyPartial: '404',
    title: loc.meta.notFound.title,
    pageId: '404',
    metaDescription: loc.meta.notFound.description,
  });
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
  });
});

router.get('/uslugi', (req, res) => {
  const loc = req.loc;
  renderPage(req, res, 'services', {
    title: loc.meta.services.title,
    pageId: 'services',
    metaDescription: loc.meta.services.description,
  });
});

router.get('/fasady', (req, res) => {
  const loc = req.loc;
  renderPage(req, res, 'facades', {
    title: loc.meta.facades.title,
    pageId: 'facades',
    metaDescription: loc.meta.facades.description,
  });
});

router.get('/hurtownia', (req, res) => {
  const loc = req.loc;
  renderPage(req, res, 'wholesale', {
    title: loc.meta.wholesale.title,
    pageId: 'wholesale',
    metaDescription: loc.meta.wholesale.description,
  });
});

router.get('/wspolpraca', (req, res) => {
  const loc = req.loc;
  renderPage(req, res, 'cooperation', {
    title: loc.meta.cooperation.title,
    pageId: 'cooperation',
    metaDescription: loc.meta.cooperation.description,
  });
});

router.get('/partnerzy', (req, res) => {
  const loc = req.loc;
  renderPage(req, res, 'partners', {
    title: loc.meta.partners.title,
    pageId: 'partners',
    metaDescription: loc.meta.partners.description,
  });
});

router.use((req, res) => renderNotFound(req, res));

module.exports = router;
