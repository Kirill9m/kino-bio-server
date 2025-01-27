// vite will now compile our scss
// import './styles/styles.scss';
//JS Import
import MovieCardGenerator from './_frontpage_movie_cards.js';
import LoadAllFilmsPage from './LoadAllFilmsPage.js';
import ApiBackend from './ApiBackend.js';
import MobileMenu from './MobileMenu.js';
import initLiveEvents from './_initLiveEvents.js';
import FilmChooser from './FilmChooser.js';

if (document.querySelector('.moviesSecond')) {
  const loadingMessage = document.createElement('h4');
  loadingMessage.classList.add('movies__message__new');
  loadingMessage.innerText = 'Api is starting\nLoading movies... Please wait.';
  document.querySelector('.movies__message').appendChild(loadingMessage);
  loadingMessage.style.display = 'none';

  const backend = new ApiBackend('https://plankton-app-xhkom.ondigitalocean.app/api');
  const filmList = new LoadAllFilmsPage(backend);
  const filmChooser = new FilmChooser(backend);

  const moviesContainer = document.querySelector('.moviesSecond');
  filmList.start(moviesContainer, loadingMessage);
  filmChooser.start(moviesContainer);
} else {
  const backend = new ApiBackend('https://kino-bio-projekt.onrender.com');
  const movieCardGenerator = new MovieCardGenerator(backend);
  movieCardGenerator.CardGenerator(4);
}

document.addEventListener('DOMContentLoaded', initLiveEvents);
