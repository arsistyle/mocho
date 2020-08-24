import React from 'react';
import Banner from './Banner';

export const PlaceholderDetalle = () => (
  <section className='page'>
    <Banner placeholder={true} />
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
  </section>
);
