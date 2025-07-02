import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './ManageSlots.css';
import { Link } from 'react-router-dom';

const ManageSlots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editSlot, setEditSlot] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSlot, setNewSlot] = useState({
    slotNumber: '',
    availability: 'AVAILABLE',
    category: 'TEMPORARY',
    price: '1000',
  });

  // Fetch parking lot data
  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = () => {
    setLoading(true);
    axiosInstance
      .get('/parkinglots/')
      .then((response) => {
        setSlots(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching parking lots:', error);
        setLoading(false);
      });
  };

  // Handle editing a slot
  const handleEdit = (slot) => {
    setEditSlot({ ...slot });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    axiosInstance
      .put(`/parkinglots/${editSlot.id}`, editSlot)
      .then(() => {
        alert('Slot updated successfully!');
        fetchSlots();
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error('Error updating slot:', error);
        alert('Failed to update slot.');
      });
  };

  // Handle adding a new slot
  const handleSaveNew = () => {
    axiosInstance
      .post('/parkinglots/', newSlot)
      .then(() => {
        alert('Slot added successfully!');
        fetchSlots();
        setShowAddModal(false);
        setNewSlot({
          slotNumber: '',
          availability: 'AVAILABLE',
          category: 'TEMPORARY',
          price: '',
        });
      })
      .catch((error) => {
        console.error('Error adding slot:', error);
        alert('Failed to add slot.');
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this slot?')) {
      axiosInstance
        .delete(`/parkinglots/${id}`)
        .then(() => {
          alert('Slot deleted successfully!');
          fetchSlots();
        })
        .catch((error) => {
          console.error('Error deleting slot:', error);
          alert('Failed to delete slot.');
        });
    }
  };

  return (
    <div>
      <header className="header">
        <h1>Manage Slots</h1>
      </header>
      <nav className="nav">
      <Link to="/dashboard" >
            Dashboard
      </Link>
      <Link to="/manage-reservations" >
      Manage Reservations
      </Link>
      <Link to="/manage-slots" >
      Manage Slots
      </Link>
      <Link to="/manage-customers" >
      Manage Customers
      </Link>
      <Link to="/manage-payments" >
      Manage Payments
      </Link>
      <Link to="/reports" >
      Reports
      </Link>
      <Link to="/logout" lassName="logout-link">
      Logout
      </Link>
        {/* <a href="/dashboard">Dashboard</a> */}
        {/* <a href="/manage-reservations">Manage Reservations</a>
        <a href="/manage-slots">Manage Slots</a>
        <a href="manage-customers">Manage Customers</a>
        <a href="/manage-payments">Manage Payments</a>
        <a href="/reports">Reports</a>
        <a href="/logout" className="logout-link">Logout</a> */}
      </nav>
      
      <div className="container">
        <button className="add-button" onClick={() => setShowAddModal(true)}>
          Add Slot
        </button>

        {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Slot</h2>
            <label>
              Slot Number:
              <input
                type="text"
                value={newSlot.slotNumber}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, slotNumber: e.target.value })
                }
              />
            </label>
            <label>
              Status:
              <select
                value={newSlot.availability}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, availability: e.target.value })
                }
              >
                <option value="AVAILABLE">Available</option>
                <option value="OCCUPIED">Occupied</option>
                <option value="RESERVED">Reserved</option>
              </select>
            </label>
            <label>
                Category:
                <select
                  value={newSlot.category}
                  onChange={(e) => {
                    const selectedCategory = e.target.value;
                    let updatedPrice = newSlot.price;

                    // Set price based on selected category
                    if (selectedCategory === 'TEMPORARY') {
                      updatedPrice = 1000; 
                    } else if (selectedCategory === 'PARMANENT') {
                      updatedPrice = 25000;
                    }

                    setNewSlot({
                      ...newSlot,
                      category: selectedCategory,
                      price: updatedPrice,
                    });
                  }}
                >
                  <option value="TEMPORARY">Temporary</option>
                  <option value="PARMANENT">Parmanent</option>
                </select>
            </label>

            <label>
              Price:
              <input
                type="number"
                value={newSlot.price}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, price: e.target.value })
                }
              />
            </label>
            <div className="modal-buttons">
              <button className="save-button" onClick={handleSaveNew}>Add</button>
              <button className="cencel-button" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
        {loading ? (
          <p>Loading parking lots...</p>
        ) : (
          
          <table className="slots-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Slot Number</th>
                <th>Status</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.length > 0 ? (
                slots.map((lot, index) => (
                  <tr key={lot.id}>
                    <td>{index + 1}</td>
                    <td>{lot.slotNumber}</td>
                    <td>{lot.availability}</td>
                    <td>{lot.category}</td>
                    <td>{lot.price}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(lot)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(lot.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No parking lots available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Slot Modal */}
      {showEditModal && editSlot && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Slot</h2>
            <label>
              Slot Number:
              <input
                type="text"
                value={editSlot.slotNumber}
                onChange={(e) =>
                  setEditSlot({ ...editSlot, slotNumber: e.target.value })
                }
              />
            </label>
            <label>
              Status:
              <select
                value={editSlot.availability}
                onChange={(e) =>
                  setEditSlot({ ...editSlot, availability: e.target.value })
                }
              >
                <option value="AVAILABLE">Available</option>
                <option value="OCCUPIED">Occupied</option>
                <option value="RESERVED">Reserved</option>
              </select>
            </label>
            <label>
              Category:
              <select
                value={editSlot.category}
                onChange={(e) =>
                  setEditSlot({ ...editSlot, category: e.target.value })
                }
              >
                <option value="TEMPORARY">Temporary</option>
                <option value="PARMANENT">Parmanent</option>
              </select>
            </label>
            <label>
              Price:
              <input
                type="number"
                value={editSlot.price}
                onChange={(e) =>
                  setEditSlot({ ...editSlot, price: e.target.value })
                }
              />
            </label>
            <div className="modal-buttons">
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Slot Modal */}
      
    </div>
  );
};

export default ManageSlots;
