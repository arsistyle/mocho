import React from 'react';

import CatalogoItem from './CatalogoItem'

// Data
import { Listado } from '../../data/Catalogo'

import '../../assets/scss/style/components/Catalogo.scss';

const Catalogo = props => {
  return (
    <section className="catalogo container-fluid"><h1>Catálogo</h1>
      <div className="row">
        {
          Listado.map((item, i) => (<CatalogoItem image={item.image} wsp={item.wsp} name={item.name} state={item.state} key={i}/>))
        }
      </div>
    </section>
  );
};

export default Catalogo;
