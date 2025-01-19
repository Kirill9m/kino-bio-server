import ApiBackend from '../src/js/ApiBackend.js';
import app from '../index.js';
import request from 'supertest';

const backend = new ApiBackend('https://plankton-app-xhkom.ondigitalocean.app/api');

let filmsFromApi;
let filmById;

beforeAll(async () => {
  filmsFromApi = await backend.loadAllFilms();
  filmById = await backend.loadFilmById(1);
});

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

test('Server is renders a homepage', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
});

test('Films hava a right titles', async () => {
  const response = await request(app).get('/movies/id/1');

  expect(response.text).toContain(filmById.data.attributes.title);
  expect(response.status).toBe(200);
});
