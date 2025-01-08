//App.js
import React, { useState } from 'react'; // Add useState import
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import SheetData from './components/SheetData';
import Header from './components/Header';
import Management from './components/Management';
import ReportsPage from './components/ReportsPage';
import { DataProvider } from './DataContext'; // Correct import path

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <Router>
      <DataProvider>
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
          <Route
            path="/reports"
            element={
              isLoggedIn ? (
                <ReportsPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </DataProvider>
    </Router>
  );
};

export default App;