import { useAuthContext } from '../context/AuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // Remove user from storage
    localStorage.removeItem('user');
    
    // Remove token from storage
    localStorage.removeItem('token');
    
    // Dispatch logout action
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};