import Logo from '../Logo/Logo';
import AdminNav from '../AdminNav/AdminNav';
import './AdminHeader.css';
import AdminLogout from '../AdminLogout/AdminLogout';

function AdminHeader() {
  return (
    <header className="admin-header">
      <Logo />
      <AdminNav />
      <AdminLogout />
    </header>
  );
}

export default AdminHeader;
