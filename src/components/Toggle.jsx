import React from 'react';

function Toggle({ toggleClass }) {
  return (
    <div className="toggle">
      <div className="toggle-panel toggle-right">
        <h1>Welcome Back!</h1>
        <p>Shop to your delight in Farm-to-Table for the best possible wide range agriculture products you can buy</p>
        <button className="hidden" id="login" onClick={toggleClass}>Sign Up</button>
      </div>
      <div className="toggle-panel toggle-left">
        <h1>Register Now</h1>
        <p>Enter your personal details to use all of Farm-to-Table features and see all our cream of the crop agriculture products</p>
        <button className="hidden" id="register" onClick={toggleClass}>Sign In</button>
      </div>
    </div>
  );
}

export default Toggle;
