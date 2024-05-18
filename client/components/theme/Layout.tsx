"use client";

import { useState, useEffect } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const Layout = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <nav className="dark:bg-dark-700 flex items-end justify-end">
        <div className="flex items-center ">
          <button
            className="text-dark-700 hover:text-gray-300 focus:outline-none"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <MdOutlineLightMode color="#fff" />
            ) : (
              <MdOutlineDarkMode />
            )}
          </button>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
