// This generates the navbar

import React from "react";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar({ menus }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to={menus[0].url} className="logo">
          Farm-to-Table
        </Link>
      </div>

      <div className="nav-links">
        {menus.map((menu) => (
          menu.name == "Logout" ? 
            <Link key={menu.key} to={menu.url} className="nav-link">
              <i className="bx bxs-user-circle"></i>
            </Link>
          : <Link key={menu.key} to={menu.url} className="nav-link">
              {" "}{menu.name}{" "}
            </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
