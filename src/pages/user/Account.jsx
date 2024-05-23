import React, { useState, useEffect } from 'react';
import ConfirmModal from '/src/components/Confirm';
import Unauthenticated from "/src/components/Unauthenticated";
import Auth from "/src/hooks/Auth";

import '/src/styles/Account.css';

function UserAccount() {

  const { isAuthenticated } = Auth(); 


  const currentEmail = localStorage.getItem('email');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`http://localhost:4000/user/info?email=${currentEmail}`)
      .then(response => response.json())
      .then(body => {
        setFirstName(body.firstName || '');
        setMiddleName(body.middleName || '');
        setLastName(body.lastName || '');
        setEmail(body.email || '');
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
    }
  }, [isAuthenticated, currentEmail]);

  if (isAuthenticated == null) {
    return; 
  }

  if (!isAuthenticated) {
    return <Unauthenticated />;
  }

  const handleUpdate = async () => {
    const updatedUser = {
      userEmail: currentEmail,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      password: password,
    };

    fetch('http://localhost:4000/user/edit-info', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedUser),
    })
      .then(async response => {
        if (response.ok) {
          alert('User information updated successfully');
          setIsModalOpen(false);
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Error updating account');
        }
      })
      .catch(() => {
        alert('Error updating account');
      });
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <form>
          <h1>Edit Account Details</h1>
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Middle name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={() => setIsModalOpen(true)} type="button">Update Account</button>
        </form>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdate}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
}

export default UserAccount;
