import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(x => x.idMeal === item.idMeal);
            if (existingItem) {
                return prevItems.map(x =>
                    x.idMeal === item.idMeal
                        ? { ...x, quantity: (x.quantity || 1) + 1 }
                        : x
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (idMeal) => {
        setCartItems(prevItems =>
            prevItems
                .map(item =>
                    item.idMeal === idMeal
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartContext
