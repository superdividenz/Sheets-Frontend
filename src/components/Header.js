import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  const location = useLocation(); // Get the current route location

  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-black p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-xl font-bold hover:text-gray-400 transition-all duration-300 hover:scale-110"
        >
          Wegener Sealing
        </Link>
        <div>
          {isLoggedIn ? (
            <div className="flex">
              <Link
                to="/"
                className={`mr-4 transition-all duration-300 hover:scale-110 ${
                  isActive('/') ? 'text-gray-400 font-semibold' : 'text-white hover:text-gray-400'
                }`}
              >
                Sheet Data
              </Link>
              <Link
                to="/management"
                className={`mr-4 transition-all duration-300 hover:scale-110 ${
                  isActive('/management')
                    ? 'text-gray-400 font-semibold'
                    : 'text-white hover:text-gray-400'
                }`}
              >
                Management
              </Link>
              {/* Add Reports Link */}
              <Link
                to="/reports"
                className={`mr-4 transition-all duration-300 hover:scale-110 ${
                  isActive('/reports')
                    ? 'text-gray-400 font-semibold'
                    : 'text-white hover:text-gray-400'
                }`}
              >
                Reports
              </Link>
              <button
                onClick={onLogout}
                className="text-white hover:text-gray-400 transition-all duration-300 hover:scale-110"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`transition-all duration-300 hover:scale-110 ${
                isActive('/login') ? 'text-gray-400 font-semibold' : 'text-white hover:text-gray-400'
              }`}
              >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;