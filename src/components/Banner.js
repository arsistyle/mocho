import React from 'react';

import { HTML } from '../ars1';

import '../assets/scss/style/components/Banner.scss';

const Banner = ({ imagen, title, subtitle, container, placeholder }) => {
  return (
    <div
      className={`banner ${placeholder ? 'placeholder--child' : ''}`}
      style={container ? { height: '50vh' } : { height: 'calc(var(--header) + 80px)' }}>
      {imagen ? <img src={imagen} alt={title} /> : ''}
      {container && (
        <div className='banner__container'>
          <div className='frame'>
            <h1 className='banner__title fadeInDown'>{HTML(title)}</h1>
            <p className='banner__subtitle fadeInDown'>{subtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
