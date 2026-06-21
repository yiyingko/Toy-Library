import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../LoginButton/LoginButton';
import LogoutButton from '../LogoutButton/LogoutButton';

function Navbar() {
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
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/toys">Collection</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      {isAdmin && <NavLink to="/admin">Admin</NavLink>}
      <p>{user?.email}</p>
    </nav>
  );
}

export default Navbar;
