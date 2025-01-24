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

export default async function renderPage(response, page, additionalData = {}) {
  const menuItems = MENU.map((item) => ({
    label: item.label,
    link: item.link,
  }));

  response.render(page, { menuItems, ...additionalData });
}
