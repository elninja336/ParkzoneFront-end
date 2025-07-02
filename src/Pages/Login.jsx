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
      const response = await axiosInstance.post('/customers/login', {
        email,
        password,
      });

      if (response.data && response.data.message === 'Login successful') {
        // Store customer info in localStorage
        localStorage.setItem('customer_id', response.data.customer_id);
        localStorage.setItem('customer_name', response.data.name);
        localStorage.setItem('customer_email', response.data.email);
        localStorage.setItem('customer_phone', response.data.phone);
        localStorage.setItem('customer_residence', response.data.residence);

        // Navigate to Customer Home
        navigate('/customer');
      } else {
        setError('Invalid login. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">Customer Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
