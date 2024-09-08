import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/style.css'; // Import custom CSS if needed

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('/');
  const location = useLocation();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = (path) => {
    setActivePage(path);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <Link
          className="navbar-brand me-auto"
          to="/"
          onClick={() => handleNavLinkClick('/')}
        >
          <img 
            src={process.env.PUBLIC_URL + '/assets/images/etourmo_logo.png'} 
            alt="eTourmo Logo" 
            width="auto" 
            height="40" 
          />
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={handleToggleMenu} 
          aria-controls="offcanvasNavbar" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div 
          className={`offcanvas offcanvas-end${isMenuOpen ? ' show' : ''}`} 
          id="offcanvasNavbar" 
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleToggleMenu} 
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li className="nav-item">
                <Link
                  className={`nav-link mx-lg-2${activePage === '/travel-packages' ? ' active' : ''}`} 
                  to="/travel-packages" 
                  onClick={() => handleNavLinkClick('/travel-packages')}
                >
                  Travel Packages
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link mx-lg-2${activePage === '/accommodation' ? ' active' : ''}`} 
                  to="/accommodation" 
                  onClick={() => handleNavLinkClick('/accommodation')}
                >
                  Accommodation
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link mx-lg-2${activePage === '/transportation' ? ' active' : ''}`} 
                  to="/transportation" 
                  onClick={() => handleNavLinkClick('/transportation')}
                >
                  Transportation
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link mx-lg-2${activePage === '/trip-planner' ? ' active' : ''}`} 
                  to="/trip-planner" 
                  onClick={() => handleNavLinkClick('/trip-planner')}
                >
                  Trip Planner
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link mx-lg-2${activePage === '/reviews' ? ' active' : ''}`} 
                  to="/reviews" 
                  onClick={() => handleNavLinkClick('/reviews')}
                >
                  Reviews
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link mx-lg-2${activePage === '/about-us' ? ' active' : ''}`} 
                  to="/about-us" 
                  onClick={() => handleNavLinkClick('/about-us')}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
