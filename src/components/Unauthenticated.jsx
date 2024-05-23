import React from 'react';
import '/src/styles/Unauthorized.css';

const Unauthenticated = () => {
  return (
    <div className="unauthorized-container">
      <h1>401 - Unauthenticated</h1>
      <p>Please log in to view this page.</p>
    </div>
  );
};

export default Unauthenticated;
