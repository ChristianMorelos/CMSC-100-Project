import { useState, useEffect } from "react";

const Auth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token || !email) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      return;
    }

    fetch('http://localhost:4000/auth/validate-token', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.response && email === 'admin@da.gov.ph') {
          setIsAuthenticated(true);
          setIsAdmin(true);
        } else if (data.response === 'Authorized user') {
          setIsAuthenticated(true);
          setIsAdmin(false);
        } else {
          setIsAuthenticated(false);
        }
        
      })
      .catch(() => {
        setIsAuthenticated(false);
        setIsAdmin(false);
      });
  }, []);

  return { isAuthenticated, isAdmin };
};

export default Auth;