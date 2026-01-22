import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Booking from './pages/Booking';
import History from './pages/History';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-ride" element={<Booking />} />
        <Route path="/my-rides" element={<History />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
