import React, { useState, useEffect } from 'react';
import './CustomerHome.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const CustomerHome = () => {
  const [availableParking, setAvailableParking] = useState([]);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/profile');
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const name = localStorage.getItem('customer_name');
    const email = localStorage.getItem('customer_email');
    const phone = localStorage.getItem('customer_phone');
    const residence = localStorage.getItem('customer_residence');

    setUserProfile({
      name: name || '',
      email: email || '',
      phone: phone || '',
      residence: residence || '',
    });

    axiosInstance.get('/reservations/')
      .then((response) => {
        const userReservations = response.data.filter(
          (reservation) => reservation.customer === email
        );
        setCurrentBookings(userReservations);
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
      });
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
                  <h3>Slot: {booking.parkingLot}</h3>
                  <p>Start: {booking.startDate}</p>
                  <p>End: {booking.endDate}</p>
                  <p>Status: {booking.status}</p>
                  <button className="view-booking-button" onClick={() => handleViewBooking(booking)}>
                    View Booking
                  </button>
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
            <p>Residence: {userProfile.residence}</p>
            <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
          </div>
        </section>
      </main>

      {isModalOpen && selectedBooking && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Booking Details</h2>
            <p><strong>Slot Number:</strong> {selectedBooking.parkingLot}</p>
            <p><strong>Reservation Date:</strong> {selectedBooking.reservationDate}</p>
            <p><strong>Start Date:</strong> {selectedBooking.startDate}</p>
            <p><strong>End Date:</strong> {selectedBooking.endDate}</p>
            <p><strong>Status:</strong> {selectedBooking.status}</p>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerHome;
