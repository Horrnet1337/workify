const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const CRM_FILE = path.join(__dirname, '../data/crm.json');
const LEGACY_FILE = path.join(__dirname, '../data/leads.json');

const STATUSES = ['new', 'contacted', 'qualified', 'offer', 'won', 'lost'];
const DIVISIONS = ['kadry', 'rekrutacja', 'outsourcing', 'fasady', 'hurtownia', 'inne'];

async function readStore() {
  try {
    const raw = await fs.readFile(CRM_FILE, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data.leads) ? data : { leads: [] };
  } catch (err) {
    if (err.code === 'ENOENT') {
      return migrateLegacy();
    }
    throw err;
  }
}

async function migrateLegacy() {
  try {
    const raw = await fs.readFile(LEGACY_FILE, 'utf8');
    const legacy = JSON.parse(raw);
    if (!Array.isArray(legacy.leads)) return { leads: [] };
    const leads = legacy.leads.map((lead) => ({
      ...lead,
      division: mapServiceToDivision(lead.service),
      status: 'new',
      updatedAt: lead.createdAt,
      notes: [],
      history: [
        {
          id: crypto.randomUUID(),
          type: 'created',
          message: 'Lead utworzony z formularza',
          createdAt: lead.createdAt,
        },
      ],
    }));
    const store = { leads };
    await writeStore(store);
    return store;
  } catch (err) {
    if (err.code === 'ENOENT') return { leads: [] };
    throw err;
  }
}

function mapServiceToDivision(service) {
  if (!service) return 'inne';
  const s = service.toLowerCase();
  if (s.includes('fasad') || s.includes('elewac')) return 'fasady';
  if (s.includes('hurt') || s.includes('materiał')) return 'hurtownia';
  if (s.includes('rekrut')) return 'rekrutacja';
  if (s.includes('outsourc') || s.includes('współprac')) return 'outsourcing';
  if (s.includes('leasing') || s.includes('kadry') || s.includes('personel')) return 'kadry';
  return 'inne';
}

async function writeStore(data) {
  await fs.mkdir(path.dirname(CRM_FILE), { recursive: true });
  await fs.writeFile(CRM_FILE, JSON.stringify(data, null, 2), 'utf8');
}

async function listLeads(filters = {}) {
  const data = await readStore();
  let leads = [...data.leads];

  if (filters.status && STATUSES.includes(filters.status)) {
    leads = leads.filter((l) => l.status === filters.status);
  }
  if (filters.division && DIVISIONS.includes(filters.division)) {
    leads = leads.filter((l) => l.division === filters.division);
  }
  if (filters.q) {
    const q = filters.q.toLowerCase();
    leads = leads.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.message && l.message.toLowerCase().includes(q))
    );
  }

  return leads.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
}

async function getLead(id) {
  const data = await readStore();
  return data.leads.find((l) => l.id === id) || null;
}

async function addLead(payload) {
  const data = await readStore();
  const now = new Date().toISOString();
  const lead = {
    id: crypto.randomUUID(),
    name: payload.name,
    company: payload.company,
    email: payload.email,
    phone: payload.phone || '',
    division: payload.division || mapServiceToDivision(payload.service) || 'inne',
    service: payload.service || '',
    message: payload.message,
    lang: payload.lang || 'pl',
    ip: payload.ip || '',
    status: 'new',
    createdAt: now,
    updatedAt: now,
    notes: [],
    history: [
      {
        id: crypto.randomUUID(),
        type: 'created',
        message: 'Zapytanie z formularza kontaktowego',
        createdAt: now,
      },
    ],
  };

  data.leads.unshift(lead);
  await writeStore(data);
  return lead;
}

async function updateLead(id, patch) {
  const data = await readStore();
  const index = data.leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const lead = data.leads[index];
  const now = new Date().toISOString();

  if (patch.status && patch.status !== lead.status && STATUSES.includes(patch.status)) {
    lead.history = lead.history || [];
    lead.history.unshift({
      id: crypto.randomUUID(),
      type: 'status',
      from: lead.status,
      to: patch.status,
      createdAt: now,
    });
    lead.status = patch.status;
  }

  if (patch.division && DIVISIONS.includes(patch.division) && patch.division !== lead.division) {
    lead.history = lead.history || [];
    lead.history.unshift({
      id: crypto.randomUUID(),
      type: 'division',
      from: lead.division,
      to: patch.division,
      createdAt: now,
    });
    lead.division = patch.division;
  }

  lead.updatedAt = now;
  data.leads[index] = lead;
  await writeStore(data);
  return lead;
}

async function addNote(id, text) {
  const data = await readStore();
  const index = data.leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const note = { id: crypto.randomUUID(), text: text.trim(), createdAt: now };
  const lead = data.leads[index];
  lead.notes = lead.notes || [];
  lead.notes.unshift(note);
  lead.history = lead.history || [];
  lead.history.unshift({
    id: crypto.randomUUID(),
    type: 'note',
    message: text.trim(),
    createdAt: now,
  });
  lead.updatedAt = now;
  data.leads[index] = lead;
  await writeStore(data);
  return lead;
}

async function deleteLead(id) {
  const data = await readStore();
  const before = data.leads.length;
  data.leads = data.leads.filter((l) => l.id !== id);
  if (data.leads.length === before) return false;
  await writeStore(data);
  return true;
}

async function getStats() {
  const data = await readStore();
  const leads = data.leads;
  return {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    active: leads.filter((l) => ['contacted', 'qualified', 'offer'].includes(l.status)).length,
    won: leads.filter((l) => l.status === 'won').length,
    lost: leads.filter((l) => l.status === 'lost').length,
    byDivision: DIVISIONS.reduce((acc, d) => {
      acc[d] = leads.filter((l) => l.division === d).length;
      return acc;
    }, {}),
  };
}

module.exports = {
  STATUSES,
  DIVISIONS,
  listLeads,
  getLead,
  addLead,
  updateLead,
  addNote,
  deleteLead,
  getStats,
};
