import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecipeDetails = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            setRecipe(data.meals[0]);
        } catch (err) {
            setError('Failed to fetch recipe details');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipeDetails();
    }, [id]);

    if (isLoading) {
        return <p className="text-center text-xl py-10">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center py-10">{error}</p>;
    }

    if (!recipe) {
        return <p className="text-center text-gray-600 py-10">No recipe found.</p>;
    }

    const {
        strMeal,
        strCategory,
        strInstructions,
        strMealThumb,
        strYoutube,
        strSource
    } = recipe;

    const getIngredients = () => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push(
                    <li key={i} className="text-gray-700">
                        {ingredient} {measure ? `- ${measure}` : ''}
                    </li>
                );
            }
        }
        return ingredients;
    };

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="flex flex-col items-start lg:flex-row lg:space-x-6">
                <img
                    src={strMealThumb}
                    alt={strMeal}
                    className="w-full lg:w-1/2 h-auto object-cover rounded-lg mb-6 lg:mb-0"
                />
                <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{strMeal}</h2>
                    <p className="text-gray-600 mb-6">
                        <span className="font-bold">Category: </span>{strCategory}
                    </p>

                    <h4 className="text-xl font-bold text-gray-800 mb-3">Instructions</h4>
                    <p className="text-gray-700 mb-6 leading-relaxed">{strInstructions}</p>

                    <h4 className="text-xl font-bold text-gray-800 mb-3">Ingredients</h4>
                    <ul className="pl-5 space-y-1 list-none">
                        {getIngredients()}
                    </ul>

                    {strYoutube && (
                        <div className="mt-6">
                            <h4 className="text-xl font-bold text-gray-800 mb-2">Watch on YouTube:</h4>
                            <a href={strYoutube} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Watch the video
                            </a>
                        </div>
                    )}

                    {strSource && (
                        <div className="mt-6">
                            <h4 className="text-xl font-bold text-gray-800 mb-2">Source</h4>
                            <a href={strSource} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Check full recipe
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;











