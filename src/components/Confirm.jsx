import React from 'react';
import '/src/styles/Confirm.css';

function ConfirmModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} >
      
      <div className="background" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content">
        <h2>Enter Password</h2>
        <input
          type="password"
          placeholder="Password"
          value='dfs'
          onChange={(e) => {}}
        />
        <button onClick={onSubmit}>Confirm</button>
      </div>
      </div>
      
    </div>
  );
}

export default ConfirmModal;
