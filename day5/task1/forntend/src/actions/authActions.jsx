import api from '../utils/api';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get current user profile
export const getUserProfile = () => async dispatch => {
    try {
        const response = await api.get(`/auth/profile`);
        dispatch({ type: 'SET_USER', payload: response.data });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

// Signup user
export const signup = (userData) => async dispatch => {
    try {
        // For signup, we use axios directly (no token required)
        const response = await axios.post(`${API_URL}/auth/signup`, userData);
        dispatch({ type: 'LOGIN', payload: { user: response.data.user, token: response.data.token } });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

// Login user
export const login = (userData) => async dispatch => {
    try {
        // For login, we use axios directly (no token required)
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        dispatch({ type: 'LOGIN', payload: { user: response.data.user, token: response.data.token } });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Logout user
export const logout = () => dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
};
