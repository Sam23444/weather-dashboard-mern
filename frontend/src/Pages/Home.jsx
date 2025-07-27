import React from "react";
import "./Home.css";


import SearchBar from "../components/SearchBar";
import WeatherDisplay from "../components/WeatherDisplay";
import FavouriteCity from "../components/FavouriteCity";
import ThemeToggle from "../components/ThemeToggle";

import useWeather from "../Hooks/useWeather";
import useFavourites from "../Hooks/useFavourites";

function Home() {
  const { weatherData, loading, error, searchCity, clearWeather } = useWeather();
  const { favorites, addFavorite, removeFavorite } = useFavourites();

  // Get current city from weather data
  const currentCity = weatherData?.current?.name;

  // ✅ Corrected check for existing favorite
  const isFavorite =
    currentCity &&
    favorites.some((f) => f.name.toLowerCase() === currentCity.toLowerCase());

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Weather Dashboard</h1>
        <ThemeToggle />
      </header>

      <SearchBar onSearch={searchCity} />

      {loading && <div className="loading-message">Loading weather data...</div>}

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button onClick={clearWeather} className="retry-button">
            Retry
          </button>
        </div>
      )}

      {/* ✅ Add Favorite uses hook correctly */}
      <WeatherDisplay
        data={weatherData}
        addFavorite={() => currentCity && !isFavorite && addFavorite(currentCity)}
        isFavorite={isFavorite}
      />

      {/* ✅ Pass removeFavorite with ID */}
      <FavouriteCity
        favorites={favorites}
        onRemove={(id) => removeFavorite(id)}
        onSelect={searchCity}
      />

      <footer className="home-footer">
        <button onClick={clearWeather} className="clear-button">
          Clear Weather
        </button>
      </footer>
    </div>
  );
}

export default Home;
