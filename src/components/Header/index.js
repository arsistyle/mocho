import React from 'react';

import '../../assets/scss/style/components/Header.scss';

const Header = props => {
  return (
    <header className="header">
      {
        props.logo ? (<img src={props.logo} alt={props.alt} />): ''
      }
    </header>
  )
}

export default Header;
