import express from 'express';
import nunjucks from 'nunjucks';
import renderPage from './lib/renderPage.js';
import ApiBackend from './src/js/ApiBackend.js';
import { marked } from 'marked';
import { loadMovie, loadMovies } from './src/backend/moviesLoad.js';

const PORT = process.env.PORT || 5080;
const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', 'views');

app.get('/', (request, response) => {
  renderPage(response, 'pages/index', 'Home');
});

app.get('/movies', async (request, response) => {
  const movies = await loadMovies();
  response.render('pages/movies', { movies });
  // renderPage(response, 'pages/movies', 'Movies');
});

app.get('/about-us', (request, response) => {
  renderPage(response, 'pages/about-us', 'About');
});

app.get('/movies/id/:id', async (request, response) => {
  try {
    const movie = await loadMovie(req.params.movieId);
    res.render('movie', { movie });
    // const film = await backend.loadFilmById(filmId);
    // const filmData = film.data.attributes;
    // const filmDataIntro = marked.parse(film.data.attributes.intro);

    // renderPage(response, 'layout/movieLayout', filmData.title, {
    //   film: filmData,
    //   filmDataIntro,
    // });
  } catch (error) {
    response.status(404);
    renderPage(response, 'pages/404', 'Error 404', { title: '404 Not Found' });
  }
});
app.use('/src', express.static('./src'));

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

export default app;
