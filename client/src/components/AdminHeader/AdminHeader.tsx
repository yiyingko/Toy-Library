import Logo from '../Logo/Logo';
import AdminNav from '../AdminNav/AdminNav';
import './AdminHeader.css';

function AdminHeader() {
  return (
    <header className="admin-header">
      <Logo />
      <AdminNav />
    </header>
  );
}

export default AdminHeader;
