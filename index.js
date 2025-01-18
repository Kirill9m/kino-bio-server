import express from 'express';
import nunjucks from 'nunjucks';
import renderPage from './lib/renderPage.js';

const app = express();
nunjucks.configure('templates', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', './templates');

app.get('/', (request, response) => {
  renderPage(response, 'index');
});

app.get('/movies', (request, response) => {
  renderPage(response, 'movies');
});

app.get('/about-us', (request, response) => {
  renderPage(response, 'about-us');
});

app.use('/src', express.static('./src'));

app.listen(5080);
