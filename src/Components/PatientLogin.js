// PatientLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientLogin.css';

function PatientLogin() {
  const [credentials, setCredentials] = useState({ uniqueId: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPatients = JSON.parse(localStorage.getItem('patients')) || [];
    const authenticatedPatient = existingPatients.find(
      (patient) => patient.uniqueId === credentials.uniqueId && patient.password === credentials.password
    );

    if (authenticatedPatient) {
      alert('Login successful!');
      navigate('/Pages/PatientLandingScreen'); // Redirects to patient details page
    } else {
      alert('Invalid ID or password.');
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