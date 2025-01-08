import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  const location = useLocation(); // Get the current route location

  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold hover:text-blue-200">
          Wegener Sealing
        </Link>
        <div>
          {isLoggedIn ? (
            <div className="flex">
              <Link
                to="/"
                className={`mr-4 ${
                  isActive('/') ? 'text-blue-200 font-semibold' : 'text-white hover:text-blue-200'
                }`}
              >
                Sheet Data
              </Link>
              <Link
                to="/management"
                className={`mr-4 ${
                  isActive('/management')
                    ? 'text-blue-200 font-semibold'
                    : 'text-white hover:text-blue-200'
                }`}
              >
                Management
              </Link>
              <button
                onClick={onLogout}
                className="text-white hover:text-blue-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`${
                isActive('/login') ? 'text-blue-200 font-semibold' : 'text-white hover:text-blue-200'
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