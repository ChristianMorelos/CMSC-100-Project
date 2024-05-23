import React from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Error.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="error-container">
      <h1>401 - Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <button onClick={handleGoBack} className="back-button">Go Back</button>
    </div>
  );
};

export default Unauthorized;
