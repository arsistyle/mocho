import React from 'react';
import { Link } from 'react-scroll';
import { useCurrentWitdh } from '../../Functions';

// Assets
import Bg from '../../assets/img/bg.jpg';
import BgMobile from '../../assets/img/bg-mobile.jpg';
import M from '../../assets/img/M.svg';
import MMobile from '../../assets/img/M-mobile.svg';
import '../../assets/scss/style/components/Hero.scss';


const Hero = props => {
  const headerHeight = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--header');
  let width = useCurrentWitdh();
  return (
    <section className="hero">
      <div className="hero__bg">
        <img src={width < 768 ? BgMobile : Bg} alt="" className="hero__img" />
        <img src={width < 768 ? MMobile : M} alt="" className="hero__svg" />
      </div>
      <div className="hero__container">
        <h1 className="hero__title titulo-hero">{props.title}</h1>
        <Link
          to={props.btn.url}
          smooth={true}
          offset={-(Number(headerHeight.replace('px', '')) + 30)}
          className="btn btn--primario"
        >
          {props.btn.title}
        </Link>
      </div>
    </section>
  );
};

export default Hero;
