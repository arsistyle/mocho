import React, { useState, useEffect } from 'react';
import { getPage } from '../../services';
import { ListadoProductos, PageLoading } from '../Templates';


const PageProductos = (props) => {
  const { slug, id } = props;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState([]);

  useEffect(() => {
    async function loadPage() {
      const response = await getPage(slug);
      console.log(response);
      if (response) {
        setPage(response[0]);
        setLoading(false);
      }
    }
    loadPage();
  }, [slug]);

  return loading ? <PageLoading/> : <ListadoProductos data={page} id={id} />;
};

export default PageProductos;
