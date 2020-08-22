import wpapi from 'wpapi';
const wp_base = process.env.REACT_APP_BASE_URL;

const WP = new wpapi({
  endpoint: wp_base,
});

// WP.setHeaders({
//   'Cache-Control': 'max-age=3600'
// });

console.log(WP);

WP.productos = WP.registerRoute('wp/v2', '/productos/(?P<id>\\d+)');
WP.compras = WP.registerRoute('wp/v2', '/compras/(?P<id>\\d+)');

export async function getHeader() {
  WP.header = WP.registerRoute('acf/v3/options', '/header/');
  try {
    const response = await WP.header()
      .get()
      .then((x) => x);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getMenu(menu) {
  WP.menu = WP.registerRoute('menus/v1/menus', `/${menu}/`);
  try {
    const response = await WP.menu()
      .get()
      .then((x) => x);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getHero() {
  WP.hero = WP.registerRoute('acf/v3/options', '/hero/');
  try {
    const response = await WP.hero()
      .get()
      .then((x) => x);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getPage(slug) {
  WP.page = WP.registerRoute('wp/v2', `/pages/`, {
    params: ['slug'],
  });
  try {
    const response = await WP.page()
      .slug(slug)
      .get()
      .then((x) => x);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getProducts(id, total = 100) {
  WP.products = WP.registerRoute('wp/v2', `/productos/`, {
    params: ['categories', 'per_page'],
  });

  try {
    const response = await (id
      ? WP.products()
          .param('timestamp', Date.now())
          .categories(id)
          .per_page(total)
          .get()
          .then((x) => x)
      : WP.products()
          .param('timestamp', Date.now())
          .categories(id)
          .per_page(total)
          .get()
          .then((x) => x));
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getProduct(slug) {
  WP.producto = WP.registerRoute('wp/v2', `/productos/`, {
    params: ['slug'],
  });
  try {
    const response = await WP.producto()
      .param('timestamp', Date.now())
      .slug(slug)
      .get()
      .then((x) => x);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getFooter() {
  WP.footer = WP.registerRoute('acf/v3/options', '/footer/');
  try {
    const response = await WP.footer()
      .get()
      .then((x) => x);
    return response;
  } catch (e) {
    console.log(e);
  }
}
