import React, { useState, useEffect } from 'react';
import { getProduct } from '../../services';
import Page from '../Page';

const ProjectsDetail = ({ match }) => {
  const {
    params: { slug },
  } = match;

  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    async function loadProduct() {
      const response = await getProduct(slug);
      if (response.status === 200) {
        console.log(response.data[0]);
        setProducto(response.data[0]);
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  return loading ? <></> : <Page product='true' data={producto} />;
};

export default ProjectsDetail;
