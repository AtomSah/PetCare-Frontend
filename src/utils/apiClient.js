import axios from 'axios';

// Create a reusable API client with authentication
export const createApiClient = () => {
  const token = localStorage.getItem('token');
  
  return axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
};

// For file uploads (with multipart/form-data)
export const createFileUploadClient = () => {
  const token = localStorage.getItem('token');
  
  return axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
};