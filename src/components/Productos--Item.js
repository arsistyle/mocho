import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from './Image';
import { MILES } from '../ars1';
// const imageError = require('../assets/img/catalogo-error.svg');

export const ProductosItem = ({ data }) => {
  const { acf, slug, title, name } = data;
  const [stock, setStock] = useState(0);
  // const imageUrl = acf.colores[0].imagen;

  useEffect(() => {
    async function calcularStock() {
      const calculo = await function () {
        return acf.colores.reduce((prev, next) => {
          return prev + Number(next.stock);
        }, 0);
      };
      setStock(calculo);
    }
    calcularStock();
  }, [acf.colores, stock]);

  return (
    <Link to={`/productos/${slug}`} className='productos__item fadeInUp'>
      <div className='productos__tags'>
        <div className='productos__tags__content'>
          {acf.nuevo && (
            <div className='productos__tags__item productos__tags__item--nuevo'>
              Nuevo
            </div>
          )}
          {acf.oferta && (
            <div className='productos__tags__item productos__tags__item--oferta'>
              Oferta
            </div>
          )}
          {/* {console.log(stock, acf.colores.length)} */}
          {stock <= acf.colores.length && (
            <div className='productos__tags__item productos__tags__item--ultimo'>
              Últimas unidades
            </div>
          )}
        </div>
      </div>
      <div className='productos__image'>
        {<Image src={`${acf.imagen}`} alt={name} />}
      </div>
      <div className='productos__info'>
        <h3
          className='productos__title'
          dangerouslySetInnerHTML={{ __html: title.rendered }}
        ></h3>
        <h4 className='productos__valor color--secundario'>
          {acf.oferta && (
            <span>{MILES(acf.colores[0].precio_anterior, '$')}</span>
          )}
          {MILES(acf.colores[0].precio, '$')}
        </h4>
      </div>
    </Link>
  );
};

export default ProductosItem;
