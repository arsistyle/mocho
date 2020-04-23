import React, { useState, useEffect } from 'react';
import { getHero } from '../../services';
import { Link } from 'react-scroll';
import { useCurrentWitdh } from '../../Functions';

import M from '../../assets/img/M.svg';
import MMobile from '../../assets/img/M-mobile.svg';
import '../../assets/scss/style/components/Hero.scss';

const Hero = (props) => {
  let width = useCurrentWitdh();
  const headerHeight = getComputedStyle(document.documentElement).getPropertyValue('--header');
  const [loading, setLoading] = useState(true);
  const [hero, setHero] = useState([]);

  useEffect(() => {
    async function loadHero() {
      const response = await getHero();
      if (response.data) {
        setHero(response.data.acf);
        setLoading(false);
      }
    }
    loadHero();
  }, []);

  return loading ? (
    <section className='hero placeholder'>
      <div className='hero__bg placeholder--child'></div>
      <div className='hero__container'>
        <div className='hero__title placeholder'>
          <span className='placeholder--child'></span>
          <span className='placeholder--child'></span>
        </div>
        <div className='hero__btn placeholder--child'></div>
      </div>
    </section>
  ) : (
    <section className='hero'>
      <div className='hero__bg'>
        <img src={width < 768 ? hero['imagen_mobile'] : hero.imagen} alt='' className='hero__img' />
        <img src={width < 768 ? MMobile : M} alt='' className='hero__svg' />
      </div>
      <div className='hero__container'>
        <h1 className='hero__title titulo-hero'>{hero.titulo}</h1>
        <Link to='catalogo' smooth={true} offset={-(Number(headerHeight.replace('px', '')) + 30)} className='hero__btn btn btn--primario'>
          Explorar
        </Link>
      </div>
    </section>
  );
};

export default Hero;
