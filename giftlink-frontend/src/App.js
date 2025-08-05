import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
function App() {

  return (
    <>
         <Navbar />
      <div className="container-fluid p-0">
        <Routes>
          {/* Main Application Routes */}
          <Route path="/" element={<MainPage />} />
          <Route path="/app" element={<MainPage />} />
          
          {/* Authentication Routes */}
          <Route path="/app/login" element={<LoginPage />} />
          <Route path="/app/register" element={<RegisterPage />} />
          
          {/* Optional: 404 Catch-all Route */}
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
