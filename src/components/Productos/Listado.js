import React, { useState, useEffect } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
import { getProducts } from '../../services';
import LazyLoad from 'react-lazyload';

import Item from './Item';

import '../../assets/scss/style/components/Productos.scss';

const Productos = (props) => {
  let { id } = props;
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await getProducts(id);
      if (response) {
        setProductos(response);
        setLoading(false);
      }
    }
    loadProducts();
  }, [id]);

  const items = [];
  for (let i = 0; i < 4; i++) {
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

  return (
    <section className='productos' id='productos'>
      <div className='frame'>
        <div className='row'>
          {!loading ? (
            productos.map((item, i) => (
              <LazyLoad key={i}>
                <Item data={item} />
              </LazyLoad>
            ))
          ) : (
            <>{items}</>
          )}
          {!productos.length && (
            <div className='col-xs-12'>
              <div className='alerta alerta--aviso'>Estamos sin stock en esta categoría</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Productos;
