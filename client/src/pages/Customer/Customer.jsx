import React from 'react'
import Header from '../../components/Customer/Header.jsx';
import Medicines from '../../components/Customer/Medicines.jsx';
import Cart from '../../components/Customer/Cart.jsx';
import Checkout from "../../components/Customer/Checkout.jsx";
import { CartContextProvider } from '../../contexts/CartContext.jsx';
import { UserProgressContextProvider } from '../../contexts/UserProgressContext.jsx';

const Customer = () => {
  return (
    
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Medicines />
          <Cart />
          <Checkout />
        </CartContextProvider>
      </UserProgressContextProvider>
   
  )
}

export default Customer;