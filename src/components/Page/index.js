import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';
import { MILES } from '../../ars1';
// import Breadcrumbs from '../Breadcrumbs';

import '../../assets/scss/style/components/Page.scss';

const Page = (props) => {
  const { title, content, acf } = props.data;
  return (
    <section className='page'>
      <div className='page__banner'>{acf.imagen ? <img src={acf.imagen} alt={title.rendered} /> : ''}</div>
      <div className='frame'>
        {props.product ? (
          <div className='page__content admin-content'>
            {/* <Breadcrumbs /> */}
            <div className='row'>
              <div className='col-xs-12 col-md-5'>
                <div className='catalogo__detalle__imagen'>
                  <div className='catalogo__tags'>
                    {acf.nuevo && <div className='catalogo__tags__item catalogo__tags__item--nuevo'>Nuevo</div>}
                    {acf.oferta && <div className='catalogo__tags__item catalogo__tags__item--oferta'>Oferta</div>}
                    {Number(acf.stock) === 1 && <div className='catalogo__tags__item catalogo__tags__item--ultimo'>Último</div>}
                  </div>
                  <img src={acf.imagen} alt='' />
                </div>
              </div>
              <div className='col-xs-12 col-md-7'>
                <div className='catalogo__detalle__info'>
                  <h1 className='catalogo__detalle__info__title'>{title.rendered}</h1>
                  <h2 className='catalogo__detalle__info__valor color--secundario'>
                    {acf.oferta && <span>{MILES(acf['precio_anterior'], '$')}</span>}
                    {MILES(acf.precio, '$')}
                  </h2>
                  {acf['descripcion_corta'] && <p>{acf['descripcion_corta']}</p>}
                  <div className='tabla tabla--borde'>
                    <table>
                      <tbody>
                        {acf.stock && (
                          <tr>
                            <td>Stock</td>
                            <td>{acf.stock}</td>
                          </tr>
                        )}
                        {acf.tallas && (
                          <tr>
                            <td>Tallas</td>
                            <td>{acf.tallas}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {acf.stock && (
                    <a
                      href={`${process.env.REACT_APP_WSP}Hola gente de Mocho, Quiero comprar las calcetas *${title.rendered} - ${MILES(acf.precio, '$')}* ${acf['extra_data']} ${acf.imagen}`}
                      className='catalogo__wsp btn btn--primario'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <span className='catalogo__wsp__name'>Lo quiero</span>
                      <IoLogoWhatsapp />
                    </a>
                  )}
                </div>
              </div>
              <div className='col-xs-12'>
                <div className='page__content__detail' dangerouslySetInnerHTML={{ __html: content.rendered }}></div>
              </div>
            </div>
          </div>
        ) : (
          <div className='page__content'>
            {/* <Breadcrumbs /> */}
            <h1>{title}</h1>
            <div className='page__content__detail' dangerouslySetInnerHTML={{ __html: content.rendered }}></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
