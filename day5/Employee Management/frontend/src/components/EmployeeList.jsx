// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEmployees } from '../contexts/EmployeeContext';
import '../styles/EmployeeList.css';

const EmployeeList = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { employees, loading: employeesLoading, getEmployees } = useEmployees();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      
      if (!initialized) {
        getEmployees();
        setInitialized(true);
      }
    }
  }, [authLoading, isAuthenticated, navigate, getEmployees, initialized]);

  const loading = authLoading || employeesLoading;

  if (loading) {
    return <div className="loading">
      <i className="fas fa-spinner fa-spin"></i> Loading...
    </div>;
  }

  return (
    <div className="employee-list">
      <div className="list-header">
        <h2>Employee List</h2>
        {user && (
          <div className="welcome-message">
            Welcome, <strong>{user.username}</strong>! Here are your employees.
          </div>
        )}
      </div>
      
      <Link to="/employees/new" className="btn btn-primary">
        <i className="fas fa-user-plus"></i> Add New Employee
      </Link>
      
      <div className="employee-cards">
        {employees && employees.length > 0 ? (
          employees.map((employee) => (
            <div key={employee._id} className="employee-card">
              <div className="profile-image">
                {employee.profilePicture ? (
                  <img src={employee.profilePicture} alt={`${employee.name}'s profile`} />
                ) : (
                  <div className="placeholder-image">{employee.name.charAt(0)}</div>
                )}
              </div>
              <div className="employee-info">
                <h3>{employee.name}</h3>
                <p className="position">{employee.position}</p>
                <p className="contact">{employee.contact}</p>
                <div className="actions">
                  <Link to={`/employees/${employee._id}`} className="btn btn-info">
                    <i className="fas fa-eye"></i> View
                  </Link>
                  <Link to={`/employees/${employee._id}/edit`} className="btn btn-warning">
                    <i className="fas fa-edit"></i> Edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-employees">
            <i className="fas fa-user-slash"></i>
            <p>You haven't added any employees yet.</p>
            <p>Click the "Add New Employee" button to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
