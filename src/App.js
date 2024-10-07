import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './App.css';


function App() {
  return (
    
      <div className="hospital-management">
        <Header />
        
       
        {/* <AchievementsSection /> */}
        {/* <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
           <Route path="/find-doctor" element={<FindDoctor />} /> 
        </Routes> */}
        <Footer />
      </div>
  );
}

export default App;
