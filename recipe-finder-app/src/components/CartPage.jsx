import React from 'react';
import { useCart } from './CartContext';
import CartItem from './CartItem';

const CartPage = () => {
    const { cartItems } = useCart();

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cartItems.length > 0 ? (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <CartItem key={item.idMeal} item={item} />
                    ))}
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
