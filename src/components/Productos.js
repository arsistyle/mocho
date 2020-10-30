import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

import { getPage } from '../services';

import { PHProductos } from './Placeholders';

import Banner from './Banner';
import Breadcrumb from './Breadcrumbs';
import ProductosLista from './Productos--Lista';
import SEO from './SEO';

import '../assets/scss/style/components/Productos.scss';
import '../assets/scss/style/components/Page.scss';
import { HTML } from '../ars1';

const Productos = ({ slug, id }) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState([]);
  const { title, content, acf, colecciones_id } = page;
  const options = {
    items: [
      { to: '/', label: 'Inicio' },
      { to: '/productos', label: 'Productos', active: true },
    ],
  };
  !loading &&
    (id || page.parent) &&
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

  return loading ? (
    <PHProductos />
  ) : (
    <>
      <SEO
        title={HTML(title.rendered)}
        description={acf.description}
        url={`${process.env.REACT_APP_PUBLIC_URL}/productos`}
        image={acf.image_og}
      />
      <section className='page'>
        <Banner
          imagen={acf.imagen}
          title={title.rendered}
          subtitle={acf.subtitle}
          container='true'
        />
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
            <div className='page__content'>
              <div
                className='page__content__detail'
                dangerouslySetInnerHTML={{ __html: content.rendered }}
              ></div>
              <div className='productos'>
                <ProductosLista id={colecciones_id} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Productos;
