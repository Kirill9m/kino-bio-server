export default class ApiBackend {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async loadAllFilms() {
    const response = await fetch(this.apiUrl + '/movies');
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    const payload = await response.json();
    return payload;
  }

  async loadFilmById(id) {
    const response = await fetch(`${this.apiUrl}/movies/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch movie with ID ${id}: ${response.statusText}`);
    }
    const payload = await response.json();
    return payload;
  }
}
