import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from './CartContext';

const RecipeCard = ({ recipe }) => {
    const { idMeal, strMeal, strMealThumb, strCategory, strArea } = recipe;
    const { cartItems, addToCart } = useCart();

    const isInCart = cartItems.some(item => item.idMeal === idMeal);

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <Link to={`/recipe/${idMeal}`} className="block">
                <img src={strMealThumb} alt={strMeal} className="w-full h-48 object-cover" />


                <div className='flex flex-row justify-between'>
                    <div className="px-6 py-4 flex flex-col justify-start items-start">
                        <h2 className="font-bold text-xl mb-2">{strMeal}</h2>
                        <p className="text-red-700 text-base font-bold">Category: {strCategory}</p>
                        <p className="text-gray-700 text-base font-bold">Cuisine: {strArea}</p>
                    </div>

                    <div className="px-6 pt-4 pb-2 flex">
                        <button onClick={(e) => {
                            e.preventDefault();
                            addToCart(recipe);
                        }} className={`inline-block ${isInCart ? 'text-yellow-400' : 'text-gray-500'} hover:text-yellow-600`}>
                            <Heart size={20} className="fill-current" />
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RecipeCard;
