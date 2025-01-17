import express from 'express';
import fs from 'fs/promises';

const app = express();

app.get('/', async (request, response) => {
  const buf = await fs.readFile('./content/index.html');
  const text = buf.toString();

  response.send(text);
});

app.get('/movies', async (request, response) => {
  const buf = await fs.readFile('./content/movies.html');
  const text = buf.toString();

  response.send(text);
});

app.get('/about', async (request, response) => {
  const buf = await fs.readFile('./content/about-us.html');
  const text = buf.toString();

  response.send(text);
});

app.use('/src', express.static('./src'));

app.listen(5080);
