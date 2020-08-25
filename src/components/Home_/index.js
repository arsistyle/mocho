import React from 'react';
import { Link } from 'react-router-dom';

/** COMPONENTS **/
import Hero from '../Hero';
import Productos from '../Productos/Listado';

const Home = (props) => {
  return (
    <>
      <Hero />
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
