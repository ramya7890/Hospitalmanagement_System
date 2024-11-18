
import React, { useState, useEffect } from 'react';
import './FindDoctor.css';
import axios from 'axios';
 
const FindDoctor = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctorList, setDoctorList] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [appointments, setAppointments] = useState([]); // State to hold all appointments
 
  useEffect(() => {
    // const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    // setPatients(savedPatients);
    // Fetch patients from backend API
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hospitalManagement/patients`);
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hospitalManagement/doctors`);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hospitalManagement/appointments`); // Replace with your API endpoint
        console.log(response.data);
        setAppointments(response.data); // Update state with the fetched appointments
      } catch (error) {
        console.error('Error fetching appointments:', error); // Set error message if fetching fails
      }
    };
 
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
 
 
    // const savedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    // setDoctorList(savedDoctors);
    //  const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    //   setAppointments(savedAppointments); // Load all appointments from local storage
 
  }, []);
 
  const handleFindPatient = (patient) => {
    setSelectedPatient(patient);
    console.log(patient);
 
    const doctorsInSameLocation = doctors.filter(
      (doctor) => doctor.location.toLowerCase() === patient.location.toLowerCase()
    );
    setFilteredDoctors(doctorsInSameLocation);
  };
 
  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };
 
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !selectedDoctor || !appointmentDate || !appointmentTime) {
      alert('Please fill in all fields: patient, doctor, appointment date, and time.');
      return;
    }
 
    const newAppointment = {
      patientName: selectedPatient.firstName,
      existingIllness: selectedPatient.existingIllness,
      doctorName: selectedDoctor,
      date: appointmentDate,
      time: appointmentTime,
      location: selectedPatient.location,
    };
 
    // Store the appointment details in local storage
    // const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    // existingAppointments.push(newAppointment);
    // localStorage.setItem('appointments', JSON.stringify(existingAppointments));
    // setAppointments(existingAppointments); // Update appointments state
    // setAppointmentDetails(newAppointment);
    console.log(newAppointment);
    try {
      const response = await axios.post(`http://localhost:8080/hospitalManagement/appointment`, newAppointment);
      setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
      // Set appointment details after successful booking
      setAppointmentDetails(newAppointment);
      alert(`Appointment booked successfully for ${newAppointment.patientName} with ${newAppointment.doctorName} on ${newAppointment.date} at ${newAppointment.time}`);
     
    } catch (error) {
      console.error('Error booking appointments:', error); // Set error message if fetching fails
    }
 
    // const appointmentSection = document.getElementById('appointment-details');
    // if (appointmentSection) {
    //   appointmentSection.scrollIntoView({ behavior: 'smooth' });
    // }
 
    // // Remove the booked patient from the list
    // const updatedPatients = patients.filter(p => p.patientID !== selectedPatient.patientID);
    // setPatients(updatedPatients);
    // localStorage.setItem('patients', JSON.stringify(updatedPatients));
 
    // Clear form fields
    // setSelectedPatient('');
    setSelectedDoctor('');
    setAppointmentDate('');
    setAppointmentTime('');
  };
 
  // const handleDeletePatient = (patientID) => {
  //   const confirmDelete = window.confirm('Are you sure you want to delete this patient?');
  //   if (confirmDelete) {
  //     const updatedPatients = patients.filter((patient) => patient.patientID !== patientID);
  //     setPatients(updatedPatients);
  //     localStorage.setItem('patients', JSON.stringify(updatedPatients));
  //     alert('Patient deleted successfully');
  //   }
  // };
  const handleDeletePatient = async (patientID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this patient?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/hospitalManagement/patient/${patientID}`); // Call the DELETE API
        console.log(response.data); // Log the response message
        const updatedPatients = patients.filter((patient) => patient.patientID !== patientID);
        setPatients(updatedPatients);
        alert('Patient deleted successfully');
      } catch (error) {
        console.error('Error deleting patient:', error);
        alert('Failed to delete patient. Please try again later.');
      }
    }
  };
 
  return (
    <div className="find-doctor-container">
      <h2>Find a Doctor & Book Appointment</h2>
 
      {/* Patient List Section (Hidden after booking) */}
 
        <div className="patient-list-section">
          <h2>Select a Patient</h2>
          {patients.length === 0 ? (
            <p>No patients available. Please add a patient first.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>patient ID</th>
                  <th>First Name</th>
                  <th>Existing Illness </th>
                  <th>Location</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>mobileNumber</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.patientID}>
                    <td>{patient.patientID}</td>
                    <td>{patient.firstName}</td>
                    <td>{patient.existingIllness}</td>
                    <td>{patient.location}</td>
                    <td>{patient.state}</td>
                    <td>{patient.country}</td>
                    <td>{patient.mobileNumber}</td>
                    <td>
                     
                        <button onClick={() => handleFindPatient(patient)}>
                          Find Doctor
                        </button>
                     
                      <button onClick={() => handleDeletePatient(patient.patientID)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
     
 
      {/* Book Appointment Section */}
      {selectedPatient && (
        <div className="appointment-section">
          <h2>Book Appointment</h2>
          <form onSubmit={handleAppointmentSubmit}>
            <p>Selected Patient: {`${selectedPatient.firstName}`}</p>
            <p>Location: {`${selectedPatient.location}`}</p>
            <p>Existing Illness: {`${selectedPatient.existingIllness}`}</p>
 
            <label htmlFor="doctor">Select Doctor*</label>
            <select value={selectedDoctor} onChange={handleDoctorChange} required>
              <option value="">--Select Doctor--</option>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No doctors available in this location
                </option>
              )}
            </select>
 
            <label htmlFor="appointmentDate">Appointment Date*</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
 
            <label htmlFor="appointmentTime">Appointment Time*</label>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
 
            <button type="submit">Book Appointment</button>
 
          </form>
        </div>
      )}
 
      {/* Appointment Confirmation Section */}
      {appointmentDetails && (
        <div id="appointment-details" className="appointment-details-section">
          <h2>Appointment Booked Details</h2>
          <p><strong>Patient Name:</strong> {appointmentDetails.patientName}</p>
          <p><strong>Existing Illness:</strong> {appointmentDetails.existingIllness}</p>
          <p><strong>Doctor:</strong> {appointmentDetails.doctorName}</p>
          <p><strong>Date:</strong> {appointmentDetails.date}</p>
          <p><strong>Time:</strong> {appointmentDetails.time}</p>
          <p><strong>Location:</strong> {appointmentDetails.location}</p>
        </div>
      )}
 
      {/* Display All Appointments (Optional Section) */}
      {appointments.length > 0 && (
        <div className="all-appointments-section">
          <h2>All Booked Appointments</h2>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Existing Illness</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.location}</td>
                  <td>{appointment.existingIllness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
 
export default FindDoctor;
 
