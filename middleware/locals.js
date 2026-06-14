const site = require('../config/site');

module.exports = function localsMiddleware(req, res, next) {
  res.locals.site = site;
  res.locals.currentPath = req.path;
  res.locals.year = new Date().getFullYear();
  next();
};
