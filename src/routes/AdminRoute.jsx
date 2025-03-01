import { useAuthContext } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

// AdminRoute - Specifically for admin users
const AdminRoute = () => {
  const { user } = useAuthContext();

  // If there is no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is not an admin, redirect to home page
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // If user is an admin, render the child routes
  return <Outlet />;
};

export default AdminRoute;