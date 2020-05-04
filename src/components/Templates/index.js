import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import Productos from '../Productos/Listado';
import Breadcrumb from '../Breadcrumbs';
import Error404 from '../Error404';
import { Link } from 'react-router-dom';
import { IoLogoWhatsapp, IoIosArrowForward } from 'react-icons/io';
import { MILES } from '../../ars1';

import '../../assets/scss/style/components/Page.scss';
import '../../assets/scss/style/components/Banner.scss';

function Galeria(props) {
  const types = props.data.map((x) => x.item);
  const sources = props.data.map((x) => Object.values(x).filter(Boolean).splice(1)).flat();
  return <FsLightbox types={types} toggler={props.toggler} sources={sources} />;
}

export const Banner = (props) => {
  let { imagen, title, subtitle, container, placeholder } = props;
  return (
    <div className={`banner ${container && 'banner--container'} ${placeholder && 'placeholder--child'}`}>
      {imagen ? <img src={imagen} alt={title} /> : ''}
      {container && (
        <div className='banner__container'>
          <div className='frame'>
            <h1 className='banner__title fadeInDown'>{title}</h1>
            <p className='banner__subtitle fadeInDown'>{subtitle}</p>
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
      <div className='container-fluid'>
        <div className='frame'>
          <Breadcrumb separator={<IoIosArrowForward />}>
            {options.items.map(({ to, label, active }) => {
              return <Link className={`breadcrumbs__link ${active && `breadcrumbs__link--active`}`} key={to} to={to} dangerouslySetInnerHTML={{ __html: label }}></Link>;
            })}
          </Breadcrumb>
          <div className='page__content'>
            <div className='page__content__detail' dangerouslySetInnerHTML={{ __html: content.rendered }}></div>
            <div className='productos'>
              <Productos id={id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const DetalleProducto = (props) => {
  const [toggler, setToggler] = useState(false);
  if (typeof props.data === 'object') {
    const { title, slug, acf } = props.data;
    const options = {
      items: [
        { to: '/', label: 'Inicio' },
        { to: '/productos', label: 'Productos' },
        { to: `/productos/${slug}`, label: `${title.rendered}`, active: true },
      ],
    };

    return (
      <section className='page'>
        {acf.galeria && <Galeria data={acf.galeria} toggler={toggler} />}
        <Banner imagen={acf.imagen} />
        <div className='container-fluid'>
          <div className='frame'>
            <Breadcrumb separator={<IoIosArrowForward />}>
              {options.items.map(({ to, label, active }) => {
                return (
                  <Link className={`breadcrumbs__link ${active && `breadcrumbs__link--active`}`} key={to} to={to} dangerouslySetInnerHTML={{ __html: label }}></Link>
                );
              })}
            </Breadcrumb>
            <div className='page__content admin-content'>
              <div className='row'>
                <div className='col-xs-12 col-md-5'>
                  <div className='productos__detalle__imagen' onClick={() => setToggler(!toggler)}>
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
                    <h1 className='productos__detalle__info__title' dangerouslySetInnerHTML={{ __html: title.rendered }}></h1>
                    <h2 className='productos__detalle__info__valor color--secundario'>
                      {acf.oferta && <span>{MILES(acf['precio_anterior'], '$')}</span>}
                      {MILES(acf.precio, '$')}
                    </h2>
                    {acf['descripcion_corta'] && <p className='productos__detalle__info__desc'>{acf['descripcion_corta']}</p>}
                    <div className='productos__detalle__info__tabla tabla tabla--borde'>
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
                        className='btn btn--primario productos__detalle__info__btn'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <span>Lo quiero</span>
                        <IoLogoWhatsapp />
                      </a>
                    )}
                  </div>
                </div>
                <div className='col-xs-12'>
                  <div className='page__content__detail' dangerouslySetInnerHTML={{ __html: acf.contenido }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <Error404 error="401" desc="El producto no existe."/>
  }
};

export const DetalleProductoPlaceholder = () => (
  <div className='container-fluid'>
    <div className='frame'>
      <div className='page__content admin-content'>
        <div className='row'>
          <div className='col-xs-12 col-md-5'>
            <div className='productos__detalle__imagen placeholder--child'></div>
          </div>
          <div className='col-xs-12 col-md-7'>
            <div className='productos__detalle__info'>
              <div className='productos__detalle__info__title placeholder--child'></div>
              <div className='productos__detalle__info__valor placeholder--child'></div>
              <div className='productos__detalle__info__desc placeholder--child'></div>
              <div className='productos__detalle__info__btn placeholder--child'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const PageLoading = ({ content: Content }) => {
  return (
    <section className='page'>
      <Banner placeholder />
      <div className='frame'>
        <div className='page__content page__content--loading'>{Content && <Content />}</div>
      </div>
    </section>
  );
};

const Page = (props) => {
  const { title, content, acf } = props.data;
  return (
    <section className='page'>
      <Banner imagen={acf.imagen} title={title} />
      <div className='frame'>
        <div className='page__content'>
          <div className='page__content__detail' dangerouslySetInnerHTML={{ __html: content.rendered }}></div>
        </div>
      </div>
    </section>
  );
};

export default Page;
