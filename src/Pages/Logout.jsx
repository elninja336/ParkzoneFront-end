import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.clear();

    // Optionally, clear sessionStorage too
    // sessionStorage.clear();

    // Redirect to login page
    navigate('/');
  };

  const handleCancel = () => {
    // Navigate to the previous page
    navigate(-1);
  };

  return (
    <div>
      <header className="header">
        <h1>Logout</h1>
      </header>
      <div className="container">
        <p>Are you sure you want to log out?</p>
        <button onClick={handleCancel} className="logout-button" id="cancel">
          Cancel
        </button>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Logout;
