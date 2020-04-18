import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MILES } from '../../ars1';
// import Img from 'react-cool-img';
// import { IoLogoWhatsapp } from 'react-icons/io';
const imageError = require('../../assets/img/catalogo-error.svg');

const CatalogoItem = (props) => {
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

  return (
    <div className='col-xs-6 col-sm-4 col-md-3'>
      <Link to={`/${slug}`} className='catalogo__item'>
        <div className='catalogo__tags'>
          {acf.nuevo && <div className='catalogo__tags__item catalogo__tags__item--nuevo'>Nuevo</div>}
          {acf.oferta && <div className='catalogo__tags__item catalogo__tags__item--oferta'>Oferta</div>}
          {Number(acf.stock) === 1 && <div className='catalogo__tags__item catalogo__tags__item--ultimo'>Último</div>}
        </div>
        <div className='catalogo__image'>{loading ? <img src={`${loading === 200 ? image.src : imageError}`} alt={props.name} /> : <img src={imageError} alt={props.name} />}</div>
        <div className='catalogo__info'>
          <h3 className='catalogo__title'>{title.rendered}</h3>
          <h4 className='catalogo__valor color--secundario'>
            {acf.oferta && <span>{MILES(acf['precio_anterior'], '$')}</span>}
            {MILES(acf.precio, '$')}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default CatalogoItem;
