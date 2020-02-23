import React, { useState } from 'react';
import { useCurrentWitdh } from './Functions';

/** DATA **/
import { Global } from './data';

/** COMPONETNS **/
import Header from './components/Header';
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
      <Header logo={width < 991 ? LogoMobile : Logo} alt={Global.title} wspurl={Global.wsp.url} wspicon={Global.wsp.icon} wsptext={Global.wsp.text}/>
      <Catalogo/>
    </main>
  );
}

export default App;
