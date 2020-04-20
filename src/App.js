import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';


/** COMPONENTS **/
import Header from './components/Header';
import Home from './components/Home';
import CatalogoDetalle from './components/Catalogo/CatalogoDetalle';

/** ASSETS **/
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
        <Header />
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
