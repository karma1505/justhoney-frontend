const BASE_URL = 'http://localhost:8000/api';

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  return response.json();
};

interface RegisterData {
  email: string;
  password: string;
  name?: string;
  [key: string]: unknown;
}

export const register = async (userData: RegisterData) => {
  const response = await fetch(`${BASE_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  
  return response.json();
};

// Store token in localStorage
export const setAuthToken = (token: string) => {
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