import React, { useState, useEffect } from 'react';
import './CustomerHome.css';

const CustomerHome = () => {
  const [availableParking, setAvailableParking] = useState([]);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    // Read customer details from localStorage
    const name = localStorage.getItem('customer_name');
    const email = localStorage.getItem('customer_email');
    const phone = localStorage.getItem('customer_phone');

    setUserProfile({
      name: name || '',
      email: email || '',
      phone: phone || '',
    });

    // You can later implement fetching bookings if needed
    setCurrentBookings([
      { id: 1, lotName: 'Parking Lot A', date: '2025-01-16', time: '3 hours' },
    ]);
  }, []);

  return (
    <div className="customer-home-container">
      {/* Header Section */}
      <header className="customer-home-header">
        <h1>Welcome, {userProfile.name}!</h1>
        <p>Your email: {userProfile.email}</p>
        <p>Your phone: {userProfile.phone}</p>
      </header>

      {/* Main Content Sections */}
      <main>
        {/* Current Bookings Section */}
        <section className="current-bookings-section">
          <h2>Your Current Bookings</h2>
          {currentBookings.length > 0 ? (
            <div className="current-bookings-list">
              {currentBookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <h3>{booking.lotName}</h3>
                  <p>Date: {booking.date}</p>
                  <p>Time: {booking.time}</p>
                  <button className="view-booking-button">View Booking</button>
                </div>
              ))}
            </div>
          ) : (
            <p>No active bookings found. Book a parking lot today!</p>
          )}
        </section>

        {/* Profile Overview Section */}
        <section className="profile-overview-section">
          <h2>Profile Overview</h2>
          <div className="profile-info">
            <p>Name: {userProfile.name}</p>
            <p>Email: {userProfile.email}</p>
            <p>Phone: {userProfile.phone}</p>
            <button className="edit-profile-button">Edit Profile</button>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="notifications-section">
          <h2>Notifications</h2>
          <ul>
            <li>Your booking at Parking Lot A is confirmed!</li>
            <li>Reminder: Your parking at Downtown expires in 2 hours.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CustomerHome;
