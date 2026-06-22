const servicesBase = require('../data/services');
const industriesBase = require('../data/industries');
const faqBase = require('../data/faq');
const processBase = require('../data/process');
const locationsBase = require('../data/locations');
const divisionsBase = require('../data/divisions');
const facadesBase = require('../data/facades');
const wholesaleBase = require('../data/wholesale');
const cooperationBase = require('../data/cooperation');

function mergeItems(base, texts) {
  return base.map((item, i) => ({
    ...item,
    ...(texts[i] || {}),
  }));
}

function mergeLocations(base, texts) {
  return {
    pl: { ...base.pl, ...(texts.pl || {}) },
    de: { ...base.de, ...(texts.de || {}) },
  };
}

module.exports = function buildLocale(overrides) {
  return {
    code: overrides.code,
    label: overrides.label,
    name: overrides.name,
    flag: overrides.flag,
    ui: overrides.ui,
    meta: overrides.meta,
    site: overrides.site,
    validation: overrides.validation,
    services: mergeItems(servicesBase, overrides.services),
    industries: mergeItems(industriesBase, overrides.industries),
    divisions: mergeItems(divisionsBase, overrides.divisions || []),
    facades: mergeItems(facadesBase, overrides.facades || []),
    wholesale: mergeItems(wholesaleBase, overrides.wholesale || []),
    cooperation: mergeItems(cooperationBase, overrides.cooperation || []),
    faq: mergeItems(faqBase, overrides.faq),
    process: mergeItems(processBase, overrides.process),
    locations: mergeLocations(locationsBase, overrides.locations),
  };
};
