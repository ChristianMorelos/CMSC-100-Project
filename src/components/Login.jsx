import React from 'react';

function Login({ email, setEmail, password, setPassword, handleLogin, setIsSignUpActive }) {
  return (
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
  );
}

export default Login;
