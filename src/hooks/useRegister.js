import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '@/context/AuthContext';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const register = async (fullname, email, password, phone, address) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        fullname,
        email,
        password,
        phone,
        address
      });

      const { user, token } = response.data;
      
      localStorage.setItem('user', JSON.stringify({ ...user, token }));
      
      dispatch({ type: 'LOGIN', payload: { ...user, token } });
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setIsLoading(false);
      return { success: false, error: error.response?.data?.message };
    }
  };

  return { register, isLoading, error };
};
