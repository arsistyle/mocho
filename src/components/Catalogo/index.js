import React from 'react';
import LazyLoad from 'react-lazyload';

import CatalogoItem from './CatalogoItem';

// Data
import { Listado } from '../../data/Catalogo';

import '../../assets/scss/style/components/Catalogo.scss';

const Catalogo = props => {
  return (
    <section className="catalogo container-fluid">
      <div className="row">
        {Listado.map((item, i) => (
          <LazyLoad key={i}>
            <CatalogoItem
              image={item.image}
              wsp={item.wsp}
              name={item.name}
              state={item.state}
            />
          </LazyLoad>
        ))}
      </div>
    </section>
  );
};

export default Catalogo;
