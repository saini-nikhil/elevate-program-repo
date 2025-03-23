// src/components/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEmployees } from '../contexts/EmployeeContext';
import '../styles/EmployeeForm.css';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading: authLoading, isAuthenticated } = useAuth();
  const { 
    employees, 
    currentEmployee,
    loading: employeeLoading,
    error: employeeError,
    getEmployees,
    getEmployeeById,
    createEmployee, 
    updateEmployee 
  } = useEmployees();

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    contact: '',
    profilePic: null,
  });
  const [preview, setPreview] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialized, setInitialized] = useState(false);

  const { name, position, contact, profilePic } = formData;

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      
      if (!initialized) {
        const fetchData = async () => {
          if (id) {
            try {
              if (!currentEmployee || currentEmployee._id !== id) {
                await getEmployeeById(id);
              }
            } catch (error) {
              setError('Error fetching employee data');
            }
          } else if (employees.length === 0) {
            try {
              await getEmployees();
            } catch (error) {
              console.error('Error fetching employees:', error);
            }
          }
        };
        
        fetchData();
        setInitialized(true);
      }
    }
  }, [authLoading, isAuthenticated, id, currentEmployee, employees, getEmployeeById, getEmployees, navigate, initialized]);

  useEffect(() => {
    if (id && currentEmployee) {
      setFormData({
        name: currentEmployee.name,
        position: currentEmployee.position,
        contact: currentEmployee.contact,
        profilePic: null,
      });
      setPreview(currentEmployee.profilePicture || '');
    }
  }, [id, currentEmployee]);

  useEffect(() => {
    if (employeeError) {
      setError(employeeError);
    }
  }, [employeeError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    const data = new FormData();
    data.append('name', name);
    data.append('position', position);
    data.append('contact', contact);
    if (profilePic) data.append('profilePicture', profilePic);

    try {
      if (id) {
        await updateEmployee(id, data);
      } else {
        await createEmployee(data);
      }
      navigate('/employees');
    } catch (err) {
      setError(`Error ${id ? 'updating' : 'creating'} employee: ${err.message || 'Unknown error'}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  const loading = authLoading || employeeLoading;

  if (loading) {
    return (
      <div className="loading">
        <i className="fas fa-spinner fa-spin"></i> Loading...
      </div>
    );
  }

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
          <button type="submit" className="btn btn-primary" disabled={submitLoading}>
            {submitLoading ? (
              <><i className="fas fa-spinner fa-spin"></i> {id ? 'Updating...' : 'Adding...'}</>
            ) : (
              <><i className="fas fa-save"></i> {id ? 'Update Employee' : 'Add Employee'}</>
            )}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate('/employees')}
            disabled={submitLoading}
          >
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
