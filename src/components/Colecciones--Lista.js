import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getColecciones } from '../services';

import { PHColeccionesLista } from './Placeholders';
import Image from './Image';

import { HTML, RANDOM } from '../ars1';

import '../assets/scss/style/components/Colecciones.scss';

const itemsColecciones = (x, i) => {
  return (
    <div className='col-xs-12 col-md-6' key={i}>
      <NavLink to={`/productos/${x.slug}`} className='colecciones__item'>
        <div className='colecciones__image'>
          <Image src={x.acf.imagen.url} alt={HTML(x.title.rendered)} />
        </div>
        <div className='colecciones__info'>
          <h3 className='colecciones__title'>{HTML(x.title.rendered)}</h3>
        </div>
      </NavLink>
    </div>
  );
};

const Colecciones = ({ order, totalItems }) => {
  const [loading, setLoading] = useState(true);
  const [colecciones, setColecciones] = useState([]);

  useEffect(() => {
    function loadColecciones() {
      const response = getColecciones();
      response.then((data) => {
        if (data) {
          setColecciones(data);
          setLoading(false);
        }
      });
    }
    loadColecciones();
  }, [order, totalItems]);

  return loading ? (
    <PHColeccionesLista />
  ) : (
    <div className='row'>
      {order === 'rand'
        ? RANDOM(colecciones)
            .slice(0, totalItems)
            .map((x, i) => {
              return itemsColecciones(x, i);
            })
        : colecciones.map((x, i) => {
            return itemsColecciones(x, i);
          })}
    </div>
  );
};

export default Colecciones;
