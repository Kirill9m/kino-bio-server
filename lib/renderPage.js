import fs from 'fs/promises';

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

export default async function renderPage(response, page) {
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
