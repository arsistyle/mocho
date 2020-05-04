import React from 'react';
import FsLightbox from 'fslightbox-react';

const Galeria = (props) => {
  const types = props.data.map((x) => x.item);
  const sources = props.data.map((x) => Object.values(x).filter(Boolean).splice(1)).flat();
  return <FsLightbox types={types} toggler={props.toggler} sources={sources} />;
};

export default Galeria;
