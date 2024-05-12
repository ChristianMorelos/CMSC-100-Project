import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Shop from './pages/Shop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Orders from './pages/Orders';
import Admin from './pages/Admin';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} index />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="orders" element={<Orders />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;