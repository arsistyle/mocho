import React, { useEffect, useState } from 'react';
// import loadable from '@loadable/component';
import { Link } from 'react-router-dom';
import { getPage } from '../services';
import { PHHome } from './Placeholders';
// import { PHHero, PHColecciones, PHProductos } from './Placeholders';

/** COMPONENTS **/
import Hero from './Hero';
import Colecciones from './Colecciones--Lista';
import Productos from './Productos--Lista';

// const PLACEHOLDERS = loadable(() => import('./Placeholders'));

// const Hero = loadable(() => import('./Hero'), {
//   loading: <PHHero />,
// });
// const Colecciones = loadable(() => import('./Colecciones--Lista'), {
//   loading: <PHColecciones />,
// });
// const Productos = loadable(() => import('./Productos--Lista'), {
//   loading: <PHProductos />,
// });

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({});
  useEffect(() => {
    async function loadHome() {
      const response = await getPage('inicio');
      if (response) {
        setPage(response[0]);
        setLoading(true);
      }
    }
    loadHome();
  }, []);
  return !loading ? (
    <PHHome />
  ) : (
    <>
      <Hero
        title={page.acf.titulo}
        images={{
          desktop: page.acf.imagen_desktop,
          mobile: page.acf.imagen_mobile,
        }}
      />
      <div className='container-fluid'>
        <div className='frame'>
          <h2 className='text-align-center-xs fadeInDown'>Colecciones</h2>
          <Colecciones totalItems={2} order='rand' />
          <div className='text-align-center-xs text-align-right-md'>
            <Link to='/colecciones' className='btn btn--secundario btn--borde'>
              Ver todas
            </Link>
            <div className='separador'></div>
          </div>
        </div>
      </div>
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
