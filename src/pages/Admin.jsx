// Admin View

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function Admin(onLogout) {

  // Navbar menus for admin
  const menus = [       
    { key:1, name: "Orders", url: "/admin/orders" },
    { key:2, name: "Products", url: "/admin/products" },
    { key:3, name: "Sales", url: "/admin/sales" },
    { key:4, name: "Users", url: "/admin/users" },
    { key:5, name: "Logout", url: "/login" }
  ];

  return (
    <>
        <Navbar menus ={menus}></Navbar>
        <Outlet/>   
    </>
  );
}
