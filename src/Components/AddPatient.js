import React, { useState} from 'react';


 function AddPatient() {
    const [patientDetails, setPatientDetails] = useState({firstName:'', middleName:'', lastName:'',
        dob: '',address: '', mobile:'',
        relativeName:'', relativeMobile:'',
        illnessDetails:'', password:'', confirmPassword:'',

    });
    
    const handleChange = (e) => {
        const {name,value}= e.target;
        setPatientDetails({...patientDetails, [name]: value });
    };
  return (
    <div>
        <h2>Add Patient</h2>
        <form>
        <input name ="middleName" placeholder="Middle Name"
      onChange={handleChange}/>
      <input name ="lastName" placeholder="Last Name"
      onChange={handleChange}/>
      <input  type="date" name ="dob" placeholder="Date of Birth"
      onChange={handleChange}/> 
      <input name ="address" placeholder="Address"
      onChange={handleChange}/>
       <input name ="mobile" placeholder="Mobile"
      onChange={handleChange}/>
        <input name ="relativeName" placeholder="Relative Name"
      onChange={handleChange}/>
        <input name ="relativeMobile" placeholder="Relative Mobile"
      onChange={handleChange}/>
      <textarea name ="illnessDetails" placeholder="Existing Illness"
      onChange={handleChange}></textarea>
       <input  type="password" name ="password" placeholder="Password"
      onChange={handleChange}/>
      <input  type="password" name ="confirmpassword" placeholder=" Confirm Password"
      onChange={handleChange}/>
      <button type="submit">Add Patient</button>
        </form>
        </div>
  );
}
export default AddPatient;
