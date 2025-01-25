import { expect, test } from '@jest/globals';
import request from 'supertest';
import initApp from "../src/backend/app.js";
const app = initApp();

test('Movies page shows list of films', async () => {
  const response = await request(app)
    .get('/movies')
    .expect('Content-Type', /html/)
    .expect(200);

  expect(response.text).toMatch('Encanto');
  expect(response.text).toMatch('Forrest Gump');
  expect(response.text).toMatch('Training Day');
});

test('Movie page shows a film', async () => {
  const response = await request(app)
    .get('/movies/id/1')
    .expect('Content-Type', /html/)
    .expect(200);
  expect(response.text).toMatch('eachMovie__title');
});

test('Movie page shows 404 page', async () => {
  const response = await request(app)
    .get('/movies/id/10000')
    .expect('Content-Type', /html/)
    .expect(404);
  expect(response.text).toMatch('Det finns inget sådant ID eller film!');
});