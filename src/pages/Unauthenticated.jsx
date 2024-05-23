import React from 'react';
import { useNavigate } from 'react-router-dom';

import '/src/styles/Error.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/auth');
  };

  return (
    <div className="error-container">
      <h1>401 - Unauthenticated</h1>
      <p>Please log in first to view this page.</p>
      <button onClick={handleLoginRedirect} className="login-button">Go to Login</button>
    </div>
  );
};

export default Unauthorized;
