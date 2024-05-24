// This generates the navbar

import React from "react";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar({ menus }) {

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  const logoutMenu = { key: 5, name: "Logout", url: "/auth" };

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
        <Link onClick={() => handleLogout()} key={logoutMenu.key} to={logoutMenu.url} className="nav-link">
            {" "}
            {logoutMenu.name}{" "}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
