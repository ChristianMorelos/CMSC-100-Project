import React, { useState, useEffect } from 'react';

import Admin from './Admin';
import User from './User';

export default function Root() {

  // This is a dummy account
  const mockUser = {
    firstName: 'Franz Christian',
    middleName: 'Dela Cruz',
    lastName: 'Morelos',
    userType: 'customer',    // Change this to 'customer' if you want to check user pages
    email: 'john.doe@example.com',
    password: 'hashedsample'
  };

  const [currentUser, setUser] = useState(mockUser);

  const renderHomePage = () => {

    if (currentUser) {
      if (currentUser.userType === 'admin')
        return <Admin currentUser={currentUser} onLogout={() => setUser(null)} />;
        
      return <User currentUser={currentUser} onLogout={() => setUser(null)} />;
    }

  };

  return renderHomePage();
}
