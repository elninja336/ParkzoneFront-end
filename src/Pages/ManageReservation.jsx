import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './ManageReservation.css';
import { Link } from 'react-router-dom';

const ManageReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [parkingLots, setParkingLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editReservation, setEditReservation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReservation, setNewReservation] = useState({
    customer: '',
    parkingLot: '',
    reservationDate: '',
    startDate: '',
    endDate: '',
    status: 'PENDING',
  });

  // Fetch data
  useEffect(() => {
    fetchReservations();
    fetchCustomers();
    fetchParkingLots();
  }, []);

  const fetchReservations = () => {
    setLoading(true);
    axiosInstance
      .get('/reservations/')
      .then((response) => {
        setReservations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
        setLoading(false);
      });
  };

  const fetchCustomers = () => {
    axiosInstance
      .get('/customers/')
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error('Error fetching customers:', err));
  };

  const fetchParkingLots = () => {
    axiosInstance
      .get('/parkinglots/')
      .then((res) => setParkingLots(res.data))
      .catch((err) => console.error('Error fetching parking lots:', err));
  };

  const handleEdit = (reservation) => {
    setEditReservation({ ...reservation });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    axiosInstance
      .put(`/reservations/${editReservation.id}`, editReservation)
      .then(() => {
        alert('Reservation updated successfully!');
        fetchReservations();
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error('Error updating reservation:', error);
        alert('Failed to update reservation.');
      });
  };

  const handleSaveNew = () => {
    axiosInstance
      .post('/reservations/', newReservation)
      .then(() => {
        alert('Reservation added successfully!');
        fetchReservations();
        setShowAddModal(false);
        setNewReservation({
          customer: '',
          parkingLot: '',
          reservationDate: '',
          startDate: '',
          endDate: '',
          status: 'PENDING',
        });
      })
      .catch((error) => {
        console.error('Error adding reservation:', error);
        alert('Failed to add reservation.');
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      axiosInstance
        .delete(`/reservations/${id}`)
        .then(() => {
          alert('Reservation deleted successfully!');
          fetchReservations();
        })
        .catch((error) => {
          console.error('Error deleting reservation:', error);
          alert('Failed to delete reservation.');
        });
    }
  };

  return (
    <div>
      <header className="header">
        <h1>Manage Reservations</h1>
      </header>
      <nav className="nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/manage-reservations">Manage Reservations</Link>
        <Link to="/manage-slots">Manage Slots</Link>
        <Link to="/manage-customers">Manage Customers</Link>
        <Link to="/manage-payments">Manage Payments</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/logout" className="logout-link">Logout</Link>
      </nav>

      <div className="container">
        <button className="add-button" onClick={() => setShowAddModal(true)}>
          Add Reservation
        </button>

        {/* Add Reservation Modal */}
        {showAddModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add New Reservation</h2>

              <label>
                Customer:
                <select
                  value={newReservation.customer}
                  onChange={(e) =>
                    setNewReservation({ ...newReservation, customer: e.target.value })
                  }
                >
                  <option value="">-- Select Customer --</option>
                  {customers.map((cust) => (
                    <option key={cust.id} value={cust.email}>
                      {cust.name} ({cust.email})
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Parking Lot:
                <select
                  value={newReservation.parkingLot}
                  onChange={(e) =>
                    setNewReservation({ ...newReservation, parkingLot: e.target.value })
                  }
                >
                  <option value="">-- Select Parking Lot --</option>
                  {parkingLots.map((lot) => (
                    <option key={lot.id} value={lot.slotNumber}>
                      {lot.slotNumber}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Start Date:
                <input
                  type="date"
                  value={newReservation.startDate}
                  onChange={(e) =>
                    setNewReservation({ ...newReservation, startDate: e.target.value })
                  }
                />
              </label>
              <label>
                End Date:
                <input
                  type="date"
                  value={newReservation.endDate}
                  onChange={(e) =>
                    setNewReservation({ ...newReservation, endDate: e.target.value })
                  }
                />
              </label>
              <label>
                Status:
                <select
                  value={newReservation.status}
                  onChange={(e) =>
                    setNewReservation({ ...newReservation, status: e.target.value })
                  }
                >
                  <option value="PENDING">Pending</option>
                  <option value="COMFIRMED">Confirmed</option>
                  <option value="CENCELLED">Cancelled</option>
                </select>
              </label>

              <div className="modal-buttons">
                <button className="save-button" onClick={handleSaveNew}>Add</button>
                <button className="cencel-button" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p>Loading reservations...</p>
        ) : (
          <table className="reservations-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Parking Lot</th>
                <th>Reservation Date</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length > 0 ? (
                reservations.map((reservation, index) => (
                  <tr key={reservation.id}>
                    <td>{index + 1}</td>
                    <td>{reservation.customer}</td>
                    <td>{reservation.parkingLot}</td>
                    <td>{reservation.reservationDate}</td>
                    <td>{reservation.startDate}</td>
                    <td>{reservation.endDate}</td>
                    <td>{reservation.status}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(reservation)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(reservation.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No reservations available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Reservation Modal */}
      {showEditModal && editReservation && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Reservation</h2>

            <label>
              Customer:
              <input
                type="text"
                value={editReservation.customer}
                onChange={(e) =>
                  setEditReservation({ ...editReservation, customer: e.target.value })
                }
              />
            </label>

            <label>
              Parking Lot:
              <input
                type="text"
                value={editReservation.parkingLot}
                onChange={(e) =>
                  setEditReservation({ ...editReservation, parkingLot: e.target.value })
                }
              />
            </label>

            <label>
              Reservation Date:
              <input
                type="date"
                value={editReservation.reservationDate}
                onChange={(e) =>
                  setEditReservation({ ...editReservation, reservationDate: e.target.value })
                }
              />
            </label>

            <label>
              Start Date:
              <input
                type="date"
                value={editReservation.startDate}
                onChange={(e) =>
                  setEditReservation({ ...editReservation, startDate: e.target.value })
                }
              />
            </label>

            <label>
              End Date:
              <input
                type="date"
                value={editReservation.endDate}
                onChange={(e) =>
                  setEditReservation({ ...editReservation, endDate: e.target.value })
                }
              />
            </label>

            <label>
              Status:
              <select
                value={editReservation.status}
                onChange={(e) =>
                  setEditReservation({ ...editReservation, status: e.target.value })
                }
              >
                <option value="PENDING">Pending</option>
                <option value="COMFIRMED">Confirmed</option>
                <option value="CENCELLED">Cancelled</option>
              </select>
            </label>

            <div className="modal-buttons">
              <button className="save-button" onClick={handleSaveEdit}>Save</button>
              <button className="cencel-button" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReservation;
