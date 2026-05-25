// AdminLayout.tsx
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import AdminHeader from '../components/AdminHeader/AdminHeader';

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="admin-layout__content">
        <Outlet />
      </main>
      <Footer variant="admin" />
    </div>
  );
}

export default AdminLayout;
