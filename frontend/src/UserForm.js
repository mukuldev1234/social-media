// src/components/UserForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './Userform.css';


const UserForm = () => {
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialHandle', socialHandle);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('User submitted successfully!');
      console.log(res.data);
    } catch (error) {
      console.error('Error submitting user:', error);
      alert('Failed to submit user');
    }
  };


  function myFunction() {
    window.location.href ="./AdminDashboard";
  }
 

  return (
    <form onSubmit={handleSubmit}>

      <div className='user-form'>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Social Media Handle"
        value={socialHandle}
        onChange={(e) => setSocialHandle(e.target.value)}
        required
      />
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Submit</button>
      <button onClick={myFunction}>Admin Dashboard</button>
      </div>
    </form>
  );
};

export default UserForm;
