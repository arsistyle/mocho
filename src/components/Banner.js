/**
 * MODULES
 */
import React from 'react';

/**
 * ASSETS
 */
import '../assets/scss/style/components/Banner.scss';

const Banner = ({ imagen, title, subtitle, container, placeholder }) => {
  return (
    <div
      className={`banner ${placeholder ? 'placeholder--child' : ''}`}
      style={container ? { height: '70vh' } : { height: '40vh' }}>
      {imagen ? <img src={imagen} alt={title} /> : ''}
      {container && (
        <div className='banner__container'>
          <div className='frame'>
            <h1 className='banner__title fadeInDown'>{title}</h1>
            <p className='banner__subtitle fadeInDown'>{subtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
