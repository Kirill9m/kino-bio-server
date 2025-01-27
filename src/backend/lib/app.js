import express from 'express';
import nunjucks from 'nunjucks';
import renderPage from './renderPage.js';
import { marked } from 'marked';
import { loadMovie, loadMovies } from './moviesLoad.js';

function initApp(api) {
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
        const movies = await api.loadMovies();
        movies.forEach(movie => {
            if (movie && movie.intro) {
                movie.intro = marked.parse(movie.intro);
            }
        });

        renderPage(response, 'pages/movies', { movies });
    });

    app.get('/about-us', (request, response) => {
        renderPage(response, 'pages/about-us', 'About');
    });

    app.get('/movies/id/:id', async (request, response) => {
        try {
            const movie = await api.loadMovie(request.params.id);
            Object.assign(movie, {
                intro: marked.parse(movie.intro),
            });

            renderPage(response, 'pages/movie', { movie });
        } catch (error) {
            response.status(404);
            renderPage(response, 'pages/404', { title: "Det finns inget sådant ID eller film!" });
        }
    });
    app.use('/static', express.static('./static'));

    return app;
}
export default initApp;