// Header.js
import React from 'react';
import './Header.css';
import { Routes, Route } from 'react-router-dom';
import PatientLogin from './PatientLogin';
import AdminLogin from './AdminLogin';
import Register from './Register';
import AddDoctor from './AddDoctor';
import EditPatient from './EditPatient';
import BookingAppointment from './BookingAppointment'
import AddAdmin from './AddAdmin';
import FindDoctor from './FindDoctor';
import Navbar from './Navbar'; // Import the Nav component
const  Header = () => {
  return (
    <div className='header-container'>
    
      <Navbar /> 
      <Routes>
        <Route path="/patientlogin" element={<PatientLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/edit-patient" element={<EditPatient />} />
        <Route path="/addadmin" element={<AddAdmin />} />
        <Route path="/bookingAppointment" element={<BookingAppointment />} />
        <Route path="/find-doctor" element={<FindDoctor />} />
      </Routes>
    </div>
  );
}

export default Header;