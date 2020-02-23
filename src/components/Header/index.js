import React from 'react';

import '../../assets/scss/style/components/Header.scss';

const Header = props => {
  return (
    <header className="header">
      {props.logo ? <a href="/" className="header__item header__item--logo"><img src={props.logo} alt={props.alt} /></a> : ''}
      {props.wspurl ? (
        <a href={props.wspurl} target="_blank" rel="noopener noreferrer" className="header__item header__item--btn btn btn--whatsapp">
          <span>{props.wsptext}</span>
          <props.wspicon />
        </a>
      ) : (
        ''
      )}
    </header>
  );
};

export default Header;
