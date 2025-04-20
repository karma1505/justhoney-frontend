import { fetchAPI } from './api';

export const login = async (email, password) => {
  const response = await fetchAPI('/login/', 'POST', { email, password });
  return response;
};

export const register = async (userData) => {
  const response = await fetchAPI('/register/', 'POST', userData);
  return response;
};

// Store token in localStorage
export const setAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

// Get token from localStorage
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};