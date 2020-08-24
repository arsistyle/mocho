import React from 'react';
import FsLightbox from 'fslightbox-react';

const Galeria = (props) => {
  return <FsLightbox type='image' toggler={props.toggler} sources={props.data} />;
};

export default Galeria;
