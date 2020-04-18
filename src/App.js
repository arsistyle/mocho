import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';

/** DATA **/
import { Global } from './data';

/** COMPONENTS **/
import Header from './components/Header';
import Home from './components/Home';
import CatalogoDetalle from './components/Catalogo/CatalogoDetalle';

/** ASSETS **/
// images
import Logo from './assets/img/logo.svg';
// Styles
import './assets/scss/ars1/ars1.scss';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <main className='App'>
      <Router>
        <ScrollToTop />
        <Header logo={Logo} alt={Global.title} wspurl={Global.wsp.url} wspicon={Global.wsp.icon} wsptext={Global.wsp.text} />
        <Switch>
          <Route path='/:slug' exact component={CatalogoDetalle} />
          <Route path='/' exact component={Home} />
          {/* <Route name="404: No Match for route" path="*" component={NoMatch} /> */}
        </Switch>
      </Router>
    </main>
  );
}

export default App;
