import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Optional: persist theme to backend
    /*
    try {
      await fetch('http://localhost:5000/user/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: newTheme }),
      });
    } catch (err) {
      console.error('Failed to save theme preference:', err);
    }
    */
  };

  return (
    <button
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      className={`theme-toggle-button ${
        theme === "light" ? "theme-toggle-light" : "theme-toggle-dark"
      }`}
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}

export default ThemeToggle;
