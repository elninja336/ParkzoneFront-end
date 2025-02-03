import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import axiosInstance from '../axiosInstance';
import './ManageCustomers.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const customerId = 12;

  useEffect(() => {
    // Fetching customers from the backend
    // axios.get(http://)
    axiosInstance.get('/customers/')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching customers:", error);
      });
  }, []);


  // new codes for edit button
  const [editCustomer, setEditCustomer] = useState(null); // State to store the customer being edited

const handleEdit = (customerId) => {
  const customerToEdit = customers.find((customer) => customer.id === customerId);
  setEditCustomer(customerToEdit); // Set the selected customer for editing
};



  const handleDelete = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      axiosInstance
        .delete(`/customers/${customerId}`)
        .then(() => {
          setCustomers(customers.filter((customer) => customer.id !== customerId));
          alert('Customer deleted successfully!');
        })
        .catch((error) => {
          console.error('Error deleting customer:', error);
          alert('Failed to delete the customer.');
        });
    }
  };
  const [showAddForm, setShowAddForm] = useState(false);
const [newCustomer, setNewCustomer] = useState({
  name: '',
  email: '',
  phone: '',
  password: '',
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewCustomer((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleAddCustomer = () => {
  if (!newCustomer.name || !newCustomer.email || !newCustomer.phone || !newCustomer.password) {
    alert('All fields are required!');
    return;
  }

  axiosInstance.post('/customers/', newCustomer)
    .then((response) => {
      setCustomers((prev) => [...prev, response.data]);
      setNewCustomer({ name: '', email: '', phone: '', residence: '',password: '' });
      setShowAddForm(false);
      alert('Customer added successfully!');
    })
    .catch((error) => {
      console.error('Error adding customer:', error);
      alert('Failed to add the customer.');
    });
};



  

  return (
    <div className='container'>
    <header className="header">
        <h1>Manage Customers</h1>
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

      <button className="add-button" onClick={() => setShowAddForm(true)}>Add Customer</button>
      
      {showAddForm && (
  <div className="add-customer-form">
    <h2>Add New Customer</h2>
    <label>Name:</label>
    <input type="text" name="name" value={newCustomer.name} onChange={handleInputChange} />
    <label>Email:</label>
    <input type="email" name="email" value={newCustomer.email} onChange={handleInputChange} />
    <label>Phone:</label>
    <input type="tel" name="phone" value={newCustomer.phone} onChange={handleInputChange} />
    <label htmlFor="">Residence:</label>
    <input type='teext' name='residence' value={newCustomer.residence} onChange={handleInputChange}></input>
    <label>Password:</label>
    <input id='down-input' type="password" name="password" value={newCustomer.password} onChange={handleInputChange} />
    <button className='save-button' onClick={handleAddCustomer}>Save</button>
    <button className='cancel-button' onClick={() => setShowAddForm(false)}>Cancel</button>
  </div>
)}

      <table className='customers-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Residence</th>
            <th>Password</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.residence}</td>
              <td>
                  {customer.showPassword
                  ? customer.password
                  : "*".repeat(customer.password.length)}
                  <button id='show-hide'
                  onClick={() =>
                  setCustomers(customers.map(c =>
                  c.id === customer.id
                  ? { ...c, showPassword: !c.showPassword }
                  : c
                  ))
                  }
                  >
                  {customer.showPassword ? "Hide " : "Show Password"}
                  </button>
              </td>

              {/* <td>{'*'.repeat(customer.password.length)}</td> */}
              
              <td>
                <button className='edit-button' onClick={() => handleEdit(customer.id)}>Edit</button>

                {/* edit customer button */}
                        {editCustomer && (
          <div className="edit-overlay">
            <div className="edit-form">
              <h2>Edit Customer</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  axiosInstance
                    .put(`/customers/${editCustomer.id}`, editCustomer)
                    .then((response) => {
                      alert("Customer updated successfully!");
                      setEditCustomer(null); // Close the form
                      setCustomers((prevCustomers) =>
                        prevCustomers.map((customer) =>
                          customer.id === editCustomer.id ? response.data : customer
                        )
                      );
                    })
                    .catch((error) => {
                      console.error("Error updating customer:", error);
                      alert("Failed to update customer.");
                    });
                }}
              >
                <label>
                  Name:
                  <input
                    type="text"
                    value={editCustomer.name}
                    onChange={(e) =>
                      setEditCustomer({ ...editCustomer, name: e.target.value })
                    }
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    value={editCustomer.email}
                    onChange={(e) =>
                      setEditCustomer({ ...editCustomer, email: e.target.value })
                    }
                  />
                </label>
                <label>
                  Phone:
                  <input
                    type="text"
                    value={editCustomer.phone}
                    onChange={(e) =>
                      setEditCustomer({ ...editCustomer, phone: e.target.value })
                    }
                  />
                </label>
                <label>
                  Residence:
                  <input
                    type="tel"
                    value={editCustomer.residence}
                    onChange={(e) =>
                      setEditCustomer({ ...editCustomer, residence: e.target.value })
                    }
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    value={editCustomer.password}
                    onChange={(e) =>
                      setEditCustomer({ ...editCustomer, password: e.target.value })
                    }
                  />
                </label>
                <div className="form-buttons">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditCustomer(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

                <button className='delete-button' onClick={() => handleDelete(customer.id)}>Delete</button>
                

                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCustomers;
