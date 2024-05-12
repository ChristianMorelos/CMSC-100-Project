import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="logo">Farm-to-Table</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Shop
        </Link>

        <Link to="/orders" className="nav-link">
          Orders
        </Link>

        <Link to="/admin" className="nav-link">
          Admin
        </Link>
        
        <Link to="/login" className="nav-link">
          Logout
        </Link>
      </div>


    </nav>
  );
}

export default Navbar;