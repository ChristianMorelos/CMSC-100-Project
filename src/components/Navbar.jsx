import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/navbar.css'

function Navbar() {
  return (
    <nav style={{ padding: '10px 0', textAlign: 'center' }}>
      <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: 'black', fontSize: '18px' }}>Farm-to-Table</Link>
      <Link to="/orders" style={{ marginRight: '20px', textDecoration: 'none', color: 'black', fontSize: '18px' }}>Orders</Link>
      <Link to="/admin" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>Admin</Link>
    </nav>
  );
}

export default Navbar;