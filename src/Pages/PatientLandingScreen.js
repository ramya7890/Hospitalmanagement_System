import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './PatientLandingScreen.css';
 
const PatientLandingScreen = ({ patientId }) => {
  const [reports, setReports] = useState([]); // State for reports
  const [appointments, setAppointments] = useState([]); // State for appointments
  const [loadingReports, setLoadingReports] = useState(true); // Loading state for reports
  const [loadingAppointments, setLoadingAppointments] = useState(true); // Loading state for appointments
  const [errorReports, setErrorReports] = useState(null); // Error state for reports
  const [errorAppointments, setErrorAppointments] = useState(null); // Error state for appointments
 
  useEffect(() => {
    // Fetch reports from API
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:8080/hospitalManagement/reports'); // Replace with your API endpoint
        setReports(response.data);
      } catch (error) {
        setErrorReports('Error fetching reports');
        console.error('Error fetching reports:', error);
      } finally {
        setLoadingReports(false);
      }
    };
 
    // Fetch appointments from API
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hospitalManagement/appointments/1000`); // Use patientId in the URL
        console.log(response.data);
        setAppointments(response.data);
      } catch (error) {
        setErrorAppointments('Error fetching appointments');
        console.error('Error fetching appointments:', error);
      } finally {
        setLoadingAppointments(false);
      }
    };
    fetchReports();
    fetchAppointments();
  }, [patientId]); // Add patientId as a dependency
 
 
  return (
    <div className="patient-landing">
      <h1 className="title">Patient Landing Screen</h1>
      <p className="description">Welcome to the patient portal. Here you can manage your health records,
         schedule appointments, and more.</p>
       
      {/* Reports Section */}
      <section className="reports-section">
        <h2>Reports</h2>
        {loadingReports ? ( // Show loading state
          <p>Loading reports...</p>
        ) : errorReports ? ( // Show error if any
          <p>{errorReports}</p>
        ) : reports.length === 0 ? ( // Check if reports are available
          <p>No reports available.</p>
        ) : (
          <ul>
            {reports.map(report => (
              <li key={report.id}>
                <h3>{report.title}</h3>
                <p>Date: {report.date}</p>
                <p>Description: {report.description}</p>
                <a href={report.fileUrl} download>Download</a>
              </li>
            ))}
          </ul>
        )}
      </section>
 
      {/* Appointments Section */}
      <section className="appointments-section">
        <h2>Upcoming Appointments</h2>
        {loadingAppointments ? ( // Show loading state
          <p>Loading appointments...</p>
       
        ) : errorAppointments ? ( // Show error if any
          <p>{errorAppointments}</p>
        ) : appointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Existing Illness</th>
                <th>Location</th>
                <th>Status</th>
         
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.existingIllness}</td>
                  <td>{appointment.location}</td>
                  <td>{appointment.status}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
 
export default PatientLandingScreen;
 