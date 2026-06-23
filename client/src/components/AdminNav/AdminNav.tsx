import { NavLink } from 'react-router-dom';
import './AdminNav.css';

function AdminNav() {
  return (
    <nav className="Admin-navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/admin">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin/toys">Toy Management</NavLink>
        </li>
        <li>
          <NavLink to="/admin/requests">Borrow Requests</NavLink>
        </li>
        <li>
          <NavLink to="/admin/messages">Messages</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNav;
