import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Root from './pages/Root';
import Auth from './pages/Auth';

import Orders from './pages/admin/Orders';
import Products from './pages/admin/Products';
import Sales from './pages/admin/Sales';
import Users from './pages/admin/Users';

import UserOrders from './pages/user/Orders';
import UserProducts from './pages/user/Products';
import UserAccount from './pages/user/Account';


const router = createBrowserRouter([
  { path: '/', element: <Root />, children: [
    { path: 'admin/orders', element: <Orders /> },
    { path: 'admin/products', element: <Products /> },
    { path: 'admin/sales', element: <Sales /> },
    { path: 'admin/users', element: <Users /> },

    { path: 'user/orders', element: <UserOrders /> },
    { path: 'user/products', element: <UserProducts /> },
    { path: 'user/account', element: <UserAccount /> },
  ]},

  { path: '/auth', element: <Auth />},
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);
