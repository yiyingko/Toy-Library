import './BorrowRequestsPage.css';
import { useState, useEffect } from 'react';
import type { BorrowRequest } from '../../types/borrow';
import { getAllBorrowRequests } from '../../services/borrowService';

function BorrowRequestsPage() {
  const [borrowRequests, setBorrowRequests] = useState<BorrowRequest[]>([]);
  const [requestsLoaded, setRequestsLoaded] = useState(false);

  useEffect(() => {
    getAllBorrowRequests()
      .then((response) => {
        setBorrowRequests(response);
        setRequestsLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to fetch toys:', error);
      });
  }, []);

  if (!requestsLoaded) {
    return <p>Loading requests...</p>;
  }

  return (
    <main>
      <table className="borrow-requests__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Toy_id</th>
            <th>Toy</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {borrowRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.borrower_name}</td>
              <td>{request.borrower_email}</td>
              <td>{request.toy_id}</td>
              <td>{request.toy_name}</td>
              <td>{request.borrow_status}</td>
              <td>{request.created_at}</td>
              <td>
                <button>Approve</button>
                <button>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default BorrowRequestsPage;
