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

  const handleLogin = () => {
      setIsLoggedIn(true);
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
              handleLogin={handleLogin}        
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
