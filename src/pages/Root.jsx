import Auth from './Auth';
import Admin from './Admin';
import User from './User';

export default function Root() {
  const token = localStorage.getItem('email');
  const email = localStorage.getItem('email');

  const renderHomePage = () => {
    if (email === 'admin@da.gov.ph') {
      return <Admin />;
    }
    
    return <User />;
  };

  return renderHomePage();
}

