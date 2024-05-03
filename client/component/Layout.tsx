"use client"

import { useState, useEffect } from 'react';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const Layout = ({ children  } : any) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <nav className="dark:bg-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-dark-700"></div>
            </div>
            <div className="flex items-center">
              <button
                className="text-dark-700 hover:text-gray-300 focus:outline-none"
                onClick={toggleDarkMode}
              >
                {darkMode ? <MdOutlineLightMode color='#fff'/> : <MdOutlineDarkMode/>}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
