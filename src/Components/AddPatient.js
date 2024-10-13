import React, { useState, useEffect } from 'react';
import './AddPatient.css';

const AddPatient = () => {
  const [patientDetails, setPatientDetails] = useState({
    firstName: '', middleName: '', lastName: '',
    dob: '', address: '', state: '',
    country: '', mobile: '',
    relativeName: '', relativeMobile: '', reports: null,
    illnessDetails: '', password: '', confirmPassword: '',
    uniqueId: ''
  });
  const [patients, setPatients] = useState([]); // List of patients (simulate database)
  const [searchQuery, setSearchQuery] = useState('');
  const [editMode, setEditMode] = useState(false); // Toggle between add/edit mode

  useEffect(() => {
    // Load existing patients from local storage or database on component mount
    const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(savedPatients);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'reports') {
      setPatientDetails((prevDetails) => ({
        ...prevDetails,
        [name]: files, // Handle file upload
      }));
    } else {
      setPatientDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const generateUniqueId = () => {
    // Generate a unique ID using the current timestamp and a random number
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000); // Random number between 0 and 999
    return `${timestamp}-${randomNumber}`; // Combine both to create a unique ID
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (patientDetails.password !== patientDetails.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!editMode) {
      // New patient - generate unique ID and save details
      const uniqueId = generateUniqueId();
      const newPatient = { ...patientDetails, uniqueId };
      const updatedPatients = [...patients, newPatient];
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients)); // Save to localStorage
      alert(`Successfully registered! Your ID is ${uniqueId}`);
    } else {
      // Editing existing patient
      const updatedPatients = patients.map((patient) =>
        patient.uniqueId === patientDetails.uniqueId ? patientDetails : patient
      );
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients)); // Save to localStorage
      alert('Patient details updated successfully');
    }
    setPatientDetails({
      firstName: '', middleName: '', lastName: '',
      dob: '', address: '', state: '',
      country: '', mobile: '',
      relativeName: '', relativeMobile: '', reports: null,
      illnessDetails: '', password: '', confirmPassword: '',
      uniqueId: ''
    });
    setEditMode(false);
  };

  const handleSearch = () => {
    const result = patients.find(
      (patient) =>
        patient.uniqueId === searchQuery ||
        (patient.firstName === searchQuery && patient.lastName === searchQuery)
    );
    if (result) {
      setPatientDetails(result);
      setEditMode(true); // Switch to edit mode if a patient is found
    } else {
      alert('Patient not found');
    }
  };

  return (
    <div className="add-patient-container">
      <div className='patient-container'>
      <h2>{editMode ? 'Edit' : 'Add'} Patient</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstName'>First Name*</label>
        <input type='text' name='firstName' value={patientDetails.firstName} placeholder="Enter First Name"
          onChange={handleChange} required />
        <label htmlFor='middleName'>Middle Name</label>
        <input type='text' name='middleName' value={patientDetails.middleName} placeholder="Enter Middle Name"
          onChange={handleChange} />
        <label htmlFor='lastName'>Last Name*</label>
        <input type='text' name='lastName' value={patientDetails.lastName} placeholder="Enter Last Name"
          onChange={handleChange} required />
        <label htmlFor='dob'>Date Of Birth*</label>
        <input type="date" name="dob" value={patientDetails.dob} placeholder="Date of Birth"
          onChange={handleChange} required />
        <label htmlFor='address'>Address*</label>
        <input type='text' name="address" value={patientDetails.address} placeholder="Address"
          onChange={handleChange} required />
        <label htmlFor='state'>State*</label>
        <input type='text' name="state" value={patientDetails.state} placeholder="State"
          onChange={handleChange} required />
        <label htmlFor='country'>Country*</label>
        <input type='text' name="country" value={patientDetails.country} placeholder="Country"
          onChange={handleChange} required />
        <label htmlFor='mobile'>Mobile*</label>
        <input type='text' name="mobile" value={patientDetails.mobile} placeholder="Mobile"
          onChange={handleChange} required />
        <label htmlFor='relativeName'>Relative Name</label>
        <input type='text' name="relativeName" value={patientDetails.relativeName} placeholder="Relative Name"
          onChange={handleChange} />
        <label htmlFor='relativeMobile'>Relative Mobile</label>
        <input type='text' name="relativeMobile" value={patientDetails.relativeMobile} placeholder="Relative Mobile"
          onChange={handleChange} />
        <label htmlFor='illnessDetails'>Illness Details</label>
        <textarea name="illnessDetails" value={patientDetails.illnessDetails} placeholder="Existing Illness"
          onChange={handleChange}></textarea>
        {editMode && (
          <>
            <label htmlFor='reports'>Upload Reports</label>
            <input type="file" name="reports" multiple onChange={handleChange} />
          </>
        )}
        <label htmlFor='password'>Password*</label>
        <input type="password" name="password" value={patientDetails.password} placeholder="Password"
          onChange={handleChange} required />
        <label htmlFor='confirmPassword'>Confirm Password*</label>
        <input type="password" name="confirmPassword" value={patientDetails.confirmPassword} placeholder="Confirm Password"
          onChange={handleChange} required />
        <button type="submit">{editMode ? 'Update' : 'Register'}</button>
      </form>
      </div>
      <div className="search-section">
        <h2>Search Patient</h2>
        <input type="text" placeholder="Enter Unique ID or Name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="patients-list-container">
        <h2>Patients List</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Address</th>
              <th>State</th>
              <th>Country</th>
              <th>Mobile</th>
              <th>Relative Name</th>
              <th>Relative Mobile</th>
              <th>Illness Details</th>
              <th>Unique ID</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.firstName}</td>
                <td>{patient.middleName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.dob}</td>
                <td>{patient.address}</td>
                <td>{patient.state}</td>
                <td>{patient.country}</td>
                <td>{patient.mobile}</td>
                <td>{patient.relativeName}</td>
                <td>{patient.relativeMobile}</td>
                <td>{patient.illnessDetails}</td>
                <td>{patient.uniqueId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddPatient;
