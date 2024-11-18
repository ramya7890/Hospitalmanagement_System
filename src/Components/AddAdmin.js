import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './AddAdmin.css';

const AddAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState('');
  const [mobileNumber, setmobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  const fetchAdminslist = async () => {
    try {
      const response = await axios.get('http://localhost:8080/hospitalManagement/admins');
      console.log(response.data); // Handle your response data here
      setAdmins(response.data);
    } catch (error) {
      console.error('There was a problem with the axios operation:', error);
    }
  };
  useEffect(() => {
    fetchAdminslist();
  }, []);
  // useEffect(() => {
  //   // Load existing admins from local storage
  //   const savedAdmins = JSON.parse(localStorage.getItem('admins')) || [];
  //   setAdmins(savedAdmins);
  // }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !mobileNumber || !password || password !== confirmPassword) {
      alert('Please fill in all fields correctly. Passwords must match.');
      return;
    }

    const newAdmin = {
      name,
      mobileNumber,
      password, // Be cautious with storing passwords; consider hashing in a real application
    };

    try {
      // Send a POST request to create a new admin
      const response = await axios.post('http://localhost:8080/hospitalManagement/admin', newAdmin);
      console.log(response.data); // Log the created admin data

      // If the API returns the created admin, add it to local storage and state
      const createdAdmin = response.data; // Assuming your API returns the created admin object
      const updatedAdmins = [...admins, createdAdmin];
      setAdmins(updatedAdmins);
      localStorage.setItem('admins', JSON.stringify(updatedAdmins));

      // Clear form fields
      setName('');
      setmobileNumber('');
      setPassword('');
      setConfirmPassword('');
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("There was an error creating the admin!", error);
      alert("Error creating admin. Please try again.");
    }
  };

  return (
    <div className="admin-register-container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="mobileNumber">Mobile Number*</label>
        <input
          type="tel"
          id="mobileNumber"
          value={mobileNumber}
          onChange={(e) => setmobileNumber(e.target.value)}
          required
        />

        <label htmlFor="password">Password*</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password*</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>

      {registrationSuccess && <p>Registration successful! Admin ID generated.</p>}

      {/* Admin History Section */}
      <h3>Registered Admins</h3>
      {admins.length === 0 ? (
        <p>No admins registered yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Admin ID</th>
              <th>Name</th>
              <th>Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.adminID}>
                <td>{admin.adminID}</td>
                <td>{admin.name}</td>
                <td>{admin.mobileNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddAdmin;