import React from 'react';
import Productos from '../Productos/Listado';
import Breadcrumb from '../Breadcrumbs';
import { Link } from 'react-router-dom';
import { IoLogoWhatsapp, IoIosArrowForward } from 'react-icons/io';
import { MILES } from '../../ars1';

import '../../assets/scss/style/components/Page.scss';
import '../../assets/scss/style/components/Banner.scss';

export const Banner = (props) => {
  let { imagen, title, subtitle, container } = props;
  return (
    <div className={`banner ${container && 'banner--container'}`}>
      {imagen ? <img src={imagen} alt={title} /> : ''}
      {container && (
        <div className='banner__container'>
          <div className='frame'>
            <h1 className='banner__title'>{title}</h1>
            <p className='banner__subtitle'>{subtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const ListadoProductos = (props) => {
  const { id, data } = props;
  const { title, content, acf } = data;
  const options = {
    items: [
      { to: '/', label: 'Inicio' },
      { to: '/productos', label: 'Productos', active: true },
    ],
  };
  id &&
    options.items.push({
      to: `/productos/${data.slug}`,
      label: title.rendered,
      active: true,
    }) &&
    (options.items[1].active = false);
  return (
    <section className='page'>
      <Banner imagen={acf.imagen} title={title.rendered} subtitle={acf.subtitle} container='true' />
      <div className='frame'>
        <Breadcrumb separator={<IoIosArrowForward />}>
          {options.items.map(({ to, label, active }) => {
            return (
              <Link className={`breadcrumbs__link ${active && `breadcrumbs__link--active`}`} key={to} to={to}>
                {label}
              </Link>
            );
          })}
        </Breadcrumb>
        <div className='page__content'>
          <div className='page__content__detail' dangerouslySetInnerHTML={{ __html: content.rendered }}></div>
          <Productos id={id} />
        </div>
      </div>
    </section>
  );
};

export const DetalleProducto = (props) => {
  const { title, slug, content, acf } = props.data;
  const options = {
    items: [
      { to: '/', label: 'Inicio' },
      { to: '/productos', label: 'Productos' },
      { to: `/productos/${slug}`, label: `${title.rendered}`, active: true },
    ],
  };
  return (
    <section className='page'>
      <Banner imagen={acf.imagen} />
      <div className='frame'>
        <Breadcrumb separator={<IoIosArrowForward />}>
          {options.items.map(({ to, label, active }) => {
            return (
              <Link className={`breadcrumbs__link ${active && `breadcrumbs__link--active`}`} key={to} to={to}>
                {label}
              </Link>
            );
          })}
        </Breadcrumb>
        <div className='page__content admin-content'>
          {/* <Breadcrumbs /> */}
          <div className='row'>
            <div className='col-xs-12 col-md-5'>
              <div className='productos__detalle__imagen'>
                <div className='productos__tags'>
                  {acf.nuevo && <div className='productos__tags__item productos__tags__item--nuevo'>Nuevo</div>}
                  {acf.oferta && <div className='productos__tags__item productos__tags__item--oferta'>Oferta</div>}
                  {Number(acf.stock) === 1 && <div className='productos__tags__item productos__tags__item--ultimo'>Último</div>}
                </div>
                <img src={acf.imagen} alt='' />
              </div>
            </div>
            <div className='col-xs-12 col-md-7'>
              <div className='productos__detalle__info'>
                <h1 className='productos__detalle__info__title'>{title.rendered}</h1>
                <h2 className='productos__detalle__info__valor color--secundario'>
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
                    className='productos__wsp btn btn--primario'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <span className='productos__wsp__name'>Lo quiero</span>
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
      </div>
    </section>
  );
};

const Page = (props) => {
  const { title, content, acf } = props.data;
  return (
    <section className='page'>
      <div className='page__banner'>{acf.imagen ? <img src={acf.imagen} alt={title.rendered} /> : ''}</div>
      <div className='frame'>
        <div className='page__content'>
          {/* <Breadcrumbs /> */}
          <h1>{title}</h1>
          <div className='page__content__detail' dangerouslySetInnerHTML={{ __html: content.rendered }}></div>
        </div>
      </div>
    </section>
  );
};

export const PageLoading = () => {
  return (
    <section className='page'>
      <div className='page__banner'></div>
      <div className='frame'>
        <div className='page__content'></div>
      </div>
    </section>
  );
};

export default Page;
