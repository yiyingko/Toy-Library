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
    <div className="borrow-requests-page">
      <main className="borrow-requests">
        <table className="borrow-requests__table">
          <thead className="borrow-requests__table-head">
            <tr className="borrow-requests__header-row">
              <th className="borrow-requests__header-cell">Name</th>
              <th className="borrow-requests__header-cell">Email</th>
              <th className="borrow-requests__header-cell">Toy ID</th>
              <th className="borrow-requests__header-cell">Toy</th>
              <th className="borrow-requests__header-cell">Status</th>
              <th className="borrow-requests__header-cell">Date</th>
              <th className="borrow-requests__header-cell">Action</th>
            </tr>
          </thead>

          <tbody className="borrow-requests__table-body">
            {borrowRequests.map((request) => (
              <tr key={request.id} className="borrow-requests__row">
                <td className="borrow-requests__cell">
                  {request.borrower_name}
                </td>

                <td className="borrow-requests__cell">
                  {request.borrower_email}
                </td>

                <td className="borrow-requests__cell">{request.toy_id}</td>

                <td className="borrow-requests__cell">{request.toy_name}</td>

                <td className="borrow-requests__cell">
                  <span className="borrow-requests__status">
                    {request.borrow_status}
                  </span>
                </td>

                <td className="borrow-requests__cell">{request.created_at}</td>

                <td className="borrow-requests__cell">
                  <div className="borrow-requests__actions">
                    <button className="borrow-requests__button borrow-requests__button--approve">
                      Approve
                    </button>

                    <button className="borrow-requests__button borrow-requests__button--reject">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default BorrowRequestsPage;
