import React, { useState, useEffect } from 'react';

function UserAccount() {
  const currentEmail = localStorage.getItem('email');
  const [currentUser, setCurrentUser] = useState({});
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/user/info?email=${currentEmail}`)
      .then(response => response.json())
      .then(body => {
        setCurrentUser(body);
        setFirstName(body.firstName || '');
        setMiddleName(body.middleName || '');
        setLastName(body.lastName || '');
        setEmail(body.email || '');
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  }, [currentEmail]);

  const handleUpdate = async () => {
    const updatedUser = {
      userEmail: currentEmail,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:4000/auth/editAccount', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        alert('User information updated successfully');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error updating account');
      }
    } catch (error) {
      alert('Error updating account');
    }
  };

  return (
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
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleUpdate} type="button">Update Account</button>
    </form>
  );
}

export default UserAccount;
