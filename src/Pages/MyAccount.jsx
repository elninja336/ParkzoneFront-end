import React, { useState, useEffect } from 'react';
import './MyAccount.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const MyAccount = () => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [parkingHistory, setParkingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountAndHistory = async () => {
      try {
        setLoading(true);
        const loggedInEmail = localStorage.getItem('customer_email');

        // Fetch all customers and find the current one
        const customerRes = await axiosInstance.get('/customers/');
        const customers = customerRes.data;
        const matchedCustomer = customers.find(c => c.email === loggedInEmail);

        if (matchedCustomer) {
          setAccountDetails(matchedCustomer);

          // Fetch reservations for the current customer
          const reservationRes = await axiosInstance.get('/reservations/');
          const reservations = reservationRes.data;
          const customerReservations = reservations.filter(r => r.customer === loggedInEmail);

          setParkingHistory(customerReservations);
        } else {
          setError('Customer not found.');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error loading account or history:', err);
        setError('Failed to load account details. Please try again.');
        setLoading(false);
      }
    };

    fetchAccountAndHistory();
  }, []);

  if (loading) {
    return <p>Loading account details...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div>
      <header className="header">
        <h1>My Account</h1>
      </header>
      {accountDetails && (
        <div className="account-container">
          <div className="account-info">
            <h2>Account Details</h2>
            <p><strong>Customer ID:</strong> {accountDetails.id}</p>
            <p><strong>Name:</strong> {accountDetails.name}</p>
            <p><strong>Email:</strong> {accountDetails.email}</p>
            <p><strong>Phone:</strong> {accountDetails.phone}</p>
            <p><strong>Residence:</strong> {accountDetails.residence}</p>
          </div>
          <Link to="/profile" className="action-button" id="btn">
        Edit Personal Details
      </Link>

          <div className="parking-history">
            <h2>Parking History</h2>
            <ul>
              {parkingHistory.length > 0 ? (
                parkingHistory.map((entry) => (
                  <li key={entry.id}>
                    Slot: {entry.parkingLot}, From: {entry.startDate}, To: {entry.endDate}, Status: {entry.status}
                  </li>
                ))
              ) : (
                <li>No parking history available.</li>
              )}
            </ul>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default MyAccount;
