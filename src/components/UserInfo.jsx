import React from 'react';

function Signup({ firstName, setFirstName, middleName, setMiddleName, lastName, setLastName, email, setEmail, password, setPassword, handleSignup, setIsSignUpActive }) {
  return (
    <form>
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
  );
}

export default Signup;