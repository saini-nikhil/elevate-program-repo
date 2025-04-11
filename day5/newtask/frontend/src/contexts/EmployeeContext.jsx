import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEmployees: 0,
    limit: 10
  });
  
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  useEffect(() => {
    console.log("EmployeeContext state:", { 
      employees, 
      pagination, 
      user, 
      isAdmin 
    });
  }, [employees, pagination, user, isAdmin]);

  const getEmployees = async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching employees with params:", { page, limit });
      const response = await api.get('/employees', {
        params: { page, limit }
      });
      
      console.log("API response:", response.data);
      
      if (response.data && response.data.employees) {
        setEmployees(response.data.employees);
        setPagination(response.data.pagination || {
          currentPage: page,
          totalPages: 1,
          totalEmployees: response.data.employees.length,
          limit
        });
      } else if (Array.isArray(response.data)) {
        setEmployees(response.data);
        setPagination({
          currentPage: page,
          totalPages: 1,
          totalEmployees: response.data.length,
          limit
        });
      } else {
        console.error("Unexpected API response format:", response.data);
        setEmployees([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalEmployees: 0,
          limit: 10
        });
      }
      return response.data;
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.response?.data?.message || 'Failed to fetch employees');
      setEmployees([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalEmployees: 0,
        limit: 10
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const getDirectoryEmployees = async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching directory employees with params:", { page, limit });
      
      const response = await api.get('/debug/employees', {
        params: { page, limit }
      });
      
      console.log("API directory response:", response.data);
      
      if (response.data && response.data.employees) {
        setEmployees(response.data.employees);
        setPagination(response.data.pagination || {
          currentPage: page,
          totalPages: Math.ceil(response.data.count / limit),
          totalEmployees: response.data.count,
          limit
        });
      } else {
        console.error("Unexpected directory API response format:", response.data);
        setEmployees([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalEmployees: 0,
          limit: 10
        });
      }
      return response.data;
    } catch (err) {
      console.error("Error fetching directory employees:", err);
      setError(err.response?.data?.message || 'Failed to fetch employee directory');
      setEmployees([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalEmployees: 0,
        limit: 10
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const getAllEmployees = async (page = 1, limit = 10) => {
    if (!isAdmin) throw new Error('Unauthorized access');
    
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching all employees with params:", { page, limit });
      const response = await api.get('/admin/employees', {
        params: { page, limit }
      });
      
      console.log("API admin response:", response.data);
      
      if (response.data && response.data.employees) {
        setEmployees(response.data.employees);
        setPagination(response.data.pagination || {
          currentPage: page,
          totalPages: 1,
          totalEmployees: response.data.employees.length,
          limit
        });
      } else if (Array.isArray(response.data)) {
        setEmployees(response.data);
        setPagination({
          currentPage: page,
          totalPages: 1,
          totalEmployees: response.data.length,
          limit
        });
      } else {
        console.error("Unexpected API response format:", response.data);
        setEmployees([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalEmployees: 0,
          limit: 10
        });
      }
      return response.data;
    } catch (err) {
      console.error("Error fetching all employees:", err);
      setError(err.response?.data?.message || 'Failed to fetch all employees');
      setEmployees([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalEmployees: 0,
        limit: 10
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getEmployeeById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = isAdmin ? `/admin/employee/${id}` : `/employee/${id}`;
      const response = await api.get(endpoint);
      setCurrentEmployee(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employee');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employeeData) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = isAdmin ? '/admin/employee' : '/employee';
      const response = await api.post(endpoint, employeeData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const newEmployee = response.data.employee || response.data;
      setEmployees([...employees, newEmployee]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create employee');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id, employeeData) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = isAdmin ? `/admin/employee/${id}` : `/employee/${id}`;
      const response = await api.put(endpoint, employeeData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const updatedEmployee = response.data.employee || response.data;
      
      setEmployees(employees.map(emp => 
        emp._id === id ? updatedEmployee : emp
      ));
      setCurrentEmployee(updatedEmployee);
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update employee');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = isAdmin ? `/admin/employee/${id}` : `/employee/${id}`;
      await api.delete(endpoint);
      setEmployees(employees.filter(emp => emp._id !== id));
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete employee');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    employees,
    currentEmployee,
    loading,
    error,
    pagination,
    isAdmin,
    getEmployees,
    getAllEmployees,
    getDirectoryEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
  };

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};

export default EmployeeContext;