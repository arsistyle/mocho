import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MILES } from '../../ars1';
const imageError = require('../../assets/img/catalogo-error.svg');

const Item = (props) => {
  const { acf, slug, title } = props.data;
  const [loading, setImage] = useState(null);
  const image = new Image();
  image.src = acf.imagen;
  image.onload = () => {
    setImage(200);
  };
  image.onerror = () => {
    setImage(400);
  };

  console.log(title, acf);

  return (
    <div className='col-xs-6 col-sm-4 col-md-3'>
      <Link to={`/productos/${slug}`} className='productos__item fadeInUp'>
        <div className='productos__tags'>
          {acf.nuevo && <div className='productos__tags__item productos__tags__item--nuevo'>Nuevo</div>}
          {acf.oferta && <div className='productos__tags__item productos__tags__item--oferta'>Oferta</div>}
          {Number(acf.stock) === 1 && <div className='productos__tags__item productos__tags__item--ultimo'>Último</div>}
        </div>
        <div className='productos__image'>{loading ? <img src={`${loading === 200 ? image.src : imageError}`} alt={props.name} /> : <img src={imageError} alt={props.name} />}</div>
        {acf?.colores?.length > 1 && (
          <div className='productos__colores'>
            {acf.colores.map((x) => {
              return (
                <div className='productos__colores__item' key={x.color} title={x.nombre_color}>
                  <span
                    style={{
                      backgroundColor: x.color,
                    }}
                  ></span>
                </div>
              );
            })}
          </div>
        )}
        <div className='productos__info'>
          <h3 className='productos__title' dangerouslySetInnerHTML={{ __html: title.rendered }}></h3>
          <h4 className='productos__valor color--secundario'>
            {acf.oferta && <span>{MILES(acf['precio_anterior'], '$')}</span>}
            {MILES(acf.precio, '$')}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default Item;
