import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Root from './pages/Root';
import Auth from './pages/Auth';
import Unauthorized from './pages/Unauthorized'; 
import Unauthenticated from './pages/Unauthenticated';
import NotFound from './pages/NotFound';

import Orders from './pages/admin/Orders';
import Products from './pages/admin/Products';
import Sales from './pages/admin/Sales';
import Users from './pages/admin/Users';

import UserOrders from './pages/user/Orders';
import UserProducts from './pages/user/Products';
import UserAccount from './pages/user/Account';

import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'admin/orders',
        element: (
          <ProtectedRoute adminOnly={true}>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/products',
        element: (
          <ProtectedRoute adminOnly={true}>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/sales',
        element: (
          <ProtectedRoute adminOnly={true}>
            <Sales />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/users',
        element: (
          <ProtectedRoute adminOnly={true}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/orders',
        element: (
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/products',
        element: (
          <ProtectedRoute>
            <UserProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/account',
        element: (
          <ProtectedRoute>
            <UserAccount />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: '/auth', element: <Auth /> },
  { path: '/unauthorized', element: <Unauthorized /> }, 
  { path: '/unauthenticated', element: <Unauthenticated /> }, 
  { path: '*', element: <NotFound /> }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
