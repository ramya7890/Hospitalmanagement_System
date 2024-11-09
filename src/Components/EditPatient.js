import React, { useState, useEffect } from 'react';
import './EditPatient.css';
import axios from 'axios';

const EditPatient = () => {
  const [patientDetails, setPatientDetails] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    location: '',
    state: '',
    country: '',
    mobileNumber: '',
    reports: null,
    existingIllness: '',
    patientID: '',
  });

  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  // useEffect(() => {
  //   // Load existing patients from local storage 
  //   const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
  //   setPatients(savedPatients);
  // }, []);
  const fetchPatientslist = async () => {
    try {
      const response = await axios.get('http://localhost:8080/hospitalManagement/patients');
      console.log(response.data); // Handle your response data here
      setPatients(response.data);
    } catch (error) {
      console.error('There was a problem with the axios operation:', error);
    }
  };
  useEffect(() => {
    fetchPatientslist();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'reports') {
      setPatientDetails((prevDetails) => ({
        ...prevDetails, //spread operator(concordination)
        [name]: files,
      }));

    } else {
      setPatientDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };


  // const generateUniqueId = () => {
  //   const timestamp = Date.now();
  //   const randomNumber = Math.floor(Math.random() * 1000);
  //   return `${timestamp}-${randomNumber}`;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const patientData = { ...patientDetails };
      delete patientData.patientID;
      const response = await axios.put(`http://localhost:8080/hospitalManagement/patient/${patientDetails.patientID}`, patientData);
      console.log('Patient updated successfully:', response.data);
      alert('Patient updated successfully');
      fetchPatientslist();
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('Failed to update patient');
    }
    resetForm();
  };

  // console.log(patientDetails)

  const handleSearch = async () => {

    // const result = await axios.get(`http://localhost:8080/hospitalManagement/patient/${searchQuery}`)
    //  console.log(result.data) 
    try {
      const response = await axios.get(`http://localhost:8080/hospitalManagement/patient/${searchQuery}`);
      setPatientDetails(response.data); // Set the fetched patient data
      setEditMode(true); // Set to edit mode since we found the patient
      setFormVisible(true)
    } catch (err) {
      if (err.response) {
        // If the patient is not found, set an error message
        if (err.response.status === 404) {
          alert('Patient not found');
          setFormVisible(false);
        } else {
          alert('An error occurred while fetching patient data');
        }
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  const resetForm = () => {
    setPatientDetails({
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      location: '',  // Reset location field
      state: '',
      country: '',
      mobileNumber: '',
      reports: null,
      existingIllness: '',
      patientID: '',
    });
    setEditMode(false);
    setFormVisible(false); // Reset form visibility
  };

  const handleEdit = (patientID) => {
    const patientToEdit = patients.find(patient => patient.patientID === patientID);
    setPatientDetails(patientToEdit);
    setEditMode(true);
    setFormVisible(true);
  };

  const handleDelete = async (patientID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this patient?');//window-alert
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/hospitalManagement/patient/${patientID}`);
        alert(response.data); // Set success message
        fetchPatientslist();
      } catch (err) {
        if (err.response) {
          // Handle error responses from the server
          alert(err.response.data || 'An error occurred while deleting the patient.');
        } else {
          alert('An unexpected error occurred');
        }
      }
    }
  };

  return (
    <div className="edit-patient-container">
      <div className='patient-container'>
        <h2>Patients List</h2>
        {patients.length === 0 ? (
          <p>No patients found.</p> // Message when no patients are found
        ) : (
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>mobileNumber</th>
                <th>Location</th>
                <th>ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.patientID}>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.dateOfBirth}</td>
                  <td>{patient.mobileNumber}</td>
                  <td>{patient.location}</td>
                  <td>{patient.patientID}</td>
                  <td>
                    <button onClick={() => handleEdit(patient.patientID)}>Edit</button>
                    <button onClick={() => handleDelete(patient.patientID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {formVisible && (
          <form onSubmit={handleSubmit} className="patient-form">
            <div className="form-left">
              <label htmlFor='firstName'>First Name*</label>
              <input type='text' name='firstName' value={patientDetails.firstName} placeholder="Enter First Name"
                onChange={handleChange} required />
              <label htmlFor='middleName'>Middle Name</label>
              <input type='text' name='middleName' value={patientDetails.middleName} placeholder="Enter Middle Name"
                onChange={handleChange} />
              <label htmlFor='lastName'>Last Name*</label>
              <input type='text' name='lastName' value={patientDetails.lastName} placeholder="Enter Last Name"
                onChange={handleChange} required />
              <label htmlFor='dateOfBirth'>Date Of Birth*</label>
              <input type='date' name='dateOfBirth' value={patientDetails.dateOfBirth} onChange={handleChange} required />

              <label htmlFor='location'>Location*</label>  {/* Added Location field */}
              <input type='text' name='location' value={patientDetails.location} placeholder="Enter Location"
                onChange={handleChange} required />
              <label htmlFor='state'>State*</label>
              <input type='text' name='state' value={patientDetails.state} placeholder="Enter State"
                onChange={handleChange} required />
              <label htmlFor='country'>Country*</label>
              <input type='text' name='country' value={patientDetails.country} placeholder="Enter Country"
                onChange={handleChange} required />
            </div>
            <div className="form-right">
              <label htmlFor='mobileNumber'>mobileNumber*</label>
              <input type='text' name='mobileNumber' value={patientDetails.mobileNumber} placeholder="Enter mobileNumber"
                onChange={handleChange} required />
              <label htmlFor='existingIllness'>Illness Details*</label>
              <textarea name='existingIllness' value={patientDetails.existingIllness} placeholder="Existing Illness"
                onChange={handleChange} required />
              <label htmlFor='reports'>Reports*</label>
              <input type='file' name='reports' onChange={handleChange} multiple />
              {!editMode && (
                <>
                  <label htmlFor='password'>Password*</label>
                  <input type='password' name='password' value={patientDetails.password} placeholder="Password"
                    onChange={handleChange} required />
                  <label htmlFor='confirmPassword'>Confirm Password*</label>
                  <input type='password' name='confirmPassword' value={patientDetails.confirmPassword} placeholder="Confirm Password"
                    onChange={handleChange} required />
                </>
              )}
              <button type='submit'>{editMode ? 'Update Patient' : 'Add Patient'}</button>
            </div>
          </form>
        )}
      </div>

      {/* Search Section Below the Form */}
      <div className="search-container">
        <h2>Search Patient by ID</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter Patient ID"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default EditPatient;