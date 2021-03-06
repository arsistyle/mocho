import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowForward, IoLogoWhatsapp } from 'react-icons/io';
import { AiOutlineZoomIn } from 'react-icons/ai';
import { getProduct } from '../../services';
import { PlaceholderDetalle } from '../Placeholders';
import Banner from '../Banner';
import Breadcrumb from '../Breadcrumbs';
import Galeria from '../Galeria';
import { MILES } from '../../ars1';


const Detalle = () => {
  let { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState([]);
  const [galeria, setGaleria] = useState([]);
  const [toggler, setToggler] = useState(false);
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [nombre_color, setColor] = useState(undefined);
  const options = {
    items: [
      { to: '/', label: 'Inicio' },
      { to: '/productos', label: 'Productos' },
      { to: `/productos/${slug}`, label: `${producto?.title?.rendered}`, active: true },
    ],
  };

  const handleItem = (el) => {
    const i = el.currentTarget.getAttribute('data-i');
    setPrecio(producto?.acf?.colores[i]?.precio);
    setStock(producto?.acf?.colores[i]?.stock);
    setColor(producto?.acf?.colores[i]?.nombre_color);
  };

  useEffect(() => {
    async function loadProduct() {
      const response = await getProduct(slug);
      if (response) {
        setProducto(response[0]);
        setGaleria(response[0]?.acf?.colores.filter(x => x.stock > 0).map(x => x.imagen));
        setPrecio(response[0]?.acf?.colores[0]?.precio);
        setStock(response[0]?.acf?.colores[0]?.stock);
        setColor(response[0]?.acf?.colores[0]?.nombre_color);
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  return !loading ? (
    <section className='page'>
      {producto?.acf?.galeria && <Galeria data={galeria} toggler={toggler} />}
      <Banner imagen={producto?.acf?.imagen} />
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
                <div className={`productos__detalle__imagen ${producto?.acf?.galeria ? 'productos__detalle__imagen--galeria' : ''}`} onClick={() => setToggler(!toggler)}>
                  <div className='productos__tags'>
                    {producto?.acf?.nuevo && <div className='productos__tags__item productos__tags__item--nuevo'>Nuevo</div>}
                    {producto?.acf?.oferta && <div className='productos__tags__item productos__tags__item--oferta'>Oferta</div>}
                    {Number(producto?.acf?.stock) === 1 && <div className='productos__tags__item productos__tags__item--ultimo'>Último</div>}
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
                  <h1 className='productos__detalle__info__title' dangerouslySetInnerHTML={{ __html: producto?.title.rendered }}></h1>
                  <h2 className='productos__detalle__info__valor color--secundario'>
                    {producto?.acf?.oferta && <span>{MILES(producto?.acf['precio_anterior'], '$')}</span>}
                    {MILES(precio, '$')}
                  </h2>
                  {producto?.acf['descripcion_corta'] && <p className='productos__detalle__info__desc'>{producto?.acf['descripcion_corta']}</p>}
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
                              <label className='productos__colores__item' key={x.color} title={x.nombre_color} htmlFor={x.nombre_color}>
                                <input type='radio' name={slug} id={x.nombre_color} onChange={handleItem} data-i={i} />
                                <span
                                  style={{
                                    backgroundColor: x.color,
                                  }}
                                ></span>
                              </label>
                            );
                          })}
                      </div>
                    </>
                  )}
                  <a
                    href={`${process.env.REACT_APP_WSP}Hola gente de Mocho%2C%0D%0AQuiero comprar las calcetas%3A%0D%0A%2A${producto?.title.rendered.replace('&#8211;', '-')}%2A%0D%0A%2A${MILES(
                      producto?.acf?.precio,
                      '$'
                    )}%2A${producto?.acf?.colores?.length > 1 ? `%0D%0A%2AColor: ${nombre_color}%2A` : ''}%0D%0A${producto?.acf?.extra_data}%0D%0A${producto?.acf?.imagen}`}
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
                <div className='page__content__detail' dangerouslySetInnerHTML={{ __html: producto?.acf?.contenido }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <PlaceholderDetalle />
  );
};

export default Detalle;
