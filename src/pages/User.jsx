// User View

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function User(onLogout) {

  // Navbar options for user
  const menus = [
    { name: "Orders", url: "/user/orders" },
    { name: "Products", url: "/user/products" },
    { name: "Logout", url: "/login" }
  ];

  return (
    <>
        <Navbar menus ={menus}></Navbar>
        <Outlet/>
    </>
  );
}
