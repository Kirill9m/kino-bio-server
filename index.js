import express from 'express';
import fs from 'fs/promises';

const app = express();

const MENU = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Movies',
    link: '/movies',
  },
  {
    label: 'About',
    link: '/about-us',
  },
];
async function renderPage(response, page) {
  const contentBuf = await fs.readFile(`./content/${page}.html`);
  const contentText = contentBuf.toString();

  const templateBuf = await fs.readFile('./templates/main.html');
  const templateText = templateBuf.toString();

  const menuItems = MENU.map((item) => {
    return `<li class="header__nav-item"><a href="${item.link}" class="header__nav-link" aria-label="Go to Biljetter">${item.label}</a>
          </li>`;
  });

  const menuItemsMobile = MENU.map((item) => {
    return `<li class="hamburger__list"><a href="${item.link}">${item.label}</a></li>`;
  });

  const menuText = menuItems.join('\n');
  const menuTextMobile = menuItemsMobile.join('\n');

  const outputHtml = templateText
    .replace('@mainOne', contentText)
    .replace('@menu', menuText)
    .replace('@menuMobile', menuTextMobile);

  response.send(outputHtml);
}

app.get('/', (request, response) => {
  renderPage(response, 'index');
});

app.get('/movies', (request, response) => {
  renderPage(response, 'movies');
});

app.get('/about-us', (request, response) => {
  renderPage(response, 'about-us');
});

app.use('/src', express.static('./src'));

app.listen(5080);
