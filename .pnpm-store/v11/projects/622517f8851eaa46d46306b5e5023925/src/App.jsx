import React, { useEffect, useState } from "react";
import "./App.css";
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";
import RecipeDetails from "./components/RecipeDetails";
import CartPage from "./components/CartPage";
import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';
import AuthPage from './components/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';
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
    <AuthProvider>
      <CartProvider>
      <div className="container">
        {!isAuthRoute && <SearchBar isLoading={isLoading} query={query} setQuery={setQuery} handleSubmit={handleSubmit} />}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
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
              </ProtectedRoute>
            }
          />
          <Route path="/recipe/:id" element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
        </Routes>
      </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
