import React, { useContext } from 'react'
import logoImg from '../../assets/logo.jpg'
import Button from './Button.jsx';
import CartContext from '../../contexts/CartContext.jsx';
import UserProgressContext  from '../../contexts/UserProgressContext.jsx';
import { useStateContext } from '../../contexts/ContextProvider.js';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const navigate = useNavigate();
  const { logout } = useStateContext();

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  const handleShowCart = () => {
    userProgressCtx.showCart();
  }

  const handleLogout = async () => {
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

  return (
    <header id="main-header">
      <div id='title'>
        <img src={logoImg} alt="Medical Center" />
        <h1>Alees Medicine</h1>
      </div>
      <nav className='space-x-6'>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
        <Button textOnly onClick={handleLogout}>Logout</Button>
      </nav>
    </header>
  )
}

export default Header;