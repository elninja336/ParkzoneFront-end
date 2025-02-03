import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';
// import { Link } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  // Simulate logout functionality
  const handleLogout = () => {
    // Clear session data or authentication tokens if you're using them
    // For now, we just redirect to the login page

    // Simulate clearing session data (localStorage, cookies, etc.)
    localStorage.removeItem('userSession'); // Example: clear session storage

    // Redirect to login page after logout
    navigate('/');
  };
  const handleCancel = () => {
    navigate(-1); // Redirect to the dashboard or the previous page
  };

  return (
    <div>
      <header className="header">
        <h1>Logout</h1>
      </header>
      <div className="container">
        <p>Are you sure you want to log out?</p>
        <button onClick={handleCancel} className='logout-button' id='cencel'>Cencel</button>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Logout;
