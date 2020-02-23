import React from 'react';

/** DATA **/
import { Global } from './data';

/** COMPONETNS **/
import Header from './components/Header';
import Catalogo from './components/Catalogo';

/** ASSETS **/
// images
import Logo from './assets/img/logo.svg';
// Styles
import './assets/scss/ars1/ars1.scss';

function App() {
  return (
    <div className="App">
      <Header logo={Logo} alt={Global.title} wspurl={Global.wsp.url} wspicon={Global.wsp.icon} wsptext={Global.wsp.text}/>
      <Catalogo/>
    </div>
  );
}

export default App;
