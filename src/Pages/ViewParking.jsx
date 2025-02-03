import React, { useState, useEffect } from 'react';
import './ViewParking.css';
// import { Link } from 'react-router-dom';

const ViewParking = () => {
  const [parkingData, setParkingData] = useState([]);

  useEffect(() => {
    // Simulate fetching parking data from the backend
    const fetchData = async () => {
      const data = [
        { id: 1, category: 'Temporary', slots: 15, price: 'Tsh 1,000 /day' },
        { id: 2, category: 'Permanent', slots: 5, price: 'Tsh 20,000 /month' },
      ];
      setParkingData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Available Parking Slots</h1>
      </header>
      <div className="parking-container">
        {parkingData.length > 0 ? (
          parkingData.map((parking) => (
            <div key={parking.id} className="parking-card">
              <h2>{parking.category} Parking</h2>
              <p>Available Slots: {parking.slots}</p>
              <p>Price: {parking.price}</p>
              <button className="book-button">Book Now</button>
            </div>
          ))
        ) : (
          <p>Loading parking data...</p>
        )}
      </div>
    </div>
  );
};

export default ViewParking;
