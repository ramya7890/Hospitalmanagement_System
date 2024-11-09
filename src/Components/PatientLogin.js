// PatientLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientLogin.css';
import axios from 'axios'
function PatientLogin() {
  const [credentials, setCredentials] = useState({ uniqueId: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/hospitalManagement/patient/login', {
          patientID: parseInt(credentials.uniqueId),
          password: credentials.password,
      });

      // Handle successful login
      alert(response.data); // Display success message
      console.log('Login successful:', response.data);
      navigate('/Pages/Patientlandingscreen');
  } catch (error) {
      // Handle error response
      if (error.response) {
          alert(error.response.data); // Display error message
          console.error('Login failed:', error.response.data);
      } else {
          alert('An unexpected error occurred');
          console.error('Error:', error);
      }
    }
  };

  return (
    <div className="patient-login-container">
      <h2 className="patient-login-title">Patient Login</h2>
      <form className="patient-login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="uniqueId"
          placeholder="Unique ID"
          className="patient-login-input"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="patient-login-input"
          onChange={handleChange}
        />
        <button type="submit" className="patient-login-button">Login</button>
        <div className="patient-login-new-user">
          <p>Not a member?</p>
          <a href="/register" className="patient-login-register-link">Register</a>
        </div>
      </form>
    </div>
  );
}

export default PatientLogin;