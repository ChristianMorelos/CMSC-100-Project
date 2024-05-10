import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './pages/admin/Root';
import Shop from './pages/admin/Shop';
import AddProduct from './pages/admin/AddProduct';

const router = createBrowserRouter([
  { path: '/', element: <Root />, children: [
    { path: '/', element: <Shop />},
    { path: 'myorders', element: <AddProduct /> }
  ]}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);