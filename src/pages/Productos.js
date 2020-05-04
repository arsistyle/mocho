import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons';
import { Banner } from '../components/Banner';
import Breadcrumb from '../components/Breadcrumbs';
import ListaProductos from '../components/Productos';

const Productos = (props) => {
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
              <ListaProductos id={id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Productos;
