import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDashboardSummary } from '../../services/adminService';
import type { DashboardSummary } from '../../types/dashboard';

function AdminDashboard() {
  const [summary, setSummary] = useState<DashboardSummary>({
    pendingBorrowRequests: 0,
    unreadMessages: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardSummary()
      .then((response) => {
        setSummary(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch summary:', error);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="admin-dashboard">
      <section className="admin-dashboard__overview">
        <div className="admin-dashboard__datetime">
          Date and Time will display here
        </div>

        <div className="admin-dashboard__summary-card">
          <h2 className="admin-dashboard__summary-title">Pending Tasks</h2>

          <div className="admin-dashboard__summary-item">
            <span className="admin-dashboard__summary-count">
              {summary.pendingBorrowRequests}
            </span>
            <span className="admin-dashboard__summary-label">
              Borrow Requests
            </span>
          </div>

          <div className="admin-dashboard__summary-item">
            <span className="admin-dashboard__summary-count">
              {summary.unreadMessages}
            </span>
            <span className="admin-dashboard__summary-label">Messages</span>
          </div>
        </div>
      </section>

      <section className="admin-dashboard__actions">
        <Link to="/admin/toys/new" className="admin-dashboard__card">
          <h3 className="admin-dashboard__card-title">Add Toy</h3>
        </Link>

        <Link to="/admin/messages" className="admin-dashboard__card">
          <h3 className="admin-dashboard__card-title">Messages</h3>

          <span className="admin-dashboard__badge">
            {summary.unreadMessages}
          </span>
        </Link>

        <Link to="/admin/requests" className="admin-dashboard__card">
          <h3 className="admin-dashboard__card-title">Borrow Requests</h3>

          <span className="admin-dashboard__badge">
            {summary.pendingBorrowRequests}
          </span>
        </Link>
      </section>
    </main>
  );
}

export default AdminDashboard;
