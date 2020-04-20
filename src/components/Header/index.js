import React, { useState, useEffect } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';
import { useScroll } from '../../Functions';
import { getHeader } from '../../services';
import Logo from '../../assets/img/logo.svg';
import '../../assets/scss/style/components/Header.scss';

const Header = () => {
  const headerHeight = getComputedStyle(document.documentElement).getPropertyValue('--header');
  let scrollY = useScroll().scrollY;
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState({});

  useEffect(() => {
    async function loadHeader() {
      const response = await getHeader();
      if (response.status === 200) {
        setHeader(response.data.acf);
        setLoading(false);
      }
    }
    loadHeader();
  }, []);
  return loading ? (
    <></>
  ) : (
    <header className={scrollY > Number(headerHeight.replace('px', '')) ? 'header header--active' : 'header'}>
      <a href='/' className='header__item header__item--logo'>
        <img src={Logo} alt='' />
      </a>
      <a href={encodeURI(`${process.env.REACT_APP_WSP}${header.whatsapp}`)} target='_blank' rel='noopener noreferrer' className='header__item header__item--btn btn btn--whatsapp'>
        <span>Contacto</span>
        <IoLogoWhatsapp />
      </a>
    </header>
  );
};

export default Header;
