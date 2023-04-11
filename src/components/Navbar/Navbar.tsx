import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

function NavbarComponent() {
  return (
    <div className="navbar">
      <Link to="/" className="logo">
        LOGO
      </Link>
      <div className="gear">
        <FontAwesomeIcon icon={faGear} />
      </div>
    </div>
  );
}

export default NavbarComponent;
