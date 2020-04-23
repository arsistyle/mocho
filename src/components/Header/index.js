import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScroll } from '../../Functions';
import { getHeader } from '../../services';
import Menu from '../Menu';
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
      if (response.data) {
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
      <Link to='/' className='header__item header__item--logo'>
        <img src={Logo} alt='' />
      </Link>
      <Menu />
    </header>
  );
};

export default Header;
