import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';


function AdminDashboard() {
  return (
    <div className="admin-dashboard">
       <h2>AdminDashboard</h2> 
       <ul>
        <li><Link to="/add-patient">Add Patient</Link></li>
        <li><Link to="/edit-patient">Edit Patient</Link></li>
        <li><Link to="/search-patient">Search Patient</Link></li>
        <li><Link to="/add-doctor">Add Doctor</Link></li>
        <li><Link to="/find-doctor">Find Doctor</Link></li>
       </ul>
        </div>
  );
}
export default AdminDashboard;

