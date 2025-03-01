import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });

      const { user, token } = response.data;
      
      // Save token separately for API requests
      localStorage.setItem('token', token);
      
      // Save user data
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update auth context
      dispatch({ type: 'LOGIN', payload: { ...user, token } });
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setIsLoading(false);
      return { success: false, error: error.response?.data?.message };
    }
  };

  return { login, isLoading, error };
};