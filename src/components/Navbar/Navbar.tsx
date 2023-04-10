import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function NavbarComponent() {
  return (
    <div className="navbar">
      <Link to="/" className="logo">
        LOGO
      </Link>
      <div className="gear">gear icon</div>
    </div>
  );
}

export default NavbarComponent;
