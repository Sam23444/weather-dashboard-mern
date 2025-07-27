import React, { useState } from "react";
import "./WeatherDisplay.css";

function WeatherDisplay({ data, addFavorite, isFavorite }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!data || !data.current) {
    return <p className="no-weather">Search for a city to see its weather.</p>;
  }

  const { current, forecast } = data;

  const handleAddFavorite = async () => {
    if (isFavorite) return; // prevent duplicate adds
    setLoading(true);
    setError(null);

    try {
      await addFavorite(current.name); // ✅ only call the prop (hook handles backend)
    } catch (err) {
      console.error("Add Favorite Error:", err);
      setError("Failed to add favorite. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-display">
      <h2>{current.name}</h2>
      <p>{current.weather[0].description}</p>
      <p>Temperature: {current.main.temp} °C</p>

      {/* ✅ Use button state based on isFavorite */}
      <button onClick={handleAddFavorite} disabled={loading || isFavorite}>
        {isFavorite ? "⭐ Already in Favorites" : loading ? "Adding..." : "Add to Favorites"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ Forecast Section */}
      {forecast?.list && (
        <>
          <h3>5-day Forecast</h3>
          <div className="forecast-list" style={{ display: "flex", overflowX: "auto" }}>
            {forecast.list
              .filter((_, i) => i % 8 === 0)
              .map((day) => (
                <div key={day.dt} className="forecast-item" style={{ margin: "0 10px" }}>
                  <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                  <p>{day.weather[0].main}</p>
                  <p>{day.main.temp} °C</p>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherDisplay;

