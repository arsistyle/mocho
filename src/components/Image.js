import React, { useEffect } from 'react';
import cx from 'classnames';
import useImage from '../hooks/useImage';

const Image = ({ src, alt = '', className, fallback }) => {
  const { loaded } = useImage({ src });
  useEffect(() => {
    if (fallback) {
      fallback();
    }
  }, [fallback]);
  return <img className={`${cx('smooth', { loaded })} ${className || ''}`} src={`${src}`} alt={alt} />;
};

export default Image;
