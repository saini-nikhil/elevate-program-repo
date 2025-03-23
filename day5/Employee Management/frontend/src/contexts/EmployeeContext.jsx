import React, { createContext, useState, useContext } from 'react';
import api from '../utils/api';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getEmployeeById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/employee/${id}`);
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
      const response = await api.post('/employee', employeeData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setEmployees([...employees, response.data.employee]);
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
      const response = await api.put(`/employee/${id}`, employeeData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setEmployees(employees.map(emp => 
        emp._id === id ? response.data.employee : emp
      ));
      setCurrentEmployee(response.data.employee);
      
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
      await api.delete(`/employee/${id}`);
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
    getEmployees,
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