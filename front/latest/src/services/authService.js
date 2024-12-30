// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Your backend API URL

// Register user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

// Login user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        const { token } = response.data;
        const {email}=response.data;
        localStorage.setItem('authToken', token);  // Store token in localStorage
        localStorage.setItem('email', email); 
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

// Logout user
export const logoutUser = () => {
    localStorage.removeItem('authToken');  // Remove token on logout
};

// Fetch user profile (Protected route)
export const getUserProfile = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No token found, please log in');
    
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
};
