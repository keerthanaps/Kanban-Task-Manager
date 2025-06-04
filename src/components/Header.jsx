import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // Optional: if using lucide-react icons

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <header className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Kanban Task Manager</h1>

      {/* Toggle Switch */}
      <div
  className="w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-all duration-300"
  onClick={() => setDarkMode(!darkMode)}
>
  <div className="flex justify-between w-full px-1 items-center text-sm text-white">
    <Moon size={14} className="opacity-80" />
    <Sun size={14} className="opacity-80" />
  </div>
  <div
    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 absolute ${
      darkMode ? "translate-x-6" : "translate-x-1"
    }`}
  ></div>
</div>

    </header>
  );
};

export default Header;
