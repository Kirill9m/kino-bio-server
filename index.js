import express from 'express';
import renderPage from './lib/renderPage.js';

const app = express();

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
