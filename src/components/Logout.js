import React from 'react';

const Logout = ({ onLogout }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Are you sure you want to logout?</h2>
      <button
        onClick={onLogout}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>
    </div>
  </div>
);

export default Logout;