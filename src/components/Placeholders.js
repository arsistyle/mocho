import React from 'react';
import Banner from './Banner';

export const PHHero = () => (
  <section className='hero placeholder'>
    <div className='hero__bg placeholder--child'></div>
    <div className='hero__container'>
      <div className='hero__title placeholder'>
        <span className='placeholder--child'></span>
        <span className='placeholder--child'></span>
      </div>
      <div className='hero__btn hero__btn--placeholder placeholder--child'></div>
    </div>
  </section>
);

export const PHBreadcrumbs = () => (
  <div className='breadcrumbs breadcrumbs--placeholder'>
    <div className='breadcrumbs__item breadcrumbs__item--placeholder placeholder--child'></div>
    <div className='breadcrumbs__item breadcrumbs__item--placeholder placeholder--child'></div>
  </div>
);

export const PHHome = () => (
  <>
    <section className='hero placeholder'>
      <div className='hero__bg placeholder--child'></div>
      <div className='hero__container'>
        <div className='hero__title placeholder'>
          <span className='placeholder--child'></span>
          <span className='placeholder--child'></span>
        </div>
        <div className='hero__btn hero__btn--placeholder placeholder--child'></div>
      </div>
    </section>
    <div className='container-fluid productos'>
      <div className='frame'>
        <div className='productos__section'>
          <div className='productos__section__title productos__section__title--placeholder placeholder--child'></div>
          <PHProductosLista />
          <div className='productos__section__btns'>
            <div className='productos__section__btns__item productos__section__btns__item--placeholder placeholder--child'></div>
            <div className='separador'></div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export const PHProductosLista = ({ total = 4 }) => {
  const items = [];
  for (let i = 0; i < total; i++) {
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
  return <div className='row'>{items}</div>;
};

export const PHProductos = () => (
  <section className='page'>
    <Banner placeholder container />
    <div className='container-fluid'>
      <div className='frame'>
        <PHBreadcrumbs />
        <div className='page__content page__content--loading'>
          <PHProductosLista />
        </div>
      </div>
    </div>
  </section>
);

export const PHProductosDetalle = () => (
  <section className='page'>
    <Banner placeholder={true} />
    <div className='container-fluid'>
      <div className='frame'>
        <PHBreadcrumbs />
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
  </section>
);

export const PHColeccionesLista = ({ total = 2 }) => {
  const items = [];
  for (let i = 0; i < total; i++) {
    items.push(
      <div className='col-xs-12 col-md-6' key={i}>
        <div className='colecciones__item placeholder'>
          <div className='colecciones__image colecciones__image--placeholder placeholder--child'></div>
        </div>
      </div>
    );
  }
  return <div className='row'>{items}</div>;
};

export const PHColecciones = () => (
  <section className='page'>
    <Banner placeholder container />
    <div className='container-fluid'>
      <div className='frame'>
        <PHBreadcrumbs />
        <div className='page__content page__content--loading'>
          <PHColeccionesLista />
        </div>
      </div>
    </div>
  </section>
);

export default <></>;