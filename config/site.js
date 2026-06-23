module.exports = {
  name: 'ADT GROUP',
  shortName: 'ADT',
  email: process.env.SITE_EMAIL || 'office@adtgroup.pl',
  phone: process.env.SITE_PHONE || '',
  phoneHref: (process.env.SITE_PHONE || '').replace(/[^+\d]/g, ''),
  url: process.env.SITE_URL || 'http://localhost:3000',
  social: {
    linkedin: process.env.SITE_LINKEDIN || '',
    instagram: process.env.SITE_INSTAGRAM || '',
    facebook: process.env.SITE_FACEBOOK || '',
  },
};
