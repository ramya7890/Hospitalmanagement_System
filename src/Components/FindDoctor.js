import React, { useState, useEffect } from 'react';
import './FindDoctor.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FindDoctor = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patients, doctors, and appointments from the backend API
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/hospitalManagement/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/hospitalManagement/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/hospitalManagement/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  const handleFindPatient = (patient) => {
    setSelectedPatient(patient);
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

    try {
      const response = await axios.post('http://localhost:8080/hospitalManagement/appointment', newAppointment);
      setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
      setAppointmentDetails(newAppointment);
      alert(`Appointment booked successfully for ${newAppointment.patientName} with ${newAppointment.doctorName} on ${newAppointment.date} at ${newAppointment.time}`);
      
      // After booking, redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Error booking appointments:', error);
    }

    setSelectedDoctor('');
    setAppointmentDate('');
    setAppointmentTime('');
  };

  return (
    <div className="find-doctor-container">
      <h2>Find a Doctor & Book Appointment</h2>
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
                <th>Existing Illness</th>
                <th>Location</th>
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
                  <td>
                    <button onClick={() => handleFindPatient(patient)}>Find Doctor</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedPatient && (
        <div className="appointment-section">
          <h2>Book Appointment</h2>
          <form onSubmit={handleAppointmentSubmit}>
            <p>Selected Patient: {selectedPatient.firstName}</p>
            <p>Location: {selectedPatient.location}</p>
            <p>Existing Illness: {selectedPatient.existingIllness}</p>

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
                <option value="" disabled>No doctors available in this location</option>
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
    </div>
  );
};

export default FindDoctor;
