import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import "./ManagePayment.css";
import { Link } from "react-router-dom";

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [editPayment, setEditPayment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newPayment, setNewPayment] = useState({
    reservation: '',
    customer: '',
    amount: '',
    payment_date: '',
    payment_method: '',
    payment_status: '',
  });

  // Fetch payments from the backend
  useEffect(() => {
    axiosInstance
      .get("/payments/")
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
      });
  }, []);

  const handleEdit = (payment) => {
    setEditPayment(payment);
  };

  const handleDelete = (paymentId) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      axiosInstance
        .delete(`/payments/${paymentId}`)
        .then(() => {
          setPayments(payments.filter((payment) => payment.id !== paymentId));
          alert("Payment deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting payment:", error);
          alert("Failed to delete payment.");
        });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    axiosInstance
      .put(`/payments/${editPayment.id}`, editPayment)
      .then((response) => {
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment.id === editPayment.id ? response.data : payment
          )
        );
        setEditPayment(null);
        alert("Payment updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating payment:", error);
        alert("Failed to update payment.");
      });
  };
  const handleAddPayment = (e) => {
    e.preventDefault();

    axiosInstance.post('/payments/', newPayment)
      .then((response) => {
        setPayments((prevPayments) => [...prevPayments, response.data]);
        alert('Payment added successfully!');
        setNewPayment({ reservation: '',customer: '', amount: '', payment_date: '', payment_method: '',payment_status: '' });
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error adding payment:", error);
        alert('Failed to add payment.');
      });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Manage Payments</h1>
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
        <a href="/manage-customers">Manage Customers</a>
        <a href="/manage-payments">Manage Payments</a>
        <a href="/reports">Reports</a>
        <a href="/logout" className="logout-link">Logout</a> */}
      </nav>

      <button
        className="add-button"
        onClick={() => setShowForm(true)}
      >
        Add Payment
      </button>

      {showForm && (
        <div className="payment-form">
          <h2>Add Payment</h2>
          <form onSubmit={handleAddPayment}>
            <label>
              Reservation:
              <input
                type="text"
                value={newPayment.reservation}
                onChange={(e) => setNewPayment({ ...newPayment, reservation: e.target.value })}
                required
              />
            </label>
            <label>
              Customer Name:
              <input
                type="text"
                value={newPayment.customer}
                onChange={(e) => setNewPayment({ ...newPayment, customer: e.target.value })}
                required
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                required
              />
            </label>
            
            <label>
              Payment Method:
              <select
                value={newPayment.payment_method}
                onChange={(e) => setNewPayment({ ...newPayment, payment_method: e.target.value })}
                required
              >
                <option value="">Select</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Mobile Money">Others</option>
              </select>
            </label>
            <label>
              Payment Status:
                <select
                value={newPayment.payment_status}
                onChange={(e) => setNewPayment({ ...newPayment, payment_status: e.target.value })}
                >
                <option value="">Select (Leave blank to use Pending)</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
            </select>
            </label>
            <div className="form-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="payments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Reservation</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.customer}</td>
              <td>{payment.reservation}</td>
              <td>Tsh {payment.amount}/=</td>
              <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
              <td>{payment.payment_method}</td>
              <td>{payment.payment_status}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(payment)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(payment.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editPayment && (
        <div className="edit-form">
          <h2>Edit Payment</h2>
          <form onSubmit={handleSave}>
            <label>
              Customer:
              <input
                type="text"
                value={editPayment.customer}
                onChange={(e) =>
                  setEditPayment({ ...editPayment, customer: e.target.value })
                }
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                value={editPayment.amount}
                onChange={(e) =>
                  setEditPayment({ ...editPayment, amount: e.target.value })
                }
              />
            </label>
            <label>
              Method:
              <input
                type="text"
                value={editPayment.payment_method}
                onChange={(e) =>
                  setEditPayment({ ...editPayment, payment_method: e.target.value })
                }
              />
            </label>
            <label>
              Status:
              <select
                value={editPayment.payment_status || ''}
                onChange={(e) =>
                  setEditPayment({ ...editPayment, payment_status: e.target.value })
                }
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </label>
            <div className="form-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditPayment(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManagePayments;
