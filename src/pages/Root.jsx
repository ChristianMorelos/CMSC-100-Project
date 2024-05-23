import Admin from './Admin';
import User from './User';
import { Navigate } from 'react-router-dom';

export default function Root() {
  const email = localStorage.getItem('email');

  const renderHomePage = () => {

    if (email == null) {
      return <Navigate to="/auth" />;
    }

    if (email === 'admin@da.gov.ph') {
      return <Admin />;
    }
    
    return <User />;
  };

  return renderHomePage();
}

