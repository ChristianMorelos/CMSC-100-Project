import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Root from './Root';

import '../styles/Auth.css';

function Auth() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignup = async () => {
    const user = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      password: password,
    };

    fetch('http://localhost:4000/auth/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
    .then(async response => {
      if (response.ok) {
        alert('User registered successfully. Please login.');
        setIsSignUpActive(false);
      } else {
          const errorData = await response.json();
          alert(errorData.message || 'Error signing up');
      }
    })
    .catch(() => {
      alert('Error signing up');

    })    
  }

  const handleLogin = async () => {
    const credentials = {
        email: email,
        password: password,
    };

    fetch('http://localhost:4000/auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
    .then(async response => {
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
      } else {
          const errorData = await response.json();
          alert(errorData.error || 'Error logging in');
      }
    })
    .catch(() => {
      alert('Error logging in');
    })  
  };

  if (isLoggedIn) {
    if (email == 'admin@da.gov.ph') {
      navigate('admin/orders');
    } else {
      navigate('/user/orders');
    }
  }

  if (isSignUpActive) {
      return (
        <div className="auth-page">
          <div className="auth-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign up</h1>
            <span>See endless agriculture!</span>
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>
              Alread have an account?{' '}
              <a href="#" onClick={() => setIsSignUpActive(false)}> Sign in </a>
            </p>
            <button onClick={handleSignup} type="button">Sign Up</button>
          </form>
          </div>
        </div>
    );
  }   

  return (
    <div className="auth-page">
        <div className="auth-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Sign In</h1>
          <span>Welcome dear customer!</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            Don't have an account?{' '}
            <a href="#" onClick={() => setIsSignUpActive(true)}> Register </a>
          </p>
          <button onClick={handleLogin} type="button">Sign In</button>
        </form>
        </div>
    </div>
    );
  }

export default Auth;
