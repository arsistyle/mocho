import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScroll, useCurrentWitdh } from '../Functions';
// import { getHeader } from '../services';
import Menu, { MenuResponsive } from './Menu';
import Bg from './Bg';
import Logo from '../assets/img/logo.svg';
import '../assets/scss/style/components/Header.scss';

const Header = () => {
  const headerHeight = getComputedStyle(document.documentElement).getPropertyValue('--header');
  let scrollY = useScroll().scrollY;
  const [open, setOpen] = useState(false);
  // console.log(open);
  return (
    <header className={`header fadeInDown ${scrollY > Number(headerHeight.replace('px', '')) ? 'header--active' : ''}`}>
      <Link to='/' className='header__item header__item--logo'>
        <img src={Logo} alt='' />
      </Link>
      <MenuResponsive open={open} setOpen={setOpen} responsive={useCurrentWitdh() < 992} />
      <Bg open={open} setOpen={setOpen} responsive={useCurrentWitdh() < 992} />
      <Menu open={open} setOpen={setOpen} responsive={useCurrentWitdh() < 992} />
    </header>
  );
};

export default Header;
