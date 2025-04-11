// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEmployees } from '../contexts/EmployeeContext';
import '../styles/EmployeeList.css';

const EmployeeList = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { 
    employees, 
    loading: employeesLoading, 
    getEmployees, 
    getAllEmployees, 
    isAdmin,
    pagination,
    deleteEmployee 
  } = useEmployees();
  
  const [initialized, setInitialized] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [localEmployees, setLocalEmployees] = useState([]);
  
 
  useEffect(() => {
    if (employees && Array.isArray(employees)) {
      console.log("Setting local employees:", employees.length);
      setLocalEmployees(employees);
    } else {
      console.warn("Invalid employees data:", employees);
      setLocalEmployees([]);
    }
  }, [employees]);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      
      if (!initialized) {
        console.log("Initializing employee list...");
        loadEmployees(currentPage, itemsPerPage);
        setInitialized(true);
      }
    }
  }, [authLoading, isAuthenticated, navigate, initialized, currentPage, itemsPerPage]);

  const loadEmployees = async (page, limit) => {
    try {
      console.log("Loading employees...", { isAdmin, page, limit });
      if (isAdmin) {
        const response = await getAllEmployees(page, limit);
        console.log("Admin employee response:", response);
      } else {
        const response = await getEmployees(page, limit);
        console.log("Employee response:", response);
      }
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    loadEmployees(newPage, itemsPerPage);
  };

  const handleItemsPerPageChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset to first page
    loadEmployees(1, newLimit);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        // Reload current page
        loadEmployees(currentPage, itemsPerPage);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  // Debug: Log important state values
  console.log("EmployeeList rendering:", {
    employeesLength: employees?.length || 0,
    localEmployeesLength: localEmployees?.length || 0,
    pagination,
    isAuthenticated,
    isAdmin,
    loading: authLoading || employeesLoading
  });

  const loading = authLoading || employeesLoading;

  if (loading) {
    return <div className="loading">
      <i className="fas fa-spinner fa-spin"></i> Loading...
    </div>;
  }

  // Generate pagination UI
  const renderPagination = () => {
    if (!pagination || !pagination.totalPages) return null;
    
    const pages = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  // Manual reload button for debugging
  const handleManualReload = () => {
    console.log("Manual reload triggered");
    loadEmployees(currentPage, itemsPerPage);
  };

  return (
    <div className="employee-list">
      <div className="list-header">
        <h2>{isAdmin ? 'All Employees (Admin View)' : 'My Employees'}</h2>
        {user && (
          <div className="welcome-message">
            Welcome, <strong>{user.username}</strong>! 
            {isAdmin ? ' You have admin privileges.' : ' Here are your employees.'}
          </div>
        )}
      </div>
      
      <div className="action-buttons">
        <Link to="/employees/new" className="btn btn-primary">
          <i className="fas fa-user-plus"></i> Add New Employee
        </Link>
        
        <button onClick={handleManualReload} className="btn btn-secondary">
          <i className="fas fa-sync"></i> Refresh List
        </button>
      </div>
      
      <div className="employee-cards">
        {localEmployees && localEmployees.length > 0 ? (
          localEmployees.map((employee) => (
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
                {isAdmin && employee.createdBy && (
                  <p className="created-by">Created by: {employee.createdBy.username || 'Unknown'}</p>
                )}
                <div className="actions">
                  <Link to={`/employees/${employee._id}`} className="btn btn-info">
                    <i className="fas fa-eye"></i> View
                  </Link>
                  <Link to={`/employees/${employee._id}/edit`} className="btn btn-warning">
                    <i className="fas fa-edit"></i> Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(employee._id)} 
                    className="btn btn-danger"
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-employees">
            <i className="fas fa-user-slash"></i>
            <p>No employees found.</p>
            <p>Click the "Add New Employee" button to get started!</p>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-controls">
            <button 
              disabled={currentPage === 1} 
              onClick={() => handlePageChange(currentPage - 1)}
              className="pagination-button"
            >
              &laquo; Prev
            </button>
            
            {renderPagination()}
            
            <button 
              disabled={currentPage === pagination.totalPages} 
              onClick={() => handlePageChange(currentPage + 1)}
              className="pagination-button"
            >
              Next &raquo;
            </button>
          </div>
          
      
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
