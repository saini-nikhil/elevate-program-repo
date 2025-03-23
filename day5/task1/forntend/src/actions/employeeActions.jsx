import api from '../utils/api';



// Fetch all employees
export const getEmployees = () => async dispatch => {
    try {
        const response = await api.get(`/employees`);
        dispatch({ type: 'FETCH_EMPLOYEES', payload: response.data });
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

// Fetch employee by ID
export const getEmployeeById = (id) => async dispatch => {
    try {
        const response = await api.get(`/employee/${id}`);
        dispatch({ type: 'FETCH_EMPLOYEE_BY_ID', payload: response.data });
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
    }
};

// Create employee
export const createEmployee = (employeeData) => async dispatch => {
    try {
        const response = await api.post(`/employee`, employeeData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        dispatch({ type: 'CREATE_EMPLOYEE', payload: response.data.employee });
        return response.data;
    } catch (error) {
          console.error('Error creating employee:', error);
        throw error;
    }
};

// Update employee
export const updateEmployee = (id, employeeData) => async dispatch => {
    try {
        const response = await api.put(`/employee/${id}`, employeeData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        dispatch({ type: 'UPDATE_EMPLOYEE', payload: response.data.employee });
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

// Delete employee
export const deleteEmployee = (id) => async dispatch => {
    try {
        await api.delete(`/employee/${id}`);
        dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
        return { success: true };
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};
