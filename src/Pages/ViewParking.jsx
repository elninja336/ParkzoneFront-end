import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './ViewParking.css';

const ViewParking = () => {
  const [temporaryData, setTemporaryData] = useState({ slots: [], price: 0 });
  const [permanentData, setPermanentData] = useState({ slots: [], price: 0 });
  const [showFormFor, setShowFormFor] = useState(null); // "TEMPORARY" or "PARMANENT"
  const [selectedLot, setSelectedLot] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await axiosInstance.get('/parkinglots/');
        const slots = response.data;
        const availableSlots = slots.filter(slot => slot.availability === 'AVAILABLE');

        const temporarySlots = availableSlots.filter(slot => slot.category === 'TEMPORARY');
        const permanentSlots = availableSlots.filter(slot => slot.category === 'PARMANENT');

        setTemporaryData({
          slots: temporarySlots,
          price: temporarySlots.length > 0 ? temporarySlots[0].price : 0,
        });

        setPermanentData({
          slots: permanentSlots,
          price: permanentSlots.length > 0 ? permanentSlots[0].price : 0,
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching parking data:', error);
        setLoading(false);
      }
    };

    fetchParkingData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      customer: localStorage.getItem('customer_email'),
      parkingLot: selectedLot,
      reservationDate: new Date().toISOString().split('T')[0],
      startDate,
      endDate,
      status: 'PENDING',
    };
    console.log('Sending payload:', payload);
    axiosInstance
      .post('/reservations/', payload)
      .then(() => {
        alert('Reservation successful!');
        setShowFormFor(null);
        setSelectedLot('');
        setStartDate('');
        setEndDate('');
      })
      .catch((error) => {
        console.error('Reservation error:', error);
        alert('Failed to reserve.');
      });
  };

  const renderReservationForm = (slots, type) => (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <label>
        Select Slot:
        <select
          value={selectedLot}
          onChange={(e) => setSelectedLot(e.target.value)}
          required
        >
          <option value="">--Choose--</option>
          {slots.map((slot) => (
            <option key={slot.id} value={slot.slotNumber}>
              {slot.slotNumber} — Tsh {slot.price}
            </option>
          ))}
        </select>
      </label>

      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">Confirm {type} Reservation</button>
    </form>
  );

  return (
    <div>
      <header className="header">
        <h1>Available Parking Slots</h1>
      </header>
      <div className="parking-container">
        {loading ? (
          <p>Loading parking data...</p>
        ) : (
          <>
            {/* TEMPORARY */}
            <div className="parking-card">
              <h2>Temporary Parking</h2>
              <p>Available Slots: {temporaryData.slots.length}</p>
              <p>Price: Tsh {temporaryData.price} /day</p>
              <button className="book-button" onClick={() => setShowFormFor(showFormFor === 'TEMPORARY' ? null : 'TEMPORARY')}>
                {showFormFor === 'TEMPORARY' ? 'Close' : 'Book Now'}
              </button>
              {showFormFor === 'TEMPORARY' && renderReservationForm(temporaryData.slots, 'Temporary')}
            </div>

            {/* PERMANENT */}
            <div className="parking-card">
              <h2>Permanent Parking</h2>
              <p>Available Slots: {permanentData.slots.length}</p>
              <p>Price: Tsh {permanentData.price} /month</p>
              <button className="book-button" onClick={() => setShowFormFor(showFormFor === 'PARMANENT' ? null : 'PARMANENT')}>
                {showFormFor === 'PARMANENT' ? 'Close' : 'Book Now'}
              </button>
              {showFormFor === 'PARMANENT' && renderReservationForm(permanentData.slots, 'Permanent')}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewParking;
