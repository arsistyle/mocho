import React from 'react';
// import ScrollableAnchor from 'react-scrollable-anchor'
import { useCurrentWitdh } from './Functions';

/** DATA **/
import { Global } from './data';

/** COMPONETNS **/
import Header from './components/Header';
import Hero from './components/Hero';
import Catalogo from './components/Catalogo';

/** ASSETS **/
// images
import Logo from './assets/img/logo.svg';
import LogoMobile from './assets/img/logo-mobile.svg';
// Styles
import './assets/scss/ars1/ars1.scss';

function App() {
  let width = useCurrentWitdh();
  return (
    <main className="App">
      <Header
        logo={width < 768 ? LogoMobile : Logo}
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
