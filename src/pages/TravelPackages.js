// src/pages/TravelPackages.js
import React from 'react';
import './TravelPackages.css'; // Ensure this file exists and contains your styles

// Sample travel packages data
const packages = [
  {
    id: 1,
    title: 'Vietnam Tour',
    description: 'Discover the rich history, lush landscapes, and delicious cuisine of Vietnam on a captivating journey.',
    imageUrl: '/assets/images/Vietnam.png' 
  },
  {
    id: 2,
    title: 'Thailand Tour',
    description: 'Experience the vibrant culture, stunning beaches, and bustling markets of Thailand on an unforgettable adventure.',
    imageUrl: '/assets/images/Thailand.png' 
  },
  // Add more packages as needed
];

function TravelPackages() {
  return (
    <div className="travel-packages">
      <h2>Travel Packages</h2>
      <p>Explore our wide range of travel packages.</p>
      <div className="package-list">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <img src={pkg.imageUrl} alt={pkg.title} className="package-image" />
            <h3 className="package-title">{pkg.title}</h3>
            <p className="package-description">{pkg.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TravelPackages;
