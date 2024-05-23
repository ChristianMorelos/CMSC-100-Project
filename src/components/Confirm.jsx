import React, { useState } from 'react';
import '/src/styles/Confirm.css';

function ConfirmModal({ isOpen, onClose, onSubmit, password, setPassword }) {

  if (!isOpen) return null;

  const handleConfirm = () => {
    onSubmit(password);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="background" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <h2>Enter Password</h2>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
