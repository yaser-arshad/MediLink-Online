import React, { useContext } from 'react'
import Modal from './Modal';
import Button from './Button.jsx';
import { currencyFormatter } from '../../util/formatting.js';
import CartContext from '../../contexts/CartContext.jsx';
import UserProgressContext  from '../../contexts/UserProgressContext.jsx';

import CartItem from './CartItem.jsx';
const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx=useContext(UserProgressContext);
    const cartTotal=cartCtx.items.reduce(
        (totalPrice,item)=>totalPrice+item.quantity*item.price,
        0
    );

    const handleCloseCart=()=>{
        userProgressCtx.hideCart();
    }
    const handleGoToCheckout=()=>{
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className='cart' open={userProgressCtx.progress ==='cart'} onClose={userProgressCtx.progress ==='cart'?handleCloseCart:null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item=>
                    <CartItem 
                    key={item._id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    onIncrease={()=>cartCtx.addItem(item)}
                    onDecrease={()=>cartCtx.removeItem(item.id)}
                    />
                )}

            </ul>
            <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
            <p className='modal-actions'>
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && (
                    <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
                )}
                
            </p>
        </Modal>
    )
}

export default Cart;