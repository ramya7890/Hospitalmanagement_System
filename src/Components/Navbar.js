// Nav.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: If you have styles for Nav

const Nav = () => {
  return (
    <nav className='nav-container'>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/patientlogin">Patient Login</Link></li>
        <li><Link to="/adminlogin">Admin Login</Link></li>
        {/* <li><Link to="/register">Register</Link></li>
        <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
        <li><Link to="/add-patient">Add Patient</Link></li>
        <li><Link to="/patient-dashboard">Patient Dashboard</Link></li>
        <li><Link to="/find-doctor">Find Doctor</Link></li> */}
      </ul>
    </nav>
  );
}

export default Nav;
