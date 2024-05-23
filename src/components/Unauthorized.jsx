import React from 'react';
import '/src/styles/Unauthorized.css';

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1>401 - Unauthorized</h1>
      <p>Sorry, you do not have permission to view this page.</p>
    </div>
  );
};

export default Unauthorized;
