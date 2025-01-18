export default class FilmChooser {
  constructor(backend) {
    this.backend = backend;
  }

  start(filmListContainer) {
    filmListContainer.addEventListener('click', async (event) => {
      const filmElem = event.target.closest('.moviesSecond__list__elem');
      if (!filmElem) return;

      const filmId = filmElem.dataset.id;
      if (filmId) {
        window.location.href = `/movie/${filmId}`;
      }
    });
  }
}
