const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const BACKEND_URL = "https://weather-dashboard-mern-1.onrender.com/api/favorites";


// ✅ Backend URL (update this to your Render backend URL when deployed)
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

// ✅ Get all favorite cities
export async function getFavorites() {
  const res = await fetch(${BACKEND_URL}/favorites);
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return await res.json();
}

// ✅ Add a city to favorites
export async function addFavoriteCity(name) {
  const res = await fetch(${BACKEND_URL}/favorites, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to add favorite");
  return await res.json();
}

// ✅ Remove a city from favorites
export async function removeFavoriteCity(id) {
  const res = await fetch(${BACKEND_URL}/favorites/${id}, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to remove favorite");
  return await res.json();
}

// ✅ Fetch current weather (from OpenWeather API)
export async function fetchCurrentWeather(city) {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const url = https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather data");
  return await res.json();
}

// ✅ Fetch 5-day forecast
export async function fetchForecast(city) {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const url = https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch forecast data");
  return await res.json();
}
