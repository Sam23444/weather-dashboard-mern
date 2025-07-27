import { useState, useEffect } from "react";

// These API functions handle HTTP requests to the backend for managing favorite cities.
 
import {
  getFavorites,        // GET request to fetch all favorite cities
  addFavoriteCity,     // POST request to add a new city to favorites
  removeFavoriteCity,  // DELETE request to remove a city from favorites by ID
} from "../api/weatherApi";


function useFavourites() {
  // Local state to store favorite cities, loading status, and any errors
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch favorites when the hook is first used (on mount)
  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true); // Show loading state
      setError(null); // Clear any previous errors

      try {
        const data = await getFavorites(); // Backend call to fetch favorites
        setFavorites(data); // Update local state with the fetched data
      } catch (err) {
        console.error("Failed to load favorites:", err);
        setError(err.message || "Error loading favorites"); // Save error for UI
      } finally {
        setLoading(false); // Hide loading state
      }
    };

    fetchFavorites();
  }, []);

  // Add a new city to favorites
  const addFavorite = async (cityName) => {
    // Check for duplicates (case-insensitive)
    if (
      favorites.some(
        (city) => city.name.toLowerCase() === cityName.toLowerCase()
      )
    ) {
      setError("City is already in favorites");
      return;
    }

    try {
      const newCity = await addFavoriteCity(cityName); // Backend call to add city
      setFavorites((prev) => [...prev, newCity]); // Add to local state
    } catch (err) {
      console.error("Failed to add favorite:", err);
      setError(err.message || "Error adding favorite"); // Save error for UI
    }
  };

  // Remove a city from favorites by ID
  const removeFavorite = async (id) => {
    try {
      await removeFavoriteCity(id); // Backend call to remove city
      setFavorites((prev) => prev.filter((city) => city._id !== id)); // Update state
    } catch (err) {
      console.error("Failed to remove favorite:", err);
      setError(err.message || "Error removing favorite"); // Save error for UI
    }
  };

  // Return hook's public API
  return {
    favorites, // List of favorite cities
    addFavorite, // Function to add a city
    removeFavorite, // Function to remove a city
    loading, // Indicates if backend call is in progress
    error, // Contains error message (if any)
  };
}

export default useFavourites;
