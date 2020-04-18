import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services';
import LazyLoad from 'react-lazyload';

import CatalogoItem from './CatalogoItem';

import '../../assets/scss/style/components/Catalogo.scss';

const Catalogo = (props) => {

  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await getProducts();
      if (response.status === 200) {
        setProductos(response.data);
        console.log(response.data)
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const items = [];
  for (let i = 0; i < 4; i++) {
    items.push(
      <div className='col-xs-6 col-sm-4 col-md-3' key={i}>
        <div className='catalogo__item placeholder'>
          <div className='catalogo__image placeholder--child'></div>
          <div className='catalogo__info'>
            <div className='catalogo__title placeholder'>
              <span className='placeholder--child'></span>
              <span className='placeholder--child'></span>
            </div>
            <div className='catalogo__valor placeholder--child'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className='catalogo container-fluid' id='catalogo'>
      <div className='frame'>
        <div className='row'>
          {!loading ? (
            productos.map((item, i) => (
              <LazyLoad key={i}>
                <CatalogoItem data={item} />
              </LazyLoad>
            ))
          ) : (
            <>{items}</>
          )}
        </div>
      </div>
    </section>
  );
};

export default Catalogo;
