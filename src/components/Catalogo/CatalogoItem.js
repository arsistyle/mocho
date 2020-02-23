import React, { useState } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';

const CatalogoItem = props => {
  const [loading, setImage] = useState(false);
  const image = new Image();
  image.src = props.image;
  image.onload = () => {
    setImage(true);
  };
  

  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
      <div className="catalogo__item">
        <div className="catalogo__image">
          {loading ? (
            <img src={props.image} alt={props.name} />
          ) : (
            <div className="catalogo__preloader"><span></span></div>
          )}
        </div>
        <div className="catalogo__info">
          <h3 className="catalogo__title">{props.name}</h3>
          <h4 className="catalogo__valor color--primario">{props.valor}</h4>
          {props.state ? (
            <a
              href={props.wsp}
              className="catalogo__wsp btn btn--whatsapp btn--block-xs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="catalogo__wsp__name">Lo quiero</span>
              <IoLogoWhatsapp />
            </a>
          ) : (
            <div className="alerta alerta--small alerta--aviso text-align-center-xs">
              Sin Stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogoItem;
