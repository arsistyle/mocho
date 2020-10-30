import React from 'react';
import cx from 'classnames';
import useImage from '../hooks/useImage';

const Image = ({ src, alt = '', className, srcset = null, sizes = null }) => {
  const { loaded } = useImage({ src });
  return (
    <img
      className={`${cx('smooth', { loaded })} ${className || ''}`}
      src={`${src}`}
      alt={alt}
      srcSet={srcset}
      sizes={sizes}
    />
  );
};

export default Image;
