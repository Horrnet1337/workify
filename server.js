const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const localsMiddleware = require('./middleware/locals');
const errorHandler = require('./middleware/errorHandler');
const pagesRouter = require('./routes/pages');
const site = require('./config/site');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'],
    },
  },
}));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(localsMiddleware);
app.use(require('./middleware/locale'));
app.use(pagesRouter);
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`${site.name} → http://localhost:${PORT}`);
});
