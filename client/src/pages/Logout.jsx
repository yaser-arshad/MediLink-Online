import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useStateContext();
  useEffect(() => {
    const logoutUser = async () => {
      try {
      
        logout();

        const response = await fetch('http://localhost:5000/api/users/logout', {
          method: 'POST',
          credentials: 'include', 
        });

        if (response.ok) {
          navigate('/login'); // Navigate to the login page after logout
        } else {
          console.error('Failed to logout');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    logoutUser();
  }, [logout,navigate]);

  return (
    <div>Logging out...</div>
  );
};

export default Logout;
