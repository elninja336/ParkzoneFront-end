import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';  
import './Profile.css';
// import { Link } from 'react-router-dom';
const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    residence: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const customerId = 2; // Use actual customer ID, e.g., from localStorage or auth context

  // Fetch profile data on component mount
  useEffect(() => {
    axiosInstance.get(`customers/${customerId}`)
      .then((response) => {
        setProfile(response.data);  // Set profile data from backend
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching profile data.');
        setLoading(false);
      });
  }, [customerId]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle save and update profile data
  const handleSave = () => {
    setIsEditing(false);
    axiosInstance.put(`customers/${customerId}`, profile)  // Send updated data to backend
      .then((response) => {
        alert('Profile updated successfully!');
        setProfile(response.data);  // Optionally update with the response from backend
      })
      .catch((error) => {
        alert('Error updating profile!');
        console.error(error);
      });
  };

  // Handle cancel and reset values (optional)
  const handleCancel = () => {
    setIsEditing(false);
    // Optionally reset to original values if needed, or refetch data from the backend
    setProfile({
      name: '',
      email: '',
      phone: '',
      residence: '',
    });
  };

  // Show loading spinner or error message if needed
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-details">
        <div className="profile-item">
          <label>Full Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
            />
          ) : (
            <p>{profile.name}</p>
          )}
        </div>
        <div className="profile-item">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
            />
          ) : (
            <p>{profile.email}</p>
          )}
        </div>
        <div className="profile-item">
          <label>Phone:</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
            />
          ) : (
            <p>{profile.phone}</p>
          )}
        </div>
        <div className="profile-item">
          <label>Residence:</label>
          {isEditing ? (
            <textarea
              name="residence"
              value={profile.residence}
              onChange={handleInputChange}
            ></textarea>
          ) : (
            <p>{profile.residence}</p>
          )}
        </div>
      </div>
      <div className="profile-actions">
        {isEditing ? (
          <>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
