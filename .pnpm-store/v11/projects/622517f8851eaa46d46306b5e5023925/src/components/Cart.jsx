import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems } = useCart();

    return (
        <Link to="/cart">
            <div className="relative">
                <ShoppingCart size={30} />
                {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                )}
            </div>
        </Link>
    );
};

export default Cart;
