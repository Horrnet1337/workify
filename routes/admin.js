const express = require('express');
const { listLeads, deleteLead, countLeads } = require('../lib/leadsStore');
const {
  isAdmin,
  requireAdmin,
  setSessionCookie,
  clearSessionCookie,
  verifyPassword,
} = require('../middleware/adminAuth');

const router = express.Router();

function renderAdmin(res, view, options = {}) {
  res.render(`layouts/admin`, {
    bodyPartial: view,
    ...options,
  });
}

router.get('/admin/login', (req, res) => {
  if (isAdmin(req)) return res.redirect('/admin');
  renderAdmin(res, 'admin-login', {
    title: 'Logowanie — Panel Workify',
    error: null,
  });
});

router.post('/admin/login', (req, res) => {
  const password = req.body.password || '';

  if (!verifyPassword(password)) {
    return renderAdmin(res, 'admin-login', {
      title: 'Logowanie — Panel Workify',
      error: 'Nieprawidłowe hasło.',
    });
  }

  setSessionCookie(res);
  res.redirect('/admin');
});

router.post('/admin/logout', requireAdmin, (req, res) => {
  clearSessionCookie(res);
  res.redirect('/admin/login');
});

router.get('/admin', requireAdmin, async (req, res, next) => {
  try {
    const leads = await listLeads();
    renderAdmin(res, 'admin', {
      title: 'Panel zapytań — Workify',
      leads,
      total: leads.length,
      deleted: req.query.deleted === '1',
    });
  } catch (err) {
    next(err);
  }
});

router.post('/admin/leads/:id/delete', requireAdmin, async (req, res, next) => {
  try {
    await deleteLead(req.params.id);
    res.redirect('/admin?deleted=1');
  } catch (err) {
    next(err);
  }
});

router.get('/admin/api/leads/count', requireAdmin, async (req, res, next) => {
  try {
    const total = await countLeads();
    res.json({ total });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
