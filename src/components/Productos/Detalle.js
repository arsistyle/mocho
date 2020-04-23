import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services';
import { DetalleProducto } from '../Templates';

const Detalle = props => {
  let { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    async function loadProduct() {
      const response = await getProduct(slug);
      if (response.data) {
        setProducto(response.data[0]);
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  return loading ? <></> : <DetalleProducto data={producto} />;
};

export default Detalle;
