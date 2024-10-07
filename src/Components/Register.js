import React, { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Register.css'

 function Register() {
    const [patientDetails, setPatientDetails] = useState({firstName:'', middleName:'', lastName:'',
        dob: '',address: '', mobile:'',
        relativeName:'', relativeMobile:'',
        illnessDetails:'', password:'', confirmPassword:'',
 });
    const navigate= useNavigate();
    const handleChange = (e) => {
        const {name,value}= e.target;
        setPatientDetails({...patientDetails, [name]: value });
    };
    
    const generateUniqueId = () => {
      // Generate a unique ID using the current timestamp and a random number
      const timestamp = Date.now();
      const randomNumber = Math.floor(Math.random() * 1000); // Random number between 0 and 999
      return `${timestamp}-${randomNumber}`; // Combine both to create a unique ID
  };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (patientDetails.password ===patientDetails.confirmpassword){
        const uniqueId = generateUniqueId(); // Generate a unique ID
        setPatientDetails({ ...patientDetails, uniqueId }); // Update state with the unique ID

        // Here you can save the patient details along with unique ID to your database if needed

        alert('Successfully registered!  Your ID is ' + uniqueId);
        navigate("/PatientLogin");
      } else {
        alert('Password do not match');
      }
    };
  return (
    <div className="register-container">
      <h2>Patient Registration</h2> 
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstname'>First Name*</label>
      <input type='text' name='firstname' placeholder=" Enter First Name" 
      onChange={handleChange}/>
      <label htmlFor='middlename'>Middle Name*</label>
      <input type='text'  name='middlename' placeholder=" Enter Middle Name" 
      onChange={handleChange}/>
      <label htmlFor='lastname'>Last Name*</label>
      <input type='text' name='lastname' placeholder=" Enter Last Name" 
      onChange={handleChange}/>
      <label htmlFor='dob'>Date Of Birth*</label>
      <input  type="date" name ="dob" placeholder="Date of Birth"
      onChange={handleChange}/> 
      <label htmlFor='address'>Address*</label>
      <input type='text' name ="address" placeholder="Address"
      onChange={handleChange}/>
      <label htmlFor='mobile'>Mobile*</label>
       <input type='text' name ="mobile" placeholder="Mobile"
      onChange={handleChange}/>
      <label htmlFor='relativename'>Relative Name*</label>
        <input type='text' name ="relativename" placeholder="Relative Name"
      onChange={handleChange}/>
      <label htmlFor='relativemobile'>Relative Mobile*</label>
        <input type="text"  name ="relativemobile" placeholder="Relative Mobile"
      onChange={handleChange}/>
      <label htmlFor='illnessdetails'>Illness Details*</label>
      <textarea name ="illnessdetails" placeholder="Existing Illness"
      onChange={handleChange}></textarea>
      <label htmlFor='password'>Password*</label>
       <input  type="password" name ="password" placeholder="Password"
      onChange={handleChange}/>
      <label htmlFor='confirmpassword'>Confirm Password*</label>
      <input  type="password" name ="confirmpassword" placeholder="Confirm Password"
      onChange={handleChange}/>
      <button type="submit">Register</button>
      </form>
    </div>
  )
}
export default Register;

