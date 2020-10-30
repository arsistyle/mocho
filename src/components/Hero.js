import React from 'react';
import { Link } from 'react-scroll';
import Image from './Image';
// import { useCurrentWitdh } from '../Functions';

// import M from '../assets/img/M.svg';
// import MMobile from '../assets/img/M-mobile.svg';
import '../assets/scss/style/components/Hero.scss';

const Hero = ({ title, images }) => {
  // console.log(images);
  const { desktop, mobile } = images;
  // let width = useCurrentWitdh();
  const headerHeight = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--header');

  return (
    <section className='hero'>
      <div className='hero__bg'>
        <Image src={desktop} alt='Mocho Store' className={'hero__img'} srcset={`${mobile} 767w, ${desktop} 768w`} sizes='(max-width: 767px) 0px, 768px' />
      </div>
      <div className='hero__container'>
        <h1 className='hero__title titulo-hero fadeInDown'>{title}</h1>
        <Link
          to='productos'
          smooth={true}
          offset={-(Number(headerHeight.replace('px', '')) + 30)}
          className='hero__btn btn btn--primario fadeInUp'
        >
          Explorar
        </Link>
      </div>
    </section>
  );
};

export default Hero;
