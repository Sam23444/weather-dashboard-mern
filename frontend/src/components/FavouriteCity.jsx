import React, { useState } from "react";
import "./FavouriteCity.css";

function FavouriteCity({ favorites, onRemove, onSelect }) {
  const [removingIds, setRemovingIds] = useState(new Set());

  const handleRemove = async (id) => {
    // Optimistic UI: mark city as removing
    setRemovingIds((prev) => new Set(prev).add(id));

    try {
      // ✅ Call hook-provided remove logic (handles backend deletion)
      await onRemove(id);
    } catch (err) {
      console.error("Failed to remove favorite:", err);
      alert("Failed to remove favorite city. Please try again.");
    } finally {
      // Always unmark as removing
      setRemovingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  return (
    <div className="favorite-cities">
      <h3>⭐ Favorite Cities</h3>
      {favorites.length === 0 ? (
        <p>No favorite cities yet.</p>
      ) : (
        <ul>
          {favorites.map((city) => (
            <li key={city._id}>
              <button onClick={() => onSelect(city.name)}>{city.name}</button>
              <button
                onClick={() => handleRemove(city._id)}
                disabled={removingIds.has(city._id)}
              >
                {removingIds.has(city._id) ? "Removing..." : "Remove"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavouriteCity;

