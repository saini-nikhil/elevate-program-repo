// src/components/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, updateEmployee } from '../actions/employeeActions';
import { useNavigate, useParams } from 'react-router-dom';
import './EmployeeForm.css';

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Get the employee data if editing
  const { employees } = useSelector(state => state.employee);
  const employeeToEdit = id ? employees.find(emp => emp._id === id) : null;

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    contact: '',
    profilePic: null,
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { name, position, contact, profilePic } = formData;

  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        name: employeeToEdit.name,
        position: employeeToEdit.position,
        contact: employeeToEdit.contact,
        profilePic: null, // Don't set the file input value
      });
      // Check for both possible field names (profilePic and profilePicture)
      setPreview(employeeToEdit.profilePicture || employeeToEdit.profilePic || '');
    }
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    data.append('name', name);
    data.append('position', position);
    data.append('contact', contact);
    if (profilePic) data.append('profilePicture', profilePic);

    try {
      if (id) {
        dispatch(updateEmployee(id, data))
          .then(() => {
            setLoading(false);
            navigate('/employees');
          })
          .catch(err => {
            setLoading(false);
            setError('Error updating employee: ' + (err.message || 'Unknown error'));
          });
      } else {
        dispatch(createEmployee(data))
          .then(() => {
            setLoading(false);
            navigate('/employees');
          })
          .catch(err => {
            setLoading(false);
            setError('Error creating employee: ' + (err.message || 'Unknown error'));
          });
      }
    } catch (err) {
      setLoading(false);
      setError('Error: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <div className="employee-form-container">
      <h2>{id ? 'Edit Employee' : 'Add New Employee'}</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="preview-container">
          {preview ? (
            <img src={preview} alt="Profile Preview" className="profile-preview" />
          ) : (
            <div className="profile-placeholder">{name ? name.charAt(0) : '?'}</div>
          )}
        </div>
        
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={position}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={contact}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input
            type="file"
            name="profilePic"
            onChange={handleFileChange}
            className="form-control"
            accept="image/*"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <><i className="fas fa-spinner fa-spin"></i> {id ? 'Updating...' : 'Adding...'}</>
            ) : (
              <><i className="fas fa-save"></i> {id ? 'Update Employee' : 'Add Employee'}</>
            )}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate('/employees')}
            disabled={loading}
          >
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
