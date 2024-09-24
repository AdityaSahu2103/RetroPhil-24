import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from './pages/firebase.js'; // Ensure you have configured Firebase

const PersistentLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await auth.signInWithCustomToken(token);
          // User is logged in, no need to navigate
        } catch (error) {
          console.error('Invalid token', error);
          localStorage.removeItem('token');
          if (location.pathname !== '/login') {
            navigate('/signup'); // Redirect to sign-up page if not on login page
          }
        }
      } else {
        if (location.pathname !== '/login') {
          navigate('/signup'); // Redirect to sign-up page if not on login page
        }
      }
    };

    checkUserLoggedIn();
  }, [navigate, location]);

  return null;
};

export default PersistentLogin;
