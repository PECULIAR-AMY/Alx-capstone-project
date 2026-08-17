import { useCart } from './CartContext';
import PropTypes from 'prop-types';

const CartItem = ({ item }) => {
    const { removeFromCart } = useCart();

    return (
        <div className="cart-item">
            <img src={item.strMealThumb} alt={item.strMeal} className="cart-item-image" />
            <div className="cart-item-info">
                <h4>{item.strMeal}</h4>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.idMeal)} className="remove-button">
                    Remove One
                </button>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        idMeal: PropTypes.string.isRequired,
        strMeal: PropTypes.string.isRequired,
        strMealThumb: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
};

export default CartItem;
