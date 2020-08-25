import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowForward, IoLogoWhatsapp } from 'react-icons/io';
import { AiOutlineZoomIn } from 'react-icons/ai';

import { getProduct } from '../services';

import { PHProductosDetalle } from './Placeholders';
import Banner from './Banner';
import Breadcrumb from './Breadcrumbs';
import Galeria from './Galeria';

import { MILES } from '../ars1';

const imageError = require('../assets/img/catalogo-error.svg');

const Detalle = () => {
  let { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState([]);
  const [galeria, setGaleria] = useState([]);
  const [toggler, setToggler] = useState(false);
  const [precios, setPrecios] = useState({
    actual: 0,
    anterior: 0,
  });
  const [stock, setStock] = useState(0);
  const [nombre_color, setColor] = useState(undefined);
  const [options, setOptions] = useState({});

  const handleItem = (el) => {
    const i = el.currentTarget.getAttribute('data-i');
    setPrecios({
      actual: producto?.acf?.colores[i].precio,
      anterior: producto?.acf?.colores[i].precio_anterior,
    });
    setStock(producto?.acf?.colores[i].stock);
    setColor(producto?.acf?.colores[i].nombre_color);
  };

  useEffect(() => {
    async function loadProduct() {
      const response = await getProduct(slug);

      if (response[0]) {
        setProducto({
          state: 'encontrado',
          ...response[0],
        });
        setOptions({
          items: [
            { to: '/', label: 'Inicio' },
            { to: '/productos', label: 'Productos' },
            { to: `/productos/${slug}`, label: `${producto?.title?.rendered}`, active: true },
          ],
        });
        setGaleria(response[0]?.acf?.colores.filter((x) => x.stock > 0).map((x) => x.imagen));
        setPrecios({
          actual: response[0].acf?.colores[0].precio,
          anterior: response[0].acf?.colores[0].precio_anterior,
        });
        setStock(response[0]?.acf?.colores[0]?.stock);
        setColor(response[0]?.acf?.colores[0]?.nombre_color);
      } else {
        setProducto({
          state: 'no_encontrado',
        });
        setOptions({
          items: [
            { to: '/', label: 'Inicio' },
            { to: '/productos', label: 'Productos' },
            { to: `/productos/${slug}`, label: 'Producto no encontrado', active: true },
          ],
        });
      }
    }
    loadProduct();
    if (producto.state) setLoading(false);
  }, [options, producto, slug]);

  return !loading ? (
    producto.state === 'no_encontrado' ? (
      <section className='page'>
        <Banner />
        <div className='container-fluid'>
          <div className='frame'>
            <Breadcrumb separator={<IoIosArrowForward />}>
              {options.items.map(({ to, label, active }) => {
                return (
                  <Link
                    className={`breadcrumbs__link ${active && `breadcrumbs__link--active`}`}
                    key={to}
                    to={to}
                    dangerouslySetInnerHTML={{ __html: label }}></Link>
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
                    <h1 className='productos__detalle__info__title'>Producto no encontrado</h1>
                    <p>
                      Haz ingresado una URL de un producto que no tenemos o que no existe, vuelve a
                      navegar en nuestro catálogo.
                    </p>
                    <div className="separador--big"></div>
                    <Link
                      to='/productos'
                      className='btn btn--primario productos__detalle__info__btn'>
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
        {producto?.acf?.galeria && <Galeria data={galeria} toggler={toggler} />}
        <Banner imagen={producto?.acf?.imagen} />
        <div className='container-fluid'>
          <div className='frame'>
            <Breadcrumb separator={<IoIosArrowForward />}>
              {options.items.map(({ to, label, active }) => {
                return (
                  <Link
                    className={`breadcrumbs__link ${active && `breadcrumbs__link--active`}`}
                    key={to}
                    to={to}
                    dangerouslySetInnerHTML={{ __html: label }}></Link>
                );
              })}
            </Breadcrumb>
            <div className='page__content admin-content'>
              <div className='row'>
                <div className='col-xs-12 col-md-5'>
                  <div
                    className={`productos__detalle__imagen ${
                      producto?.acf?.galeria ? 'productos__detalle__imagen--galeria' : ''
                    }`}
                    onClick={() => setToggler(!toggler)}>
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
                    <img src={producto?.acf?.imagen} alt='' />
                    {producto?.acf?.galeria && (
                      <div className='productos__detalle__zoom'>
                        <AiOutlineZoomIn />
                      </div>
                    )}
                  </div>
                </div>
                <div className='col-xs-12 col-md-7'>
                  <div className='productos__detalle__info'>
                    <h1
                      className='productos__detalle__info__title'
                      dangerouslySetInnerHTML={{ __html: producto?.title.rendered }}></h1>
                    <h2 className='productos__detalle__info__valor color--secundario'>
                      {producto?.acf?.oferta && <span>{MILES(precios.anterior, '$')}</span>}
                      {MILES(precios.actual, '$')}
                    </h2>
                    {producto?.acf['descripcion_corta'] && (
                      <p className='productos__detalle__info__desc'>
                        {producto?.acf['descripcion_corta']}
                      </p>
                    )}
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
                    {producto?.acf?.colores?.length > 1 && (
                      <>
                        <p>Selecciona tu color</p>
                        <div className='productos__colores productos__colores--detalle'>
                          {producto?.acf?.colores
                            .filter((x) => x.stock > 0)
                            .map((x, i) => {
                              return (
                                <label
                                  className='productos__colores__item'
                                  key={x.color}
                                  title={x.nombre_color}
                                  htmlFor={x.nombre_color}>
                                  <input
                                    type='radio'
                                    name={slug}
                                    id={x.nombre_color}
                                    onChange={handleItem}
                                    data-i={i}
                                  />
                                  <span
                                    style={{
                                      backgroundColor: x.color,
                                    }}></span>
                                </label>
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
                      }%0D%0A${producto?.acf?.extra_data}%0D%0A${producto?.acf?.imagen}`}
                      className='btn btn--primario productos__detalle__info__btn'
                      target='_blank'
                      rel='noopener noreferrer'>
                      <span>Lo quiero</span>
                      <IoLogoWhatsapp />
                    </a>
                  </div>
                </div>
                <div className='col-xs-12'>
                  <div
                    className='page__content__detail'
                    dangerouslySetInnerHTML={{ __html: producto?.acf?.contenido }}></div>
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
