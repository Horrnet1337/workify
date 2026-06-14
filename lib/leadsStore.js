const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const LEADS_FILE = path.join(__dirname, '../data/leads.json');

async function readStore() {
  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data.leads) ? data : { leads: [] };
  } catch (err) {
    if (err.code === 'ENOENT') return { leads: [] };
    throw err;
  }
}

async function writeStore(data) {
  await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
  await fs.writeFile(LEADS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

async function listLeads() {
  const data = await readStore();
  return data.leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function addLead(payload) {
  const data = await readStore();
  const lead = {
    id: crypto.randomUUID(),
    name: payload.name,
    company: payload.company,
    email: payload.email,
    phone: payload.phone || '',
    service: payload.service || '',
    message: payload.message,
    lang: payload.lang || 'pl',
    ip: payload.ip || '',
    createdAt: new Date().toISOString(),
  };

  data.leads.unshift(lead);
  await writeStore(data);
  return lead;
}

async function deleteLead(id) {
  const data = await readStore();
  const before = data.leads.length;
  data.leads = data.leads.filter((lead) => lead.id !== id);
  if (data.leads.length === before) return false;
  await writeStore(data);
  return true;
}

async function countLeads() {
  const data = await readStore();
  return data.leads.length;
}

module.exports = {
  listLeads,
  addLead,
  deleteLead,
  countLeads,
};
