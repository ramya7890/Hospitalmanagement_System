import React, { useState } from 'react';
import './AdminLandingScreen.css';
import { useNavigate } from 'react-router-dom';

const AdminLandingScreen = () => {
  const navigate = useNavigate();
  // const [patients, setPatients] = useState([]);
  // const [doctors, setDoctors] = useState([]);
  // const [admins, setAdmins] = useState([]);
  
  // const [newPatient, setNewPatient] = useState('');
  // const [newDoctor, setNewDoctor] = useState(''); 
  // const [newAdmin, setNewAdmin] = useState('');
  // const [appointmentDetails, setAppointmentDetails] = useState('');

  const handleEditPatient = () => {
    navigate("/Components/EditPatient")
  };

  const handleAddDoctor = () => {
    navigate("/Components/AddDoctor")
  };

  const handleAddAdmin = () => {
    navigate("/Components/AddAdmin")
  };

  const handleBookAppointment = () => {
    navigate ("/components/FindDoctor")

  };

  return (
    <div className="admin-landing">
      <header className="admin-header">Admin Dashboard</header>
      <main className="admin-content">
        <h1>Welcome to the Admin Panel</h1>
        <p>Here you can manage Patient details, Add doctor details, View reports, Add admin details and Book appointments.</p>
      </main>
      
      <nav className="admin-nav">
        <ul>
          <li>
            
            <button onClick={handleEditPatient}>Edit Patient</button>
          </li>
          <li>
           
            <button onClick={handleAddDoctor}>Add Doctor</button>
          </li>
          <li>
            
            <button onClick={handleAddAdmin}>Add Admin</button>
          </li>
          <li>
            
            <button onClick={handleBookAppointment}>Book Appointment</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminLandingScreen;
