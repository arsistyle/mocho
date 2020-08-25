import React, { useState, useEffect } from 'react';
import { getPage } from '../services';
import { ListadoProductos, PageLoading } from './Templates';

const ProductosPage = (props) => {
  const { slug, id } = props;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState([]);

  console.log(slug);

  useEffect(() => {
    async function loadPage() {
      const response = await getPage(slug);
      if (response) {
        setPage(response[0]);
        setLoading(false);
      }
    }
    loadPage();
  }, [slug]);

  return loading ? <PageLoading /> : <ListadoProductos data={page} id={id} />;
};

export default ProductosPage;
