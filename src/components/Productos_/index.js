/**
 * MODULES
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { IoIosArrowForward, IoLogoWhatsapp } from 'react-icons/io';

/**
 * SERVICES
 */
import { getProducts, getProduct, getPage } from '../../services';

/**
 * PAGES
 */
import { PageLoading, Error404 } from '../../pages';

/**
 * ARS1
 */
import { MILES } from '../../ars1';

/**
 * COMPONENTS
 */
import Banner from '../Banner';
import Breadcrumb from '../Breadcrumbs';
import Galeria from '../Galeria';

/**
 * ASSETS
 */
import imageError from '../../assets/img/catalogo-error.svg';
import '../../assets/scss/style/components/Productos.scss';
import '../../assets/scss/style/components/Page.scss';

export const Detalle = () => {
  let { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    async function loadProduct() {
      const response = await getProduct(slug);
      if (response) {
        setProducto(response[0]);
        setLoading(false);
        // console.log(response);
      }
    }
    loadProduct();
  }, [slug]);

  const Load = () => (
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

  const Content = () => {
    const [toggler, setToggler] = useState(false);
    if (typeof producto.length) {
      const { title, slug, acf } = producto;
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
                  return <Link className={`breadcrumbs__link ${active && `breadcrumbs__link--active`}`} key={to} to={to} dangerouslySetInnerHTML={{ __html: label }}></Link>;
                })}
              </Breadcrumb>
              <div className='page__content admin-content'>
                <div className='row'>
                  <div className='col-xs-12 col-md-5'>
                    <div className={`productos__detalle__imagen ${acf.galeria ? 'productos__detalle__imagen--galeria' : ''}`} onClick={() => setToggler(!toggler)}>
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
                      {acf?.colores?.length > 1 && (
                        <div className='productos__colores productos__colores--detalle'>
                          {acf.colores.map((x) => {
                            return (
                              <label className='productos__colores__item' key={x.color} title={x.nombre_color} for={x.nombre_color}>
                                <input type='radio' name={slug} id={x.nombre_color} />
                                <span
                                  style={{
                                    backgroundColor: x.color,
                                  }}
                                ></span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                      {acf.stock && (
                        <a
                          href={`${process.env.REACT_APP_WSP}Hola+gente+de+Mocho%2C%0D%0AQuiero+comprar+las+calcetas%3A%0D%0A%2A${title.rendered.replace('&#8211;', '-')}%2A%0D%0A%2A${MILES(
                            acf.precio,
                            '$'
                          )}%2A%0D%0A${acf.extra_data}%0D%0A${acf.imagen}`}
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
      return <Error404 error='401' desc='El producto no existe.' />;
    }
  };

  return producto ? loading ? <PageLoading content={Load} /> : <Content /> : <Error404 />;
};

export const Item = ({ data }) => {
  const { acf, slug, title, name } = data;
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
      <Link to={`/productos/${slug}`} className='productos__item fadeInUp'>
        <div className='productos__tags'>
          {acf.nuevo && <div className='productos__tags__item productos__tags__item--nuevo'>Nuevo</div>}
          {acf.oferta && <div className='productos__tags__item productos__tags__item--oferta'>Oferta</div>}
          {Number(acf.stock) === 1 && <div className='productos__tags__item productos__tags__item--ultimo'>Último</div>}
        </div>
        <div className='productos__image'>{loading ? <img className='fadeIn' src={`${loading === 200 ? image.src : imageError}`} alt={name} /> : <img src={imageError} alt={name} />}</div>
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

export const ListaProductos = ({ id, totalItems }) => {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);

  console.log(id);

  useEffect(() => {
    async function loadProducts() {
      const response = await getProducts(id, totalItems && Number(totalItems));
      if (response) {
        setProductos(response);
        setLoading(false);
      }
    }
    loadProducts();
  }, [id, totalItems]);

  const items = [];
  for (let i = 0; i < 4; i++) {
    items.push(
      <div className='col-xs-6 col-sm-4 col-md-3' key={i}>
        <div className='productos__item placeholder'>
          <div className='productos__image placeholder--child'></div>
          <div className='productos__info'>
            <div className='productos__title placeholder'>
              <span className='placeholder--child'></span>
              <span className='placeholder--child'></span>
            </div>
            <div className='productos__valor placeholder--child'></div>
          </div>
        </div>
      </div>
    );
  }

  const Placeholder = () => (
    <div className='col-xs-6 col-sm-4 col-md-3'>
      <div className='productos__item placeholder'>
        <div className='productos__image placeholder--child'></div>
        <div className='productos__info'>
          <div className='productos__title placeholder'>
            <span className='placeholder--child'></span>
            <span className='placeholder--child'></span>
          </div>
          <div className='productos__valor placeholder--child'></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='row'>
      {!loading &&
        productos
          .filter((x) => Number(x.acf.stock) > 0)
          .map((item, i) => (
            <LazyLoad key={i} placeholder={<Placeholder />}>
              <Item data={item} />
            </LazyLoad>
          ))}
      {!loading && !productos.length && (
        <div className='col-xs-12'>
          <div className='alerta alerta--aviso'>Estamos sin stock en esta categoría</div>
        </div>
      )}
    </div>
  );
};

const Page = ({ slug, id }) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState([]);
  const { title, content, acf } = page;
  const options = {
    items: [
      { to: '/', label: 'Inicio' },
      { to: '/productos', label: 'Productos', active: true },
    ],
  };
  !loading &&
    id &&
    options.items.push({
      to: `/productos/${page.slug}`,
      label: title.rendered,
      active: true,
    }) &&
    (options.items[1].active = false);

  useEffect(() => {
    async function loadPage() {
      const response = await getPage(slug);
      if (response) {
        setPage(response[0]);
        setLoading(false);
      }
    }
    loadPage();
  }, [slug]);

  const Content = () => (
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
              <ListaProductos id={id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return loading ? <PageLoading /> : <Content />;
};

export default Page;
