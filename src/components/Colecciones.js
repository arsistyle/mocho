import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

import { getPage } from '../services';

import { PHColecciones } from './Placeholders';

import SEO from './SEO';
import Banner from './Banner';
import Breadcrumb from './Breadcrumbs';
import ColeccionesLista from './Colecciones--Lista';

import '../assets/scss/style/components/Colecciones.scss';
import '../assets/scss/style/components/Page.scss';
import { HTML } from '../ars1';

const Colecciones = ({ slug, id }) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState([]);
  const { title, content, acf } = page;
  const options = {
    items: [
      { to: '/', label: 'Inicio' },
      { to: '/colecciones', label: 'Colecciones', active: true },
    ],
  };

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
    <PHColecciones />
  ) : (
    <section className='page'>
      <SEO title={HTML(title.rendered)} />
      <Banner
        imagen={acf.imagen}
        title={HTML(title.rendered)}
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
            <div className='colecciones'>
              <ColeccionesLista />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Colecciones;
