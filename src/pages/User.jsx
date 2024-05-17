// User View

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function User(onLogout) {

  // Navbar options for user
  const menus = [
    { key:1, name: "SHOP", url: "/user/products" },
    { key:2, name: "MY ORDERS", url: "/user/orders" },
    { key:3, name: "Logout", url: "/login" }
  ];

  return (
    <>
        <Navbar menus ={menus}></Navbar>
        <Outlet/>
    </>
  );
}
