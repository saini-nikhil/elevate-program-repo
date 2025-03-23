import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEmployees } from '../contexts/EmployeeContext';
import '../styles/EmployeeDetail.css';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { 
    currentEmployee, 
    loading: employeeLoading, 
    error, 
    getEmployeeById, 
    deleteEmployee 
  } = useEmployees();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      
      if (!initialized && id) {
        getEmployeeById(id);
        setInitialized(true);
      }
    }
  }, []);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        navigate('/employees');
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete employee');
      }
    }
  };

  const loading = authLoading || employeeLoading;

  if (loading) return (
    <div className="loading">
      <i className="fas fa-spinner fa-spin"></i> Loading...
    </div>
  );
  
  if (error) return (
    <div className="error-message">
      <i className="fas fa-exclamation-circle"></i> {error}
    </div>
  );
  
  if (!currentEmployee) return (
    <div className="not-found">
      <i className="fas fa-search"></i> Employee not found
    </div>
  );

  return (
    <div className="employee-details">
      <h2>Employee Details</h2>
      <div className="employee-profile">
        <div className="profile-image-container">
          {currentEmployee.profilePicture ? (
            <img 
              src={currentEmployee.profilePicture} 
              alt={`${currentEmployee.name}'s profile`} 
              className="profile-image" 
            />
          ) : (
            <div className="profile-placeholder">
              {currentEmployee.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="employee-info">
          <h3>{currentEmployee.name}</h3>
          <p><strong>Position:</strong> {currentEmployee.position}</p>
          <p><strong>Contact:</strong> {currentEmployee.contact}</p>
          
          <div className="employee-actions">
            <Link to={`/employees/${currentEmployee._id}/edit`} className="btn btn-primary">
              <i className="fas fa-edit"></i> Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              <i className="fas fa-trash-alt"></i> Delete
            </button>
            <Link to="/employees" className="btn btn-secondary">
              <i className="fas fa-arrow-left"></i> Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;