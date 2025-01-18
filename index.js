import express from 'express';
import nunjucks from 'nunjucks';
import renderPage from './lib/renderPage.js';
import ApiBackend from './src/js/ApiBackend.js';

const app = express();
const backend = new ApiBackend('https://plankton-app-xhkom.ondigitalocean.app/api');

nunjucks.configure('templates', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', './templates');

app.get('/', (request, response) => {
  renderPage(response, 'pages/index', 'Home');
});

app.get('/movies', (request, response) => {
  renderPage(response, 'pages/movies', 'Movies');
});

app.get('/about-us', (request, response) => {
  renderPage(response, 'pages/about-us', 'About');
});

app.get('/movie/:id', async (request, response) => {
  const filmId = request.params.id;
  try {
    const film = await backend.loadFilmById(filmId);
    const filmData = film.data.attributes;

    renderPage(response, 'layout/movieLayout', filmData.title, {
      film: filmData,
    });
  } catch (error) {
    response.status(404);
    renderPage(response, 'pages/404', 'Error 404', { title: '404 Not Found' });
    // response.status(404).render('pages/404', { title: '404 Not Found' });
  }
});
app.use('/src', express.static('./src'));

app.listen(5080);
