import nunjucks from 'nunjucks';

const MENU = [
  {
    label: 'Home',
    link: '/',
    layout: 'mainLayout',
  },
  {
    label: 'Movies',
    link: '/movies',
    layout: 'mainLayout',
  },
  {
    label: 'About',
    link: '/about-us',
    layout: 'mainLayout',
  },
];

export default async function renderPage(response, page, title, additionalData = {}) {
  const menuItems = MENU.map((item) => ({
    label: item.label,
    link: item.link,
  }));

  response.render(page, { menuItems, title, ...additionalData });
}
