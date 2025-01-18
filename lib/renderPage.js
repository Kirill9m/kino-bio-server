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
  response.render(page, {
    menuItems: MENU.map((item) => {
      return {
        label: item.label,
        link: item.link,
      };
    }),
  });
}
