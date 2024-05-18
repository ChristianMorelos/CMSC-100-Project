import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Admin() {

  const menus = [
    { key: 1, name: "Orders", url: "/admin/orders" },
    { key: 2, name: "Products", url: "/admin/products" },
    { key: 3, name: "Sales", url: "/admin/sales" },
    { key: 4, name: "Users", url: "/admin/users" },
  ];

  return (
    <>
      <Navbar menus={menus}></Navbar>
      <Outlet />
    </>
  );
}
