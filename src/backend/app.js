import express from 'express';
import nunjucks from 'nunjucks';
import renderPage from '../../lib/renderPage.js';
import { marked } from 'marked';
import { loadMovie, loadMovies } from './moviesLoad.js';

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
  movies.forEach(movie => {
    if (movie.attributes && movie.attributes.intro) {
      movie.attributes.intro = marked.parse(movie.attributes.intro);
    }
  });

  renderPage(response, 'pages/movies', { movies });
});

app.get('/about-us', (request, response) => {
  renderPage(response, 'pages/about-us', 'About');
});

app.get('/movies/id/:id', async (request, response) => {
  try {
    const movie = await loadMovie(request.params.id);
    Object.assign(movie.attributes, {
      intro: marked.parse(movie.attributes.intro),
    });
    
    renderPage(response, 'pages/movie', { movie });
  } catch (error) {
    response.status(404);
    renderPage(response, 'pages/404', { title: "Det finns inget sådant ID eller film!" });
  }
});
app.use('/src', express.static('./src'));

export default app;