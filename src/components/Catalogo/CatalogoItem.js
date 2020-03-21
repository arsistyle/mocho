import React, { useState } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';

const CatalogoItem = props => {
  const [loading, setImage] = useState(false);
  const image = new Image();
  image.src = props.image;
  image.onload = () => {
    setImage(true);
  };

  let extraData = props.extraData ? `(_Extra: ${props.extraData}_)` : '';

  return (
    <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
      {loading ? (
        <div className='catalogo__item'>
          <div className='catalogo__image'>
            <img src={`${image.src}`} alt={props.name} />
          </div>
          <div className='catalogo__info'>
            <h3 className='catalogo__title'>{props.name}</h3>
            <h4 className='catalogo__valor color--secundario'>{props.valor}</h4>
            {props.state ? (
              <a
                href={`https://wa.me/56981902681?text=Hola gente de Mocho, Quiero comprar las calcetas *${props.name} - ${props.valor}* ${extraData} ${image.src}`}
                className='catalogo__wsp btn btn--primario btn--block-xs'
                target='_blank'
                rel='noopener noreferrer'
              >
                <span className='catalogo__wsp__name'>Lo quiero</span>
                <IoLogoWhatsapp />
              </a>
            ) : (
              <div className='alerta alerta--small alerta--aviso text-align-center-xs'>Sin Stock</div>
            )}
          </div>
        </div>
      ) : (
        <div className='catalogo__item placeholder'>
          <div className='catalogo__image placeholder--child'></div>
          <div className='catalogo__info'>
            <div className='catalogo__title placeholder'>
              <span className='placeholder--child'></span>
              <span className='placeholder--child'></span>
            </div>
            <div className='catalogo__valor placeholder--child'></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogoItem;
