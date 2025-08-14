import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Try Customer Login First
      const customerRes = await axiosInstance.post('/customers/login', {
        email,
        password,
      });

      if (customerRes.data && customerRes.data.message === 'Login successful') {
        // Store customer info in localStorage
        localStorage.setItem('customer_id', customerRes.data.customer_id);
        localStorage.setItem('customer_name', customerRes.data.name);
        localStorage.setItem('customer_email', customerRes.data.email);
        localStorage.setItem('customer_phone', customerRes.data.phone);
        localStorage.setItem('customer_residence', customerRes.data.residence);

        // Navigate to Customer Home
        return navigate('/customer');
      }
    } catch (err) {
      // Continue to try user login with /api/token/
    }

    try {
      // 2. Try Django User Login via /api/token/
      const userRes = await axiosInstance.post('/token/', {
        username: email, 
        password: password,
      });

      if (userRes.data.access) {
        // Store JWT tokens
        localStorage.setItem('access_token', userRes.data.access);
        localStorage.setItem('refresh_token', userRes.data.refresh);

        // You can fetch user details if needed, or navigate directly
        return navigate('/dashboard'); // or /dashboard
      }
    } catch (err) {
      console.error('Both login attempts failed:', err);
      setError('Invalid credentials for both customer and user. Please try again.');
    }
  };

 return (
  <div className='login-page-wrapper'>
  <div className="login-container">
    <h1>Login</h1>
    {error && <p className="error-message">{error}</p>}
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="email">Username</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
    <p className="login-link">
      Don't have an account? <a href="/signup">Sign Up</a>
    </p>
  </div>
  </div>
);

};

export default Login;
