import { expect, test } from '@jest/globals';
import app from "../src/backend/app.js";
import request from 'supertest';

test('Movie page shows list of films', async () => {
  const response = await request(app)
    .get('/movies')
    .expect('Content-Type', /html/)
    .expect(200);

    expect(response.text).toMatch('Encanto');
    expect(response.text).toMatch('Forrest Gump');
    expect(response.text).toMatch('Training Day');
});