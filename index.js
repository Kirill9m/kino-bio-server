import express from 'express';
import nunjucks from 'nunjucks';
import renderPage from './lib/renderPage.js';
import ApiBackend from './src/js/ApiBackend.js';
import { marked } from 'marked';

const PORT = process.env.PORT || 5080;
const app = express();
const backend = new ApiBackend('https://plankton-app-xhkom.ondigitalocean.app/api');

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', 'views');

app.get('/', (request, response) => {
  renderPage(response, 'pages/index', 'Home');
});

app.get('/movies', (request, response) => {
  renderPage(response, 'pages/movies', 'Movies');
});

app.get('/about-us', (request, response) => {
  renderPage(response, 'pages/about-us', 'About');
});

app.get('/movies/api', async (request, response) => {
  try {
    const films = await backend.loadAllFilms();
    response.json(films);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.get('/movies/id/:id', async (request, response) => {
  const filmId = request.params.id;
  try {
    const film = await backend.loadFilmById(filmId);
    const filmData = film.data.attributes;
    const filmDataIntro = marked.parse(film.data.attributes.intro);

    renderPage(response, 'layout/movieLayout', filmData.title, {
      film: filmData,
      filmDataIntro,
    });
  } catch (error) {
    response.status(404);
    renderPage(response, 'pages/404', 'Error 404', { title: '404 Not Found' });
  }
});
app.use('/src', express.static('./src'));

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
