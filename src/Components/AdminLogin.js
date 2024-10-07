import React ,{useState} from 'react';
import './AdminLogin.css'

export const AdminLogin = () => {
  const [userType, setUserType] = useState('admin');
  return (
    <div className="login-container">
      
    <h2>Admin</h2>
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
    
    </form>
    </div>
  )
}
