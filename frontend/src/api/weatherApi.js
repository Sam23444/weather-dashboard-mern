const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const BACKEND_URL = "http://localhost:5000"; // backend base URL
const BACKEND_URL = "https://https://weather-dashboard-mern-ap0d.onrender.com/api/favorites";


const API_URL = "http://localhost:5000/api/favorites"; // Backend base URL

// --- WEATHER (OpenWeather API, already implemented) ---
const WEATHER_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const WEATHER_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (city) => {
  const res = await fetch(
    `${WEATHER_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch weather data");
  return res.json();
};

export const fetchForecast = async (city) => {
  const res = await fetch(
    `${WEATHER_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch forecast data");
  return res.json();
};

// --- FAVORITES (MERN Backend Integration) ---
export const getFavorites = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return res.json();
};

export const addFavoriteCity = async (city) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: city }),
  });
  if (!res.ok) throw new Error("Failed to add favorite city");
  return res.json();
};

export const removeFavoriteCity = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to remove favorite city");
  return res.json();
};
