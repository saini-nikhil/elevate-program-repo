// frontend/components/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [contact, setContact] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('position', position);
        formData.append('contact', contact);
        formData.append('profilePicture', profilePicture);

        try {
            const { data } = await axios.post('http://localhost:3000/createemp', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Employee Created:', data);
        } catch (error) {
            console.error('Error uploading employee:', error);
        }
    };

    return (
        <div>
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Position:</label>
                    <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contact:</label>
                    <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Profile Picture:</label>
                    <input type="file" onChange={handleFileChange} required />
                </div>
                <button type="submit">Create Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
