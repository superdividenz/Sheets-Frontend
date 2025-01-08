import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import SheetData from './components/SheetData';
import Header from './components/Header'; 
import Management from './components/Management';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  useEffect(() => {
    console.log('isLoggedIn changed:', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    console.log('Login button clicked');
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    console.log('isLoggedIn:', true);
  };

  const handleLogout = () => {
    console.log('Logout button clicked');
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    console.log('isLoggedIn:', false);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <SheetData />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/management"
          element={
            isLoggedIn ? (
              <Management />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;