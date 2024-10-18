// src/TravelPackages.js
import React, { useEffect, useState } from 'react';
import './TravelPackages.css';
import PackageDetails from './rePackageDetails'; // Import the PackageDetails component

function TravelPackages() {
  const [packages, setPackages] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedPackageId, setSelectedPackageId] = useState(null); // State for selected package
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost/getPackages.php'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const data = await response.json();
        setPackages(data); // Set packages data from API
      } catch (error) {
        setError(error.message); // Set error message if there's a problem
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPackages(); // Fetch packages when the component mounts
  }, []);

  // Open the modal and set the selected package ID
  const openModal = (packageId) => {
    setSelectedPackageId(packageId); // Set selected package ID
    setModalOpen(true); // Open the modal
  };

  // Close the modal and reset selected package
  const closeModal = () => {
    setModalOpen(false); // Close the modal
    setSelectedPackageId(null); // Reset selected package ID
  };

  if (loading) {
    return <p>Loading packages...</p>; // Show loading message while fetching
  }

  if (error) {
    return <p>{error}</p>; // Show error message if there's a problem
  }

  return (
    <div className="travel-packages">
      <div className="center-name mb-3 pb-0">
        <h6 className="text-uppercase featured-packages-title">Featured Packages</h6>
        <h7 className="text-uppercase featured-packages-localtitle">Local</h7>
        <h7 className="text-uppercase featured-packages-splittitle">|</h7>
        <h7 className="text-uppercase featured-packages-internationaltitle">International</h7>
      </div>
      <div className="featured-package-container">
        {packages.length > 0 ? (
          packages.map((packageItem) => (
            <div key={packageItem.package_id} className="featured-package">
              <div className="featured-package-img" onClick={() => openModal(packageItem.package_id)}>
                <img 
                  src={packageItem.image_data ? `data:image/jpeg;base64,${packageItem.image_data}` : 'path/to/placeholder/image.png'} 
                  alt={packageItem.package_location}
                  loading="lazy"
                />
              </div>
              <div className="featured-package-details">
                <div className="package-location-container" onClick={() => openModal(packageItem.package_id)}>
                  <h5>{packageItem.package_location}</h5>
                </div>
                <p>{packageItem.package_description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No packages available.</p>
        )}
      </div>

      {/* Modal for Package Details */}
      {selectedPackageId && (
        <PackageDetails 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          packageId={selectedPackageId} // Pass the selected package ID to the modal
        />
      )}
    </div>
  );
}

export default TravelPackages;
