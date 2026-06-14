module.exports = function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  const loc = req.loc;
  const title = loc ? loc.ui.notFound.errorTitle : 'Error';
  const message = process.env.NODE_ENV === 'production'
    ? (loc ? loc.ui.notFound.defaultMsg : 'An unexpected error occurred.')
    : err.message;

  res.status(err.status || 500).render('layouts/main', {
    bodyPartial: '404',
    title,
    pageId: 'error',
    metaDescription: loc ? loc.meta.notFound.description : '',
    message,
  });
};
