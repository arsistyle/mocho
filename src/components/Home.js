import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPage } from '../services';
import { PHHome } from './Placeholders';

/** COMPONENTS **/
import Hero from './Hero';
import Productos from './Productos--Lista';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({});
  useEffect(() => {
    async function loadHome() {
      const response = await getPage('inicio');
      if (response) {
        setPage(response[0]);
        setLoading(true);
        console.log(response[0].acf);
      }
    }
    loadHome();
  }, []);
  return !loading ? (
    <PHHome />
  ) : (
    <>
      <Hero title={page.acf.titulo} images={{
        desktop: page.acf.imagen_desktop,
        mobile: page.acf.imagen_mobile
      }} />
      <div className='container-fluid productos' id='productos'>
        <div className='frame'>
          <h2 className='text-align-center-xs fadeInDown'>Últimos productos</h2>
          <Productos totalItems='8' />
          <div className='text-align-center-xs text-align-right-md'>
            <Link to='/productos' className='btn btn--secundario btn--borde'>
              Ver todos
            </Link>
            <div className='separador'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
