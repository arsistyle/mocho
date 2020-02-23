import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';

const CatalogoItem = props => {
  return (
    <div className="col-xs-12 col-md-6 col-lg-4 col-xl-3">
      <div className="catalogo__item">
        <div className="catalogo__image">
          <img src={props.image} alt={props.name}/>
        </div>
        <div className="catalogo__info">
          {
            props.state ? (
              <a href={props.wsp} className="catalogo__wsp btn btn--whatsapp btn--block-xs" target="_blank" rel="noopener noreferrer">
                <span className="catalogo__wsp__name">Lo quiero</span>
                <IoLogoWhatsapp />
              </a>
            ) : (
              <div className="alerta alerta--small alerta--aviso text-align-center-xs">Sin Stock</div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CatalogoItem;
