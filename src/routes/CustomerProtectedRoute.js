// src/routes/CustomerProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const CustomerProtectedRoute = ({ children }) => {
  const customerId = localStorage.getItem('customer_id');
  if (!customerId) {
    return <Navigate to="/" replace />; 
  }
  return children;
};

export default CustomerProtectedRoute;
