// This generates the navbar

import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";

import "../styles/Navbar.css";

function Navbar({ menus }) {

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  const logoutMenu = { key: 5, name: "Logout", url: "/auth" };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
          <div className="logo-text">
            <Link to={menus[0].url} className="logo">
              FARM-TO-TABLE
            </Link>
          </div>
          <div>
            <img src={logo} className="logo-img"/>
          </div>
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
