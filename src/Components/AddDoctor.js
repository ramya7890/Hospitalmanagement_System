// src/AddDoctor.js
import React, { useState } from 'react';
import './DoctorCard.css';

const DoctorCard= () => {
    const [doctor, setDoctor] = useState({
        name: '',
        specialization: '',
        experience: '',
        contact: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor({ ...doctor, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the form submission, e.g., sending data to an API
        console.log(doctor);
        // Clear form
        setDoctor({
            name: '',
            specialization: '',
            experience: '',
            contact: ''
        });
    };

    return (
        <div className="doctor-card">
            <h2>Add Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={doctor.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Specialization:</label>
                    <input type="text" name="specialization" value={doctor.specialization} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Experience (years):</label>
                    <input type="number" name="experience" value={doctor.experience} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Contact:</label>
                    <input type="text" name="contact" value={doctor.contact} onChange={handleChange} required />
                </div>
                <button type="submit">Add Doctor</button>
            </form>
        </div>
    );
};

export default DoctorCard;
