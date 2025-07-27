import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const city = input.trim();

    if (!city) return;

    // ✅ Trigger weather search (handled in Home via useWeather hook)
    onSearch(city);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar flex gap-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search city..."
        aria-label="Search city"
        className="border rounded px-3 py-2 flex-1"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;

