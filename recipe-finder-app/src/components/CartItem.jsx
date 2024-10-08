import React from 'react';
import { useCart } from './CartContext';

const CartItem = ({ item }) => {
    const { removeFromCart } = useCart();

    return (
        <div className="cart-item">
            <img src={item.strMealThumb} alt={item.strMeal} className="cart-item-image" />
            <div className="cart-item-info">
                <h4>{item.strMeal}</h4>
                <button onClick={() => removeFromCart(item.idMeal)} className="remove-button">
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
