import ApiBackend from '../src/js/ApiBackend.js';

const backend = new ApiBackend('https://plankton-app-xhkom.ondigitalocean.app/api');
const filmsFromApi = await backend.loadAllFilms();
const filmById = await backend.loadFilmById(1);

test('API is loading and have right properties', async () => {
  expect(filmsFromApi.data[0]).toHaveProperty('attributes' && 'id');
});

test('API is returning an array', async () => {
  expect(Array.isArray(filmsFromApi.data)).toBe(true);
});

test('API by Id is loading have the right properties', async () => {
  expect(filmById.data.attributes).toHaveProperty('title');
  expect(filmById.data.attributes).toHaveProperty('intro');
  expect(filmById.data.attributes).toHaveProperty('image');
});

test('API returns a valid response on error', async () => {
  try {
    await backend.loadFilmById(999);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toContain('Failed to fetch movie with ID');
  }
});
