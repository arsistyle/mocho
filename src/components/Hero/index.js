import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { useCurrentWitdh } from '../../Functions';

// Assets
import Bg from '../../assets/img/bg.jpg';
import BgMobile from '../../assets/img/bg-mobile.jpg';
import M from '../../assets/img/M.svg';
import MMobile from '../../assets/img/M-mobile.svg';
import '../../assets/scss/style/components/Hero.scss';

const Hero = props => {
  const headerHeight = getComputedStyle(document.documentElement).getPropertyValue('--header');
  let width = useCurrentWitdh();
  const [loading, setImage] = useState(false);
  const image = new Image();
  if (width < 768) {
    image.src = Bg;
  } else {
    image.src = BgMobile;    
  }
  image.onload = () => {
    setImage(true);
  };
  let bg = width < 768 ? BgMobile : Bg;
  let m = width < 768 ? MMobile : M;
  return loading ? (
    <section className='hero'>
      <div className='hero__bg'>
        <img src={bg} alt='' className='hero__img' />
        <img src={m} alt='' className='hero__svg' />
      </div>
      <div className='hero__container'>
        <h1 className='hero__title titulo-hero'>{props.title}</h1>
        <Link to={props.btn.url} smooth={true} offset={-(Number(headerHeight.replace('px', '')) + 30)} className='hero__btn btn btn--primario'>
          {props.btn.title}
        </Link>
      </div>
    </section>
  ) : (
    <section className='hero placeholder'>
      <div className='hero__bg placeholder--child'>
      </div>
      <div className='hero__container'>
        <div className="hero__title placeholder">
          <span className="placeholder--child"></span><span className="placeholder--child"></span>
        </div>
        <div className="hero__btn placeholder--child"></div>
      </div>
    </section>
  );
};

export default Hero;
