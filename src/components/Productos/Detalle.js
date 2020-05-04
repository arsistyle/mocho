import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services';
import { DetalleProducto, DetalleProductoPlaceholder, PageLoading } from '../Templates';

const Detalle = () => {
  let { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    async function loadProduct() {
      const response = await getProduct(slug);
      if (response) {
        setProducto(response[0]);
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  return loading ? <PageLoading content={DetalleProductoPlaceholder}/> : <DetalleProducto data={producto} />;
};

export default Detalle;
