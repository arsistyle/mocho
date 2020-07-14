import wpapi from 'wpapi';
const wp_base = process.env.REACT_APP_BASE_URL;

const WP = new wpapi({
  endpoint: wp_base,
  username: process.env.REACT_APP_AUTH_USER,
  password: process.env.REACT_APP_AUTH_PASS,
  // auth: false
});

WP.productos = WP.registerRoute('wp/v2', '/productos/(?P<id>\\d+)');
WP.compras = WP.registerRoute('wp/v2', '/compras/(?P<id>\\d+)');

/*
WP.compras()
  .create({
    title: 'Compra ' + new Date().getTime(),
    content: `
        <figure class="wp-block-image size-large">
          <img src="https://admin.mochostore.cl/wp-content/uploads/2020/04/batman.jpg" alt=""/>
          <figcaption>nombre de la wea</figcaption>
        </figure>
        <p>Cualquier wea</p>
      `,
    status: 'pending',
    
  })
  .then((x) => {
    console.log(x);
    WP.compras()
      .id(x.id)
      .update({
        meta: {
          imagen: 'https://admin.mochostore.cl/wp-content/uploads/2020/04/batman.jpg',
        },
      });
  });
*/

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
          .categories(id)
          .per_page(total)
          .get()
          .then((x) => x)
      : WP.products()
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
