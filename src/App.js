
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import CustomerProtectedRoute from './routes/CustomerProtectedRoute';

import Home from './Pages/Home';
import About from './Pages/About';
import Dashboard from './Pages/Dashboard';
import ManageSlots from './Pages/ManageSlots';
import ManageCustomers from './Pages/ManageCustomers';
import Reports from './Pages/Reports';
import Logout from './Pages/Logout';
import Customer from './Pages/Customer';
import ViewParking from './Pages/ViewParking';
import MyAccount from './Pages/MyAccount';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import SearchParkingLots from './Pages/SearchParkingLots';
import MyBookings from './Pages/MyBookings';
import BookingReservation from './Pages/BookingReservation';
import ManagePayment from './Pages/ManagePayment';
import CustomerHome from './Pages/CustomerHome';
import ManageReservation from './Pages/ManageReservation';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Admin Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/manage-reservations" element={<ProtectedRoute><ManageReservation /></ProtectedRoute>} />
          <Route path="/manage-slots" element={<ProtectedRoute><ManageSlots /></ProtectedRoute>} />
          <Route path="/manage-customers" element={<ProtectedRoute><ManageCustomers /></ProtectedRoute>} />
          <Route path="/manage-payments" element={<ProtectedRoute><ManagePayment /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />

          {/* Protected Customer Routes */}
          <Route path="/customer" element={<CustomerProtectedRoute><Customer /></CustomerProtectedRoute>} />
          <Route path="/customer-home" element={<CustomerProtectedRoute><CustomerHome /></CustomerProtectedRoute>} />
          <Route path="/view-parking" element={<CustomerProtectedRoute><ViewParking /></CustomerProtectedRoute>} />
          <Route path="/my-account" element={<CustomerProtectedRoute><MyAccount /></CustomerProtectedRoute>} />
          <Route path="/profile" element={<CustomerProtectedRoute><Profile /></CustomerProtectedRoute>} />
          <Route path="/search" element={<CustomerProtectedRoute><SearchParkingLots /></CustomerProtectedRoute>} />
          <Route path="/bookings" element={<CustomerProtectedRoute><MyBookings /></CustomerProtectedRoute>} />
          <Route path="/book" element={<CustomerProtectedRoute><BookingReservation /></CustomerProtectedRoute>} />

          {/* Optional Logout route */}
          <Route path="/logout" element={<Logout />} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
