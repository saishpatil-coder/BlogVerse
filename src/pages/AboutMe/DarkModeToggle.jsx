import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function DarkModeToggle({ isDarkMode, toggleDarkMode }) {
  return (
    <div className="fixed top-24 right-6 z-50">
      <button
        onClick={toggleDarkMode}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
          isDarkMode
            ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
      </button>
    </div>
  );
} 