// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/style.css';

// Import page components
import Home from './pages/Home';
import TravelPackages from './pages/TravelPackages';
import Accommodation from './pages/Accommodation';
import Transportation from './pages/Transportation';
import TripPlanner from './pages/TripPlanner';
import Reviews from './pages/Reviews';
import AboutUs from './pages/AboutUs';

// Import Navbar component
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/travel-packages" element={<TravelPackages />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/transportation" element={<Transportation />} />
            <Route path="/trip-planner" element={<TripPlanner />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
