const crypto = require('crypto');
const admin = require('../config/admin');

function signPayload(payload) {
  return crypto.createHmac('sha256', admin.sessionSecret).update(payload).digest('base64url');
}

function createSessionToken() {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + admin.sessionMaxAgeMs })
  ).toString('base64url');
  return `${payload}.${signPayload(payload)}`;
}

function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  if (signPayload(payload) !== signature) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof data.exp === 'number' && data.exp > Date.now();
  } catch (err) {
    return false;
  }
}

function getSessionToken(req) {
  const header = req.headers.cookie;
  if (!header) return null;
  const match = header.match(new RegExp(`(?:^|; )${admin.cookieName}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setSessionCookie(res) {
  const token = createSessionToken();
  res.setHeader(
    'Set-Cookie',
    `${admin.cookieName}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(admin.sessionMaxAgeMs / 1000)}`
  );
}

function clearSessionCookie(res) {
  res.setHeader(
    'Set-Cookie',
    `${admin.cookieName}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  );
}

function isAdmin(req) {
  return verifySessionToken(getSessionToken(req));
}

function requireAdmin(req, res, next) {
  if (isAdmin(req)) return next();
  return res.redirect('/admin/login');
}

module.exports = {
  isAdmin,
  requireAdmin,
  setSessionCookie,
  clearSessionCookie,
  verifyPassword: (password) => password === admin.password,
};
