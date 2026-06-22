const express = require('express');
const {
  STATUSES,
  DIVISIONS,
  listLeads,
  getLead,
  updateLead,
  addNote,
  deleteLead,
  getStats,
} = require('../lib/crmStore');
const {
  isAdmin,
  requireAdmin,
  setSessionCookie,
  clearSessionCookie,
  verifyPassword,
} = require('../middleware/adminAuth');

const router = express.Router();

function renderAdmin(req, res, view, options = {}) {
  const ui = res.locals.ui || {};
  const crm = ui.crm || {};
  res.render('layouts/admin', {
    bodyPartial: view,
    crm,
    statusLabels: {
      new: crm.statusNew || 'Nowy',
      contacted: crm.statusContacted || 'Kontakt',
      qualified: crm.statusQualified || 'Kwalifikacja',
      offer: crm.statusOffer || 'Oferta',
      won: crm.statusWon || 'Wygrany',
      lost: crm.statusLost || 'Utracony',
    },
    divisionLabels: {
      kadry: crm.divisionKadry || 'Kadry',
      rekrutacja: crm.divisionRekrutacja || 'Rekrutacja',
      outsourcing: crm.divisionOutsourcing || 'Outsourcing',
      fasady: crm.divisionFasady || 'Fasady',
      hurtownia: crm.divisionHurtownia || 'Hurtownia',
      inne: crm.divisionInne || 'Inne',
    },
    ...options,
  });
}

router.get('/admin/login', (req, res) => {
  if (isAdmin(req)) return res.redirect('/admin');
  renderAdmin(req, res, 'admin-login', {
    title: 'Logowanie — CRM Workify',
    error: null,
  });
});

router.post('/admin/login', (req, res) => {
  const password = req.body.password || '';

  if (!verifyPassword(password)) {
    return renderAdmin(req, res, 'admin-login', {
      title: 'Logowanie — CRM Workify',
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
    const filters = {
      q: req.query.q || '',
      division: req.query.division || '',
      status: req.query.status || '',
    };
    const leads = await listLeads(filters);
    const stats = await getStats();
    const kanban = STATUSES.reduce((acc, status) => {
      acc[status] = leads.filter((l) => l.status === status);
      return acc;
    }, {});

    renderAdmin(req, res, 'admin-crm', {
      title: 'CRM — Workify',
      leads,
      kanban,
      stats,
      filters,
      statuses: STATUSES,
      divisions: DIVISIONS,
      saved: req.query.saved === '1',
      deleted: req.query.deleted === '1',
    });
  } catch (err) {
    next(err);
  }
});

router.get('/admin/leads/:id', requireAdmin, async (req, res, next) => {
  try {
    const lead = await getLead(req.params.id);
    if (!lead) return res.status(404).redirect('/admin');

    renderAdmin(req, res, 'admin-lead', {
      title: `${lead.name} — CRM Workify`,
      lead,
      statuses: STATUSES,
      divisions: DIVISIONS,
      saved: req.query.saved === '1',
    });
  } catch (err) {
    next(err);
  }
});

router.post('/admin/leads/:id/update', requireAdmin, async (req, res, next) => {
  try {
    const patch = {};
    if (req.body.status) patch.status = req.body.status;
    if (req.body.division) patch.division = req.body.division;
    await updateLead(req.params.id, patch);
    res.redirect(`/admin/leads/${req.params.id}?saved=1`);
  } catch (err) {
    next(err);
  }
});

router.post('/admin/leads/:id/note', requireAdmin, async (req, res, next) => {
  try {
    const text = (req.body.note || '').trim();
    if (text) await addNote(req.params.id, text);
    res.redirect(`/admin/leads/${req.params.id}?saved=1`);
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
    const stats = await getStats();
    res.json({ total: stats.total, new: stats.new });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
