import React, { useState, useEffect } from 'react';
import { IoLogoInstagram, IoLogoFacebook } from 'react-icons/io';
import { getFooter } from '../services';

import '../assets/scss/style/components/Footer.scss';

const Footer = () => {
  const [loading, setLoading] = useState(true);
  const [footer, setFooter] = useState({});

  useEffect(() => {
    async function loadFooter() {
      const response = await getFooter();
      if (response.acf) {
        setFooter(response.acf);
        setLoading(false);
      }
    }
    loadFooter();
  }, []);
  const Icono = (value) => {
    switch (value) {
      case 'Instagram':
        return <IoLogoInstagram />;
      case 'Facebook':
        return <IoLogoFacebook />;
      default:
        break;
    }
  };
  return loading ? (
    <></>
  ) : (
    <footer className='footer' data-copy={footer.copyright.replace(/#year#/, new Date().getFullYear())}>
      <div className='footer__redes'>
        {footer['redes_sociales'].map((x, i) => {
          return (
            <a href={x.url} key={i} target='_blank' rel='noopener noreferrer' className='footer__redes__link'>
              {Icono(x.red)}
            </a>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
