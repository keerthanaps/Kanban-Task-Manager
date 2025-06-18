// components/Header.jsx
import React, { useEffect, useState } from "react";
import { Moon, Sun, Download } from "lucide-react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        console.log("PWA installation accepted");
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return (
    <header className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Kanban Task Manager</h1>

      <div className="flex gap-4 items-center">
        {isInstallable && (
          <button
            onClick={handleInstall}
            className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-violet-600 text-white hover:bg-violet-700 transition"
          >
            <Download size={16} />
            Install
          </button>
        )}

        <div
          className="w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-all duration-300 relative"
          onClick={() => setDarkMode(!darkMode)}
        >
          <div className="flex justify-between w-full px-1 items-center text-sm text-white">
            <Moon size={14} className="opacity-80" />
            <Sun size={14} className="opacity-80" />
          </div>
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md absolute top-1 ${
              darkMode ? "translate-x-6" : "translate-x-1"
            } transition-transform duration-300`}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
