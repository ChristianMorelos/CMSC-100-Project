import { useState, useEffect } from 'react';

const Auth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token || !email) {
      setIsAuthenticated(false);
      return;
    }

    fetch('http://localhost:4000/auth/validate-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
      .then(response => response.json())
      .then(data => {
        if (data.response === 'Authorized user') {
          setIsAuthenticated(true);
          setIsAdmin(email === 'admin@da.gov.ph');
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  return { isAuthenticated, isAdmin };
};

export default Auth;
