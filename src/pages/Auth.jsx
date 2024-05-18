import React, { useState } from 'react';
import Login from '../components/Signin';
import Signup from '../components/Signup';
import Root from './Root';

import '../styles/Auth.css';

function Auth() {

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

    try {
      const response = await fetch('http://localhost:4000/auth/register', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
      });

      if (response.ok) {
          alert('User registered successfully. Please login.');
          setIsSignUpActive(false);
      } else {
          const errorData = await response.json();
          alert(errorData.message || 'Error signing up');
      }
    } catch (error) {
        alert('Error signing up');
    }
  }

  const handleLogin = async () => {
    const credentials = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch('http://localhost:4000/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            const data = await response.json();
            setIsLoggedIn(true);
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', email);
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Error logging in');
        }
    } catch (error) {
        alert('Error logging in');
    }
  };

  if (isLoggedIn) {
      return <Root />;
  }

  if (isSignUpActive) {
      return (
        <div className="auth-page">
          <div className="auth-container">
              <Signup
              firstName={firstName}
              setFirstName={setFirstName}
              middleName={middleName}
              setMiddleName={setMiddleName}
              lastName={lastName}
              setLastName={setLastName}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSignup={handleSignup}        
              setIsSignUpActive={setIsSignUpActive}  
              />
          </div>
        </div>
    );
  }   

  return (
    <div className="auth-page">
        <div className="auth-container">
            <Login 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            setIsSignUpActive={setIsSignUpActive}  
            />
        </div>
    </div>
    );
  }

export default Auth;
