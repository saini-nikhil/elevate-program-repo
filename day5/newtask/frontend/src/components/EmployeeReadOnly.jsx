import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEmployees } from '../contexts/EmployeeContext';
import '../styles/EmployeeList.css';

const EmployeeReadOnly = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { 
    employees, 
    loading: employeesLoading, 
    getDirectoryEmployees,
    pagination
  } = useEmployees();
  
  const [initialized, setInitialized] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [localEmployees, setLocalEmployees] = useState([]);
  const [localPagination, setLocalPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEmployees: 0,
    limit: 10
  });

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
    if (pagination) {
      console.log("Setting local pagination:", pagination);
      setLocalPagination(pagination);
    }
  }, [pagination]);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      
      if (!initialized) {
        console.log("Initializing employee read-only view...");
        loadEmployees(currentPage, itemsPerPage);
        setInitialized(true);
      }
    }
  }, [authLoading, isAuthenticated, navigate, initialized]);

  const loadEmployees = async (page, limit) => {
    try {
      console.log("Loading directory employees...", { page, limit });
      setCurrentPage(page);
      setItemsPerPage(limit);
      const response = await getDirectoryEmployees(page, limit);
      console.log("Directory employee response:", response);
    } catch (error) {
      console.error('Error loading directory employees:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage === currentPage) return;
    console.log("Changing to page:", newPage);
    loadEmployees(newPage, itemsPerPage);
  };

  const handleItemsPerPageChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    if (newLimit === itemsPerPage) return;
    console.log("Changing items per page to:", newLimit);
    loadEmployees(1, newLimit);
  };

  console.log("EmployeeReadOnly rendering:", {
    employeesLength: employees?.length || 0,
    localEmployeesLength: localEmployees?.length || 0,
    pagination: localPagination,
    currentPage,
    itemsPerPage,
    isAuthenticated,
    loading: authLoading || employeesLoading
  });

  const loading = authLoading || employeesLoading;

  if (loading) {
    return <div className="loading">
      <i className="fas fa-spinner fa-spin"></i> Loading...
    </div>;
  }

  const renderPagination = () => {
    if (!localPagination || !localPagination.totalPages || localPagination.totalPages <= 1) return null;
    
    const totalPages = localPagination.totalPages;
    const current = currentPage;
    const pages = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`pagination-button ${current === i ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          className={`pagination-button ${current === 1 ? 'active' : ''}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      
      let startPage, endPage;
      if (current <= 4) {
        startPage = 2;
        endPage = 5;
        pages.push(
          ...Array.from({length: endPage - startPage + 1}, (_, i) => {
            const pageNum = startPage + i;
            return (
              <button
                key={pageNum}
                className={`pagination-button ${current === pageNum ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            );
          })
        );
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      } else if (current >= totalPages - 3) {
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
        
        startPage = totalPages - 4;
        endPage = totalPages - 1;
        pages.push(
          ...Array.from({length: endPage - startPage + 1}, (_, i) => {
            const pageNum = startPage + i;
            return (
              <button
                key={pageNum}
                className={`pagination-button ${current === pageNum ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            );
          })
        );
      } else {
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
        
        startPage = current - 1;
        endPage = current + 1;
        pages.push(
          ...Array.from({length: endPage - startPage + 1}, (_, i) => {
            const pageNum = startPage + i;
            return (
              <button
                key={pageNum}
                className={`pagination-button ${current === pageNum ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            );
          })
        );
        
        pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
      
      pages.push(
        <button
          key={totalPages}
          className={`pagination-button ${current === totalPages ? 'active' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    
    return pages;
  };

  const handleManualReload = () => {
    console.log("Manual reload triggered");
    loadEmployees(currentPage, itemsPerPage);
  };

  const displayPaginationInfo = () => {
    const { totalEmployees } = localPagination;
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalEmployees);
    
    return (
      <div className="pagination-info">
        Showing {start}-{end} of {totalEmployees} employees
      </div>
    );
  };

  return (
    <div className="employee-list">
      <div className="list-header">
        <h2>Employee Directory</h2>
        {user && (
          <div className="welcome-message">
            Welcome, <strong>{user.username}</strong>! 
            Here's our company employee directory.
          </div>
        )}
      </div>
      
      <div className="action-buttons">
        <button onClick={handleManualReload} className="btn btn-secondary">
          <i className="fas fa-sync"></i> Refresh List
        </button>
        {localPagination.totalEmployees > 0 && displayPaginationInfo()}
      </div>
      
      <div className="employee-cards">
        {localEmployees && localEmployees.length > 0 ? (
          localEmployees.map((employee) => (
            <div key={employee._id} className="employee-card read-only">
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
              </div>
            </div>
          ))
        ) : (
          <div className="no-employees">
            <i className="fas fa-user-slash"></i>
            <p>No employees found.</p>
          </div>
        )}
      </div>

      {localPagination && localPagination.totalPages > 1 && (
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
              disabled={currentPage === localPagination.totalPages} 
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

export default EmployeeReadOnly; 