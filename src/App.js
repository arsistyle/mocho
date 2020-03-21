import React from 'react';
// import ScrollableAnchor from 'react-scrollable-anchor'
// import { useCurrentWitdh } from './Functions';

/** DATA **/
import { Global } from './data';

/** COMPONETNS **/
import Header from './components/Header';
import Hero from './components/Hero';
import Catalogo from './components/Catalogo';

/** ASSETS **/
// images
import Logo from './assets/img/logo.svg';
// import ImageRRSS from './assets/img/bg.jpg';
// Styles
import './assets/scss/ars1/ars1.scss';

function App() {
  return (
    <main className="App">
      <Header
        logo={Logo}
        alt={Global.title}
        wspurl={Global.wsp.url}
        wspicon={Global.wsp.icon}
        wsptext={Global.wsp.text}
      />
      <Hero title={Global.hero.title} btn={Global.hero.btn} />
      {/* <ScrollableAnchor id={'catalogo'}> */}
      <Catalogo />
      {/* </ScrollableAnchor> */}
    </main>
  );
}

export default App;
