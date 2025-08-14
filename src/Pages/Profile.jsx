import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    residence: '',
  });

  const [customerId, setCustomerId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const email = localStorage.getItem('customer_email');
        if (!email) {
          setError('Customer not logged in.');
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get('/customers/');
        const customer = response.data.find((c) => c.email === email);

        if (!customer) {
          setError('Customer not found.');
          setLoading(false);
          return;
        }

        setCustomerId(customer.id);
        setProfile({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          residence: customer.residence,
        });

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile data.');
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!customerId) return;

    try {
      const response = await axiosInstance.put(`/customers/${customerId}`, profile);
      alert('Profile updated successfully!');
      setProfile(response.data);
      setIsEditing(false);

      // Optionally update localStorage
      localStorage.setItem('customer_name', response.data.name);
      localStorage.setItem('customer_email', response.data.email);
      localStorage.setItem('customer_phone', response.data.phone);
      localStorage.setItem('customer_residence', response.data.residence);
    } catch (error) {
      alert('Failed to update profile.');
      console.error(error);
    }
  };

  const handleCancel = () => {
    window.location.reload(); // simple reset
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-details">
        <div className="profile-item">
          <label>Full Name:</label>
          {isEditing ? (
            <input name="name" value={profile.name} onChange={handleInputChange} />
          ) : (
            <p>{profile.name}</p>
          )}
        </div>
        <div className="profile-item">
          <label>Email:</label>
          {isEditing ? (
            <input name="email" value={profile.email} onChange={handleInputChange} />
          ) : (
            <p>{profile.email}</p>
          )}
        </div>
        <div className="profile-item">
          <label>Phone:</label>
          {isEditing ? (
            <input name="phone" value={profile.phone} onChange={handleInputChange} />
          ) : (
            <p>{profile.phone}</p>
          )}
        </div>
        <div className="profile-item">
          <label>Residence:</label>
          {isEditing ? (
            <textarea name="residence" value={profile.residence} onChange={handleInputChange} />
          ) : (
            <p>{profile.residence}</p>
          )}
        </div>
      </div>

      <div className="profile-actions">
        {isEditing ? (
          <>
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
