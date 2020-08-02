import React from 'react';
import {Link} from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <div className="container">
        <h1><Link to="/" className="header__link" title="Home">Hacker News</Link></h1>
      </div>
    </header>
  );
}

export default Header;