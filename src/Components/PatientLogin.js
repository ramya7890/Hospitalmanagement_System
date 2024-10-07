import React , { useState} from 'react';

import './PatientLogin.css'
function PatientLogin() {
   const [userType, setUserType] = useState('patient');

  return (
    <div className="login-container">
      
    <h2>Patient</h2>
    <form>
        <input type="text"
        name="uniqueId" placeholder="UniqueID"/>
         <input type="password"
        name="password" placeholder="Password"/>
    {/* <div className="radio-group">
       <input type="radio" name="userType" value="patient" checked={userType==='patient'} onChange={() =>
        setUserType('patient')} /> Patient 
        <input type="radio" name="userType" value="admin" checked={userType==='admin'} onChange={() =>
        setUserType('admin')} /> Admin 
    </div>  */}
    <button type="submit">Login</button> 
    <div className="new-user">
      <p>Not a member?</p><p><a href="/register">Register</a></p>
    </div> 
    </form>
    </div>
  )
}
export default PatientLogin;

