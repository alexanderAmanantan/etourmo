import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PackageDetails.css';
import Modal from './Modal'; // Assuming Modal is in the same directory

function PackageDetails({ isOpen, onClose, packageId }) {
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      if (!packageId) return; // Don't fetch if no package ID is provided
      try {
        const response = await fetch(`http://localhost:80/getPackagesDetails.php?package_id=${packageId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch package details');
        }
        const data = await response.json();
        setPackageDetails(data);
      } catch (error) {
        console.error('Error:', error.message);
        setError('An error occurred while fetching package details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails(); // Call the function
  }, [packageId]); // Fetch details when packageId changes

  if (loading) {
    return <p>Loading package details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!packageDetails) {
    return <p>No details available for this package.</p>;
  }

  const {
    package_location,
    package_description,
    package_price,
    package_pax,
    package_inclusion,
    package_not_included,
    package_requirements,
    package_availability,
    package_duration,
    package_discounts,
    package_cancellation_policy,
    package_itinerary,
    contact_information,
    images,
  } = packageDetails;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="package-details-container">
        <h2>{package_location}</h2>
        <div className="image-container">
          {images && images.length > 0 ? (
            images.map((img, index) => (
              <img 
                key={index} 
                src={`data:image/jpeg;base64,${img.image_data}`} 
                alt={`Package view ${index + 1}`} 
                loading="lazy" 
                className="package-image"
              />
            ))
          ) : (
            <img src="path/to/placeholder/image.png" alt="Default package view" className="package-image" />
          )}
        </div>
        <div className="package-detail">
          <p><strong>Description:</strong> {package_description}</p>
        </div>
        <div className="package-detail">
          <p><strong>Price:</strong> {package_price}</p>
        </div>
        <div className="package-detail">
          <p><strong>Pax:</strong> {package_pax}</p>
        </div>
        <div className="package-detail">
          <p><strong>Inclusions:</strong> {package_inclusion}</p>
        </div>
        <div className="package-detail">
          <p><strong>Not Included:</strong> {package_not_included}</p>
        </div>
        <div className="package-detail">
          <p><strong>Requirements:</strong> {package_requirements}</p>
        </div>
        <div className="package-detail">
          <p><strong>Availability:</strong> {package_availability}</p>
        </div>
        <div className="package-detail">
          <p><strong>Duration:</strong> {package_duration}</p>
        </div>
        <div className="package-detail">
          <p><strong>Discounts:</strong> {package_discounts}</p>
        </div>
        <div className="package-detail">
          <p><strong>Cancellation Policy:</strong> {package_cancellation_policy}</p>
        </div>
        <div className="package-detail">
          <p><strong>Itinerary:</strong> {package_itinerary}</p>
        </div>
        <div className="package-detail">
          <p><strong>Contact Information:</strong> {contact_information}</p>
        </div>
      </div>
    </Modal>
  );
}

PackageDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  packageId: PropTypes.string, // New prop for package ID
};

export default PackageDetails;
