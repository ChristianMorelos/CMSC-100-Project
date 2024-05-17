// This generates the navbar

import React from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css";

function Navbar({ menus }) {
  return (
    <nav className="navbar">
      <div>
        <Link to={menus[0].url} className="logo">
          Farm-to-Table
        </Link>
      </div>

      <div className="nav-links">
        {menus.map((menu) => (
          <Link key={menu.key} to={menu.url} className="nav-link">
            {" "}
            {menu.name}{" "}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
