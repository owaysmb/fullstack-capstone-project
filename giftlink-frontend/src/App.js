import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Component imports
import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchPage from './components/SearchPage/SearchPage';  // Add this import

function App() {
  return (
    <>
      <Navbar />
      <div className="container-fluid p-0">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/app" element={<MainPage />} />
          <Route path="/app/login" element={<LoginPage />} />
          <Route path="/app/register" element={<RegisterPage />} />
          <Route path="/app/product/:productId" element={<DetailsPage />} />
          <Route path="/app/search" element={<SearchPage />} />  {/* Add this route */}
        </Routes>
      </div>
    </>
  );
}

export default App;