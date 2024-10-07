import React, { useState } from 'react';

function FindDoctor() {
    const [location, setLocation] = useState('');
    const [specialty, setSpecialty] = useState('');
    const doctors = [
        { name: 'Dr.Tina', location:'Chennai', specialty:'Cardiology'},
        { name: 'Dr.Jaansi', location:'Vellore', specialty:'Neurology'},
        { name: 'Dr.Jan', location:'Coimbatore', specialty:'Dermatology'},
        { name: 'Dr.Prashanth', location:'Chennai', specialty:'Psychiatrist'},
        { name: 'Dr.Santhosh', location:'Chennai', specialty:'ENT'},
        { name: 'Dr.Charu', location:'Nungambakkam', specialty:'Pediatrician'},
        { name: 'Dr.Gokul', location:'Salem', specialty:'Ophthalmologist'},
    ];
    const filteredDoctors = doctors.filter( 
        (doctor)=> doctor.location === location && doctor.specialty === specialty
    );
    /*const filteredDoctors = doctors.filter( 
        (doctor)=> doctor.location.toLowerCase().includes(location.toLowerCase()) && doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
    );*/
  return (
    <div>
        <h2>FindDoctor</h2>
        <label>
            Location:
        <input type="text"
        placeholder="Location"
        value={location} onChange={(e) => setLocation(e.target.value)}/>
        </label>
       <label>
           Specialty:
       <input type="text"
        placeholder="Specialty"
        value={specialty} onChange={(e) => setSpecialty(e.target.value)}/>
       </label>
         <button>Find Doctor</button>
        <ul>
            {filteredDoctors.map((doctor) => (
             <li key={doctor.name}>{doctor.name} - {doctor.specialty} ({doctor.location})</li>
            )
            )}
        </ul>
    </div>
  );
}
export default  FindDoctor;

