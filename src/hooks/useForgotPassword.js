import { useState } from 'react';
import axios from 'axios';

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const forgotPassword = async (email) => {
    setIsLoading(true);
    setError(null);
    setMessage('');

    try {
      const response = await axios.post('/api/users/forgot-password', { email });
      setMessage(response.data.message);
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setIsLoading(false);
      return { success: false, error: error.response?.data?.message };
    }
  };

  const resetPassword = async (token, password) => {
    setIsLoading(true);
    setError(null);
    setMessage('');

    try {
      const response = await axios.post(`/api/users/reset-password/${token}`, { password });
      setMessage(response.data.message);
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setIsLoading(false);
      return { success: false, error: error.response?.data?.message };
    }
  };

  return { forgotPassword, resetPassword, isLoading, error, message };
};