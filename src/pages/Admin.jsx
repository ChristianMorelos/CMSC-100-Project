// Admin View

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function Admin(onLogout) {

  // Navbar menus for admin
  const menus = [       
    { name: "Orders", url: "/admin/orders" },
    { name: "Products", url: "/admin/products" },
    { name: "Sales", url: "/admin/sales" },
    { name: "Users", url: "/admin/users" },
    { name: "Logout", url: "/login" }
  ];

  return (
    <>
        <Navbar menus ={menus}></Navbar>
        <Outlet/>   
    </>
  );
}
