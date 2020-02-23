import React from 'react';

import '../../assets/scss/style/components/Header.scss';

const Header = props => {
  return (
    <header className="header">
      {props.logo ? <img src={props.logo} alt={props.alt} /> : ''}
      {props.wspurl ? (
        <a href={props.wspurl} target="_blank" rel="noopener noreferrer">
          <props.wspicon />
          <span>{props.wsptext}</span>
        </a>
      ) : (
        ''
      )}
    </header>
  );
};

export default Header;
