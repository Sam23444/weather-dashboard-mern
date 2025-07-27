import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);

  // Update <body> class and save to localStorage
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);

    // ⬇️ OPTIONAL: Save theme preference to backend
    /*
    try {
      fetch('http://localhost:5000/user/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme }),
      });
    } catch (err) {
      console.error('Failed to persist theme preference:', err);
    }
    */
  }, [theme]);

  // Optional cleanup if component ever unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove("light", "dark");
    };
  }, []);

  // Helper to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
