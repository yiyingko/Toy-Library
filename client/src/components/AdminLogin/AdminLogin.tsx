import './AdminLogin.css';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../LoginButton/LoginButton';
import LogoutButton from '../LogoutButton/LogoutButton';
import { NavLink } from 'react-router-dom';

function AdminLogin() {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const isAdmin = user?.email === 'admin@toy-library.org.uk';

  console.log(user);

  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading-state">
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-state">
          <div className="error-title">Oops!</div>
          <div className="error-message">Something went wrong</div>
          <div className="error-sub-message">{error.message}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="admin-login__content">
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <div>
        {isAdmin && (
          <NavLink className="admin-login__link" to="/admin">
            Admin
          </NavLink>
        )}
      </div>
      <span className="admin-login__email">{user?.email}</span>
    </div>
  );
}

export default AdminLogin;
