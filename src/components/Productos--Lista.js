import React, { useState, useEffect } from 'react';
import { getProducts } from '../services';
import LazyLoad from 'react-lazyload';

import { PHProductosLista } from './Placeholders';
import ProductosItem from './Productos--Item';

import '../assets/scss/style/components/Productos.scss';

const ProductosLista = ({ id, totalItems }) => {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);

  // console.log(props);

  // console.log(id);

  useEffect(() => {
    function loadProducts() {
      const response = getProducts(id, totalItems && Number(totalItems));
      response.then((data) => {
        if (data) {
          setProductos(data);
          setLoading(false);
        }
      });
    }
    loadProducts();
  }, [id, totalItems]);

  return (
    <>
      {!loading ? (
        <div className='row'>
          {productos
            // .filter((x) => {
            //   const stock = x.acf.colores.reduce((prev, next) => {
            //     return prev + Number(next.stock);
            //   }, 0);
            //   return stock > 0;
            // })
            .map((item, i) => (
              <LazyLoad key={i} classNamePrefix='col-xs-6 col-sm-4 col-md-3 '>
                <ProductosItem data={item} />
              </LazyLoad>
            ))}
        </div>
      ) : (
        <PHProductosLista />
      )}
      {!loading && !productos.length && (
        <div className='alerta alerta--aviso'>
          Estamos sin stock en esta categoría
        </div>
      )}
    </>
  );
};

export default ProductosLista;
