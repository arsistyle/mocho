import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowForward, IoLogoWhatsapp } from 'react-icons/io';

import Image from './Image';

import { getProduct } from '../services';

import { PHProductosDetalle } from './Placeholders';
import Banner from './Banner';
import Breadcrumb from './Breadcrumbs';
import Galeria from './Galeria';

import { HTML, MILES } from '../ars1';
import SEO from './SEO';

const imageError = require('../assets/img/catalogo-error.svg');

const Detalle = () => {
  let { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState([]);
  const [state, setState] = useState(false);
  const [galeria, setGaleria] = useState([]);
  // const [toggler, setToggler] = useState(false);
  const [precios, setPrecios] = useState({
    actual: 0,
    anterior: 0,
  });
  const [stock, setStock] = useState(0);
  const [nombre_color, setColor] = useState(undefined);
  const [options, setOptions] = useState({});

  const handleItem = (el) => {
    const i = Number(el.currentTarget.getAttribute('data-i'));
    const colors = document.querySelectorAll('.productos__colores__item');
    colors.forEach((x) =>
      x.classList.remove('productos__colores__item--active')
    );
    el.currentTarget.classList.add('productos__colores__item--active');
    setPrecios({
      actual: producto?.acf?.colores[i].precio,
      anterior: producto?.acf?.colores[i].precio_anterior,
    });
    setStock(producto?.acf?.colores[i].stock);
    setColor(producto?.acf?.colores[i].nombre_color);
  };

  useEffect(() => {
    const loadProduct = async () => {
      const response = await getProduct(slug);
      if (response[0]) {
        const p = response[0];
        setProducto(p);
        setState('encontrado');
        setOptions({
          items: [
            { to: '/', label: 'Inicio' },
            { to: '/productos', label: 'Productos' },
            {
              to: `/productos/${slug}`,
              label: `${p?.title?.rendered}`,
              active: true,
            },
          ],
        });
        setGaleria([
          // response[0]?.acf?.colores.length > 1 && response[0].acf.imagen,
          ...response[0]?.acf?.colores
            .filter((x) => x.stock > 0)
            .map((x) => x.imagen.url),
        ]);
        setPrecios({
          actual: response[0].acf?.colores[0].precio,
          anterior: response[0].acf?.colores[0].precio_anterior,
        });
        setStock(response[0]?.acf?.colores[0]?.stock);
        setColor(response[0]?.acf?.colores[0]?.nombre_color);
      } else {
        setState('no-encontrado');
        setOptions({
          items: [
            { to: '/', label: 'Inicio' },
            { to: '/productos', label: 'Productos' },
            {
              to: `/productos/${slug}`,
              label: 'Producto no encontrado',
              active: true,
            },
          ],
        });
      }
    };
    loadProduct();
    if (state) setLoading(false);
  }, [slug, state]);

  return !loading ? (
    state === 'no-encontrado' ? (
      <section className='page'>
        <Banner />
        <div className='container-fluid'>
          <div className='frame'>
            <Breadcrumb separator={<IoIosArrowForward />}>
              {options.items.map(({ to, label, active }) => {
                return (
                  <Link
                    className={`breadcrumbs__link ${
                      active && `breadcrumbs__link--active`
                    }`}
                    key={to}
                    to={to}
                    dangerouslySetInnerHTML={{ __html: label }}
                  ></Link>
                );
              })}
            </Breadcrumb>
            <div className='page__content admin-content'>
              <div className='row'>
                <div className='col-xs-12 col-md-5'>
                  <div className='productos__detalle__imagen'>
                    <img src={imageError} alt='' />
                  </div>
                </div>
                <div className='col-xs-12 col-md-7'>
                  <div className='productos__detalle__info'>
                    <h1 className='productos__detalle__info__title'>
                      Producto no encontrado
                    </h1>
                    <p>
                      Haz ingresado una URL de un producto que no tenemos o que
                      no existe, vuelve a navegar en nuestro catálogo.
                    </p>
                    <div className='separador--big'></div>
                    <Link
                      to='/productos'
                      className='btn btn--primario productos__detalle__info__btn'
                    >
                      Ir al Catálogo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ) : (
      <section className='page'>
        <SEO
          title={HTML(producto.title.rendered)}
          image={producto?.acf?.imagen}
          url={`${process.env.REACT_APP_PUBLIC_URL}/productos/${slug}`}
          description={producto.acf.descripcion_corta}
          type='website'
        />
        <Banner imagen={producto?.acf?.imagen} />
        <div className='container-fluid'>
          <div className='frame'>
            <Breadcrumb separator={<IoIosArrowForward />}>
              {options.items.map(({ to, label, active }) => {
                return (
                  <Link
                    className={`breadcrumbs__link ${
                      active && `breadcrumbs__link--active`
                    }`}
                    key={to}
                    to={to}
                    dangerouslySetInnerHTML={{ __html: label }}
                  ></Link>
                );
              })}
            </Breadcrumb>
            <div className='page__content admin-content'>
              <div className='row'>
                <div className='col-xs-12 col-md-5'>
                  <div
                    className={`productos__detalle__imagen ${
                      producto?.acf?.galeria
                        ? 'productos__detalle__imagen--galeria'
                        : ''
                    }`}
                  >
                    <div className='productos__tags'>
                      {producto?.acf?.nuevo && (
                        <div className='productos__tags__item productos__tags__item--nuevo'>
                          Nuevo
                        </div>
                      )}
                      {producto?.acf?.oferta && (
                        <div className='productos__tags__item productos__tags__item--oferta'>
                          Oferta
                        </div>
                      )}
                      {Number(producto?.acf?.stock) === 1 && (
                        <div className='productos__tags__item productos__tags__item--ultimo'>
                          Último
                        </div>
                      )}
                    </div>

                    {galeria.length > 1 ? (
                      <Galeria
                        data={galeria}
                        className='productos__galeria'
                        slug={slug}
                      />
                    ) : (
                      <Image
                        src={producto?.acf?.imagen}
                        alt={producto?.title.rendered}
                      />
                    )}
                  </div>
                </div>
                <div className='col-xs-12 col-md-7'>
                  <div className='productos__detalle__info'>
                    <h1 className='productos__detalle__info__title'>
                      {HTML(producto.title.rendered)}
                    </h1>
                    {producto?.acf?.colores.length > 1 && (
                      <h3 className='productos__detalle__info__colorName'>
                        {nombre_color}
                      </h3>
                    )}
                    <h2 className='productos__detalle__info__valor color--secundario'>
                      {producto?.acf?.oferta && (
                        <span>{MILES(precios.anterior, '$')}</span>
                      )}
                      {MILES(precios.actual, '$')}
                    </h2>
                    {producto?.acf['descripcion_corta'] && (
                      <p className='productos__detalle__info__desc'>
                        {producto?.acf['descripcion_corta']}
                      </p>
                    )}
                    {(producto?.acf?.stock || producto?.acf?.tallas) && (
                      <div className='productos__detalle__info__tabla tabla tabla--borde'>
                        <table>
                          <tbody>
                            {producto?.acf?.stock && (
                              <tr>
                                <td>Stock</td>
                                <td>{stock}</td>
                              </tr>
                            )}
                            {producto?.acf?.tallas && (
                              <tr>
                                <td>Tallas</td>
                                <td>{producto?.acf?.tallas}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {producto?.acf?.colores?.length > 1 && (
                      <>
                        <p>Selecciona tu color</p>
                        <div className='productos__colores productos__colores--detalle'>
                          {producto?.acf?.colores
                            .filter((x) => x.stock > 0)
                            .map((x, i) => {
                              return (
                                <a
                                  href={`#${slug}${i + 1}`}
                                  className={`productos__colores__item ${
                                    x.imagen_color === 'imagen' &&
                                    'productos__colores__item--imagen'
                                  }`}
                                  onClick={handleItem}
                                  name={slug}
                                  id={x.nombre_color}
                                  data-i={i}
                                  key={i}
                                >
                                  {x.imagen_color === 'imagen' ? (
                                    <Image
                                      src={x.imagen.sizes.thumbnail}
                                      alt={x.alt}
                                    />
                                  ) : (
                                    <span
                                      style={{
                                        backgroundColor: x.color,
                                      }}
                                    ></span>
                                  )}
                                </a>
                              );
                            })}
                        </div>
                      </>
                    )}
                    <a
                      href={`${
                        process.env.REACT_APP_WSP
                      }Hola gente de Mocho%2C%0D%0AQuiero comprar las calcetas%3A%0D%0A%2A${producto?.title.rendered.replace(
                        '&#8211;',
                        '-'
                      )}%2A%0D%0A%2A${MILES(precios.actual, '$')}%2A${
                        producto?.acf?.colores?.length > 1
                          ? `%0D%0A%2AColor: ${nombre_color}%2A`
                          : ''
                      }%0D%0A${producto?.acf?.extra_data}%0D%0A${
                        producto?.acf?.imagen
                      }`}
                      className='btn btn--primario productos__detalle__info__btn'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <span>Lo quiero</span>
                      <IoLogoWhatsapp />
                    </a>
                  </div>
                </div>
                <div className='col-xs-12'>
                  <div
                    className='page__content__detail'
                    dangerouslySetInnerHTML={{
                      __html: producto?.acf?.contenido,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  ) : (
    <PHProductosDetalle />
  );
};

export default Detalle;
