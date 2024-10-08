import React, { useEffect, useState } from "react";
import "./App.css";
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";
import RecipeDetails from "./components/RecipeDetails";
import CartPage from "./components/CartPage";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from './components/CartContext';

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const searchRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${searchApi}${query}`);
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      setError("Error fetching recipes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  return (
    <CartProvider>
      <div className="container">
        <SearchBar isLoading={isLoading} query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
        <Routes>
          <Route
            path="/"
            element={
              <div className="recipes-section">
                {isLoading ? (
                  <p>Loading...</p>
                ) : recipes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recipes.map((recipe) => (
                      <RecipeCard key={recipe.idMeal} recipe={recipe} />
                    ))}
                  </div>
                ) : (
                  <p>{error || "No Results Found. Try searching for something else."}</p>
                )}
              </div>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
