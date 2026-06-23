import { useAuth0 } from '@auth0/auth0-react';
import AdminLayout from '../../layouts/AdminLayout';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <AdminLayout /> : <Navigate to="/" replace />;
};

export default ProtectedAdminRoute;
