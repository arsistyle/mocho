/**
 * MODULES
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * COMPONENTS
 */
import Banner from '../components/Banner';

/**
 * ASSETS
 */
import '../assets/scss/style/components/Error404.scss';
import gif from '../assets/img/lost.gif';

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

export const Error404 = ({ error, desc }) => (
  <section className='error404'>
    <div className='error404__bg'>
      <img src={gif} alt='Error 404' />
    </div>
    <div className='error404__content'>
      <h1 className='error404__title'>{error ? error : '404'}</h1>
      <p className='error404__desc'>{desc ? desc : 'La URl ingresada no existe.'}</p>
      <Link to='/' className='btn btn--primario btn--borde'>
        Ir al inicio
      </Link>
    </div>
  </section>
);
