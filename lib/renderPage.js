import nunjucks from 'nunjucks';

const MENU = [
  {
    label: 'Home',
    link: '/',
    layout: 'main-layout',
  },
  {
    label: 'Movies',
    link: '/movies',
    layout: 'main-layout',
  },
  {
    label: 'About',
    link: '/about-us',
    layout: 'main-layout',
  },
];

export default async function renderPage(response, page) {
  const menuItems = MENU.map((item) => ({
    label: item.label,
    link: item.link,
  }));

  response.render(page, { menuItems });
}
