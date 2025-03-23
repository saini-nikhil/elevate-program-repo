
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeById, deleteEmployee } from '../actions/employeeActions';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './EmployeeDetail.css';

const EmployeeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { employee } = useSelector(state => state.employee);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    dispatch(getEmployeeById(id))
      .finally(() => setLoading(false));
  }, [dispatch, id, navigate]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id))
        .then(() => {
          navigate('/employees');
        })
        .catch(error => {
          console.error('Delete failed:', error);
          alert('Failed to delete employee');
        });
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!employee) return <div className="not-found">Employee not found</div>;

  return (
    <div className="employee-details">
      <h2>Employee Details</h2>
      <div className="employee-profile">
        <div className="profile-image-container">
          {employee.profilePicture ? (
            <img 
              src={employee.profilePicture} 
              alt={`${employee.name}'s profile`} 
              className="profile-image" 
            />
          ) : (
            <div className="profile-placeholder">
              {employee.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="employee-info">
          <h3>{employee.name}</h3>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Contact:</strong> {employee.contact}</p>
          
          <div className="employee-actions">
            <Link to={`/employees/${employee._id}/edit`} className="btn btn-primary">
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