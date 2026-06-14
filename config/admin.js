module.exports = {
  cookieName: 'workify_admin_session',
  password: process.env.ADMIN_PASSWORD || 'workify2026',
  sessionSecret: process.env.ADMIN_SECRET || 'workify-admin-dev-secret-change-me',
  sessionMaxAgeMs: 7 * 24 * 60 * 60 * 1000,
};
