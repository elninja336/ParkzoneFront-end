import React from 'react';
import { Link } from 'react-router-dom';
import './Customer.css';

const Customer = () => {
  return (
    <div>
      <header className="header">
        <h1>Welcome to ParkZone</h1>
      </header>
      <nav className="nav">
        <Link to="/customer-home">Home</Link>
        <Link to="/view-parking">View Parking</Link>
        <Link to="/my-account">My Account</Link>
        <Link to="#">Support</Link>
        <Link to="/logout" className='logout-link'>Logout</Link>
      </nav>
      <div className="customer-home-container">
        <h2>Your Parking Made Easy</h2>
        <p>
          Quickly find and reserve your parking space with ParkZone. We make it
          convenient for you to manage your parking needs.
        </p>
        <div className="actions">
          <Link to="/view-parking" className="action-button">
            View Parking Availability
          </Link>
          <Link to="/my-account" className="action-button">
            View Account Details
          </Link>
          <br />
          {/* <Link to="/book" className="action-button">
            Book now
          </Link> */}
        </div>
        <div className="contact-support">
          <h3>Need Help?</h3>
          <p>Contact our support team for assistance.</p>
          <Link to="#" className="support-button">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Customer;
