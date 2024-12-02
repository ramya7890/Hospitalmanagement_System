import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './PatientLandingScreen.css';
import { useParams } from 'react-router-dom';
 
const PatientLandingScreen = () => {
  const { patientId } = useParams();
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
        const response = await axios.get(`http://localhost:8080/hospitalManagement/reports/${patientId}`);
        console.log(response.data);
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
        const response = await axios.get(`http://localhost:8080/hospitalManagement/appointments/${patientId}`);
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
  }, [patientId]);
 
  return (
    <div className="patient-landing">
      <h1 className="title">Patient Landing Screen</h1>
      <p className="description">Welcome to the patient portal. Here you can manage your health records, schedule appointments, and more.</p>
 
      {/* Reports Section */}
      <section className="reports-section">
        <h2>Reports</h2>
        {loadingReports ? (
          <p>Loading reports...</p>
        ) : errorReports ? (
          <p>{errorReports}</p>
        ) : reports.length === 0 ? (
          <p>No reports available.</p>
        ) : (
          <table className="report-table">
            <thead>
              <tr>
                <th>Uploaded Date</th>
                <th>Description</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report.reportId}>
                  <td>{report.uploadDate}</td>
                  <td>{report.fileName}</td>
                  <td>
                    <a href={`http://localhost:8080/hospitalManagement/reports/download/${report.reportId}`} download>
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
 
      {/* Appointments Section */}
      <section className="appointments-section">
        <h2>Upcoming Appointments</h2>
        {loadingAppointments ? (
          <p>Loading appointments...</p>
        ) : errorAppointments ? (
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
                <tr key={appointment.appointmentId}>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.existingIllness}</td>
                  <td>{appointment.location}</td>
                  <td>Booked</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};
 
export default PatientLandingScreen;
 
 