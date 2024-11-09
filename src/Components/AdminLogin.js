import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ uniqueId: '' , password: '' });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const defaultId = '123456';
    const defaultPassword = 'Ramya';

    // Check if the credentials match the default or any registered admin
    const isDefaultAdmin = credentials.uniqueId === defaultId && credentials.password === defaultPassword;
    const isRegisteredAdmin = adminList.some((admin) => admin.id === credentials.uniqueId && admin.password === credentials.password
    );

    if (isDefaultAdmin || isRegisteredAdmin) {
      alert("Login successful!");
      navigate("/Pages/AdminLandingScreen");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="uniqueId"
          placeholder="Unique ID"
          value={credentials.uniqueId}
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