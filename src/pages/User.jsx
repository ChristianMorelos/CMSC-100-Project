import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function User() {

  const menus = [
    { key:1, name: "Orders", url: "/user/orders" },
    { key:2, name: "Products", url: "/user/products" },
    { key:3, name: "Account", url: "/user/account"}
  ];

  return (
    <>
        <Navbar menus ={menus}></Navbar>
        <Outlet/>
    </>
  );
}
