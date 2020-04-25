import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { getMenu } from './services';
import Header from './components/Header';
import Home from './components/Home';
import PageProductos from './components/Productos/Page';
import Detalle from './components/Productos/Detalle';
import Footer from './components/Footer';
import './assets/scss/ars1/ars1.scss';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const error404 = () => <h1>Error 404</h1>;

const COMPONENTES = {
  Home,
  PageProductos,
  Detalle,
  error404
};

const ROUTES = (data) => {
  let routes = [
    {
      path: '/productos',
      slug: 'productos',
      exact: true,
      component: PageProductos,
    },
    data.map((x) => {
      // console.log(x);
      return [
        x['post_status'] === 'publish'
          ? x['child_items']?.length
            ? x['child_items'].map((x, i) => {
                return {
                  path: x.path,
                  slug: x.slug,
                  id: Number(x._id),
                  component: COMPONENTES[x.componente],
                  childrens: x['child_items'] && true,
                  extras: x['extras'] && { ...x['extras'] },
                  exact: x.exact,
                };
              })
            : {
                path: x.path,
                slug: x.slug,
                id: Number(x._id),
                component: COMPONENTES[x.componente],
                childrens: x['child_items'] && true,
                extras: x['extras'] && { ...x['extras'] },
                exact: x.exact,
              }
          : {},
      ];
    }),
  ];
  // console.log(routes.flat(3));
  return routes.flat(3).filter(Boolean);
};

function App() {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    async function loadMenu() {
      const response = await getMenu('menu-rest');
      if (response.items) {
        setMenu(response.items);
        setLoading(false);
      }
    }
    loadMenu();
  }, []);

  return (
    <main className='App'>
      <Router>
        <ScrollToTop />
        <Header />
        <Switch>
          {!loading &&
            ROUTES(menu).map((x, i) => {
              return x.component && <Route key={i} path={x.path} exact={x.exact} render={({ match }) => <x.component id={x.id} match={match} slug={x.slug} {...x.extras} />} />;
            })}
        </Switch>
      </Router>
      <Footer/>
    </main>
  );
}

export default App;
