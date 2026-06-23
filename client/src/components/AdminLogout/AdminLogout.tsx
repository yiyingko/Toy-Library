import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../LogoutButton/LogoutButton';
import './AdminLogout.css';

function AdminLogout() {
  const { user } = useAuth0();

  return (
    <div className="admin-logout__content">
      <span className="admin-logout__email">{user?.email}</span>
      <LogoutButton />
    </div>
  );
}

export default AdminLogout;
