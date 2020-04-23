import React from 'react';

/** COMPONENTS **/
import Hero from '../Hero';
import Productos from '../Productos/Listado'

const Home = props => {
  return (
    <>
      <Hero />
      <div className='container-fluid'>
        <Productos />
      </div>
    </>
  );
}

export default Home;
