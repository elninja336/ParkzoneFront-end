import React, { useState } from 'react';
import './MyBookings.css';
// import { Link } from 'react-router-dom';

const MyBookings = () => {
  // Sample bookings data (replace with backend API call)
  const [bookings] = useState([
    {
      id: 1,
      parkingLot: 'Downtown Parking',
      date: '2025-01-10',
      time: '10:00 AM - 2:00 PM',
      status: 'Completed',
      price: '$20',
    },
    {
      id: 2,
      parkingLot: 'Airport Parking',
      date: '2025-01-12',
      time: '8:00 AM - 12:00 PM',
      status: 'Upcoming',
      price: '$40',
    },
  ]);

  return (
    <div className="my-bookings-container">
      <h1>My Bookings</h1>
      {bookings.length > 0 ? (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div className="booking-item" key={booking.id}>
              <h2>{booking.parkingLot}</h2>
              <p>
                <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <strong>Time:</strong> {booking.time}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
              <p>
                <strong>Price:</strong> {booking.price}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found. Start booking your parking spaces now!</p>
      )}
    </div>
  );
};

export default MyBookings;
