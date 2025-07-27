import { useState, useEffect } from "react";
import { fetchCurrentWeather, fetchForecast } from "../api/weatherApi";

function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastCity, setLastCity] = useState("");

  // Load weather data from local storage on mount
  useEffect(() => {
    const savedWeather = localStorage.getItem("weatherData");
    const savedCity = localStorage.getItem("lastCity");

    if (savedWeather) setWeatherData(JSON.parse(savedWeather));
    if (savedCity) setLastCity(savedCity);
  }, []);

  // Save weather data and last searched city to local storage
  useEffect(() => {
    if (weatherData) {
      localStorage.setItem("weatherData", JSON.stringify(weatherData));
    }
    if (lastCity) {
      localStorage.setItem("lastCity", lastCity);
    }
  }, [weatherData, lastCity]);

  const searchCity = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(cityName),
        fetchForecast(cityName),
      ]);

      setWeatherData({ current, forecast });
      setLastCity(cityName);

      // ⬇️ OPTIONAL: Cache or store in backend for recent searches
      /*
      await fetch('http://localhost:5000/search-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cityName }),
      });
      */
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "City not found or weather API failed.";
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearWeather = () => {
    setWeatherData(null);
    setError(null);
    setLastCity("");
    localStorage.removeItem("weatherData");
    localStorage.removeItem("lastCity");
  };

  return {
    weatherData,
    loading,
    error,
    lastCity,
    searchCity,
    clearWeather,
  };
}

export default useWeather;
