import React, { useContext } from 'react'
import Button from './Button.jsx';
import { currencyFormatter } from '../../util/formatting.js';
import CartContext from '../../contexts/CartContext.jsx';
const MedicineItem = ({ medicine }) => {
    const cartCtx=useContext(CartContext);
    const handleAddMedicine=()=>{
        cartCtx.addItem(medicine);
        console.log(medicine);
    }
    return (
        <li className='medicine-item'>
            <article>
                <img src={medicine.image} alt={medicine.name} />
                <div>
                    <h3>{medicine.name}</h3>
                    <p className='medicine-item-price'>{currencyFormatter.format(medicine.price)}</p>
                    <p className='medicine-item-description'>{medicine.description}</p>
                </div>
                <p className='medicine-item-actions'>
                    <Button onClick={handleAddMedicine}>Add to Cart</Button>
                </p>
            </article>
        </li>
    )
}

export default MedicineItem;