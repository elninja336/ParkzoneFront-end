import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance'; // Import axios instance
import './SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [residence, setResidence] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await axiosInstance.post('/customers/', {
        name,
        email,
        phone,
        residence,
        password
      });

      alert('Account created successfully!');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.detail || 'Failed to create account.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="residence">Residence:</label>
          <input
            type="text"
            id="residence"
            value={residence}
            onChange={(e) => setResidence(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      <p className="login-link">
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
};

export default SignUp;
