import SearchFilter from './SearchFilter.js';

export default class LoadAllFilmsPage extends EventTarget {
  constructor(backend) {
    super();
    this.backend = backend;
  }

  async start(listContainer) {
    const response = await fetch('/movies/api');
    if (!response.ok) {
      throw new Error('Failed to load movies');
    }
    const filmsFromApi = await response.json();
    const filmsFromApiData = filmsFromApi.data;

    console.log(filmsFromApiData);

    this.filter = new SearchFilter('');
    this.filter.addEventListener('change', () => {
      this.update();
    });

    const filterElem = this.filter.render();
    listContainer.append(filterElem);

    const listElem = document.createElement('ul');
    listElem.className = 'moviesSecond__list';
    listContainer.append(listElem);

    this.films = filmsFromApiData.map((filmData) => {
      const filmElem = this.renderFilm(filmData);
      listElem.append(filmElem);
      return { data: filmData.attributes, elem: filmElem };
    });
  }

  update() {
    this.films.forEach(({ data, elem }) => {
      const doesMatch = this.filter.doesFilmMatch({ data });
      elem.style.display = doesMatch ? 'block' : 'none';
    });
  }

  renderFilm(data) {
    const movieCard = document.createElement('li');
    movieCard.classList.add('moviesSecond__list__elem');
    movieCard.dataset.id = data.id;

    movieCard.innerHTML = `
        <img src="${data.attributes.image.url}" class="moviesSecond__list__elem__image"  alt="${data.title} image">
        <h3 class="moviesSecond__list__elem__title">${data.attributes.title}</h3>
        <p class="moviesSecond__list__elem__desc">${data.attributes.intro}</p>
        <p class="moviesSecond__list__elem__rating">Click on the container to see more</p>
    `;
    return movieCard;
  }
}
