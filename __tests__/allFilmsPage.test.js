import LoadAllFilmsPage from '../src/js/LoadAllFilmsPage.js';
import ApiBackend from '../src/js/ApiBackend.js';
import mockChallengeData from '../Mock/mockData.js';

test('API is loading', async () => {
  const backend = new ApiBackend('https://plankton-app-xhkom.ondigitalocean.app/api');

  const filmsFromApi = await backend.loadAllFilms();

  expect(filmsFromApi.data[0]).toHaveProperty('attributes');
});
