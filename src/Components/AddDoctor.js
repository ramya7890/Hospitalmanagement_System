import React, { useState, useEffect } from 'react';
import './AddDoctor.css';
import axios from 'axios';

const AddDoctor = () => {
    const [doctor, setDoctor] = useState({
        doctorID: '',
        name: '',
        educationalQualification: '',
        yearsOfExperience: '',
        speciality: '',
        location: ''
    });
    const [doctorsList, setDoctorsList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [searchLocation, setSearchLocation] = useState(''); // State for search input
    const [showForm, setShowForm] = useState(false); // State to control the visibility of the form

    // useEffect(() => {
    //     // Load existing doctors from local storage
    //     const savedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    //     setDoctorsList(savedDoctors);
    // }, []);
    // const fetchDoctorsList = async () => {
    //     try {
    //       const response = await axios.get('http://localhost:8080/hospitalManagement/doctors');
    //       console.log(response.data); // Handle your response data here
    //       setDoctorsList(response.data);
    //     } catch (error) {
    //       console.error('There was a problem with the axios operation:', error);
    //     }
    //   };
    //   useEffect(() => {
    //     fetchDoctorsList();
    //   }, []);
    const fetchDoctorsList = async (location = '') => {
        try {
            const response = await axios.get(`http://localhost:8080/hospitalManagement/doctors/search?location=${location}`);
            console.log(response.data); // Handle your response data here
            setDoctorsList(response.data);
        } catch (error) {
            console.error('There was a problem with the axios operation:', error);
        }
    };

    useEffect(() => {
        // Fetch all doctors initially or based on searchLocation
        fetchDoctorsList(searchLocation);
    }, [searchLocation]); // Fetch doctors whenever searchLocation changes


    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor({
            ...doctor, [name]: value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (doctor.name && doctor.educationalQualification && doctor.yearsOfExperience && doctor.speciality && doctor.location) {
        if (editMode) {
            // Update doctor information via API
            try {
                const response = await axios.put(`http://localhost:8080/hospitalManagement/doctor/${doctor.doctorID}`, doctor);
                const updatedDoctor = response.data;

                // Update the local state with the updated doctor
                const updatedDoctorsList = doctorsList.map((doc) =>
                    doc.doctorID === updatedDoctor.doctorID ? updatedDoctor : doc
                );
                setDoctorsList(updatedDoctorsList);
                alert('Doctor updated successfully'); // Optional: Notify user of success
            } catch (error) {
                console.error('Error updating doctor:', error);
                alert('Failed to update doctor. Please try again.');
            }
            setEditMode(false);
            setCurrentIndex(null);
        } else {
            // Add new doctor via API
            try {
                const response = await axios.post('http://localhost:8080/hospitalManagement/doctor', doctor);
                const newDoctor = response.data;

                // Update the local state with the new doctor
                setDoctorsList([...doctorsList, newDoctor]);
                alert('Doctor added successfully'); // Optional: Notify user of success
            } catch (error) {
                console.error('Error adding new doctor:', error);
                alert('Failed to add new doctor. Please try again.');
            }
        }
        
        // Reset the form and hide it after successful submission
        resetForm();
        setShowForm(false);
    } else {
        alert('Please fill in all fields');
    }
};

    const resetForm = () => {
        setDoctor({
            doctorID: '',
            name: '',
            educationalQualification: '',
            yearsOfExperience: '',
            speciality: '',
            location: ''
        });
    };

    const handleEdit = (doctorID) => {
        const doctorToEdit = doctorsList.find(doc => doc.doctorID === doctorID);
        setDoctor(doctorToEdit);
        setEditMode(true);
        setCurrentIndex(doctorsList.indexOf(doctorToEdit));
        setShowForm(true); // Show the form when editing
    };

    /*const handleDelete = (doctorID) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this doctor?');
        if (confirmDelete) {
            const updatedDoctors = doctorsList.filter(doc => doc.doctorID !== doctorID);
            setDoctorsList(updatedDoctors);
            localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
        }
    };*/
    const handleDelete = async (doctorID) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this doctor?');
        if (confirmDelete) {
            try {
                // Call the delete API
                await axios.delete(`http://localhost:8080/hospitalManagement/doctor/${doctorID}`);
                
                // Update the local state to remove the deleted doctor
                const updatedDoctors = doctorsList.filter(doc => doc.doctorID !== doctorID);
                setDoctorsList(updatedDoctors);
                alert('Doctor deleted successfully'); // Optional: Notify user of success
            } catch (error) {
                console.error('Error deleting doctor:', error);
                alert('Failed to delete doctor. Please try again.');
            }
        }
    };

    const filteredDoctors = doctorsList.filter(doc => 
        doc.location.toLowerCase().includes(searchLocation.toLowerCase())
    ); // Filter logic based on search input

    return (
        <div className='add-doctor-container'>
            <div className='doctors-list-container'>
                <h2>Doctors List</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Search by location"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Doctor Name</th>
                            <th>educationalQualification</th>
                            <th>Years Of Experience</th>
                            <th>speciality</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.length === 0 ? (
                            <tr>
                                <td colSpan="6">No doctors found.</td>
                            </tr>
                        ) : (
                            filteredDoctors.map((doc) => (
                                <tr key={doc.doctorID}>
                                    <td>{doc.name}</td>
                                    <td>{doc.educationalQualification}</td>
                                    <td>{doc.yearsOfExperience}</td>
                                    <td>{doc.speciality}</td>
                                    <td>{doc.location}</td>
                                    <td>
                                        <button onClick={() => handleEdit(doc.doctorID)}>Edit</button>
                                        <button onClick={() => handleDelete(doc.doctorID)}>Delete</button>
                                        
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add Doctor'}
                </button>
            </div>
            {showForm && ( // Render the form only if showForm is true
                <div className='doctor-container'>
                    <h2>{editMode ? 'Edit Doctor Information' : 'Add Doctor Information'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Doctor Name:</label>
                            <input type="text" name='name' value={doctor.name} onChange={handleChange} placeholder='Enter Doctor name' />
                        </div>
                        <div>
                            <label>Qualification:</label>
                            <input type="text" name='educationalQualification' value={doctor.educationalQualification} onChange={handleChange} placeholder='Enter qualification' />
                        </div>
                        <div>
                            <label>Years Of Experience:</label>
                            <input type="text" name='yearsOfExperience' value={doctor.yearsOfExperience} onChange={handleChange} placeholder='Enter years of experience' />
                        </div>
                        <div>
                            <label>Speciality:</label>
                            <input type="text" name='speciality' value={doctor.speciality} onChange={handleChange} placeholder='Enter specialty' />
                        </div>
                        <div>
                            <label>Location:</label>
                            <input type="text" name='location' value={doctor.location} onChange={handleChange} placeholder='Enter location' />
                        </div>
                        <button type='submit'>{editMode ? 'Update Doctor' : 'Add Doctor'}</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddDoctor;