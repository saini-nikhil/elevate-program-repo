// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../actions/employeeActions';
import { getUserProfile } from '../actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Get employees from Redux state
  const { employees } = useSelector(state => state.employee);
  const { user } = useSelector(state => state.auth || {});

  // Check authentication and fetch employees when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if no token found
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // If no user in state, fetch the profile
        if (!user) {
          await dispatch(getUserProfile());
        }
        await dispatch(getEmployees());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, navigate, user]);

  if (isLoading) {
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
