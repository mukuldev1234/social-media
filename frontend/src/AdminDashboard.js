// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Optional: CSS file for styling

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users on component load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <h2>{user.name}</h2>
              <p>Social Handle: {user.socialHandle}</p>
              <div className="images">
                {user.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${image}`}
                    alt={`Upload ${index + 1}`}
                    className="user-image"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
