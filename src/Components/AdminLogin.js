import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ adminId: '', password: '', });
  const [adminList, setAdminList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    setAdminList(savedAdmins);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to send in the request body
    const loginAdmin = {
      adminID: credentials.adminId,
      password: credentials.password,
    };

    try {
      // Make the POST request to the login API
      const response = await axios.post('http://localhost:8080/hospitalManagement/admin/login', loginAdmin);
      
      // Handle successful login
      alert(response.data); // Show success message from the response
      navigate("/Pages/AdminLandingScreen");
    } catch (error) {
      // Handle error response
      if (error.response && error.response.status === 401) {
        alert("Invalid admin ID or password");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="adminId"
          placeholder="Unique ID"
          value={credentials.adminId}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;