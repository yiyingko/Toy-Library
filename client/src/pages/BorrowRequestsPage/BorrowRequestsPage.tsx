import './BorrowRequestsPage.css';
import { useState, useEffect } from 'react';
import type { BorrowRequest, UpdateBorrowStatusData } from '../../types/borrow';
import {
  getAllBorrowRequests,
  updateBorrowStatus,
} from '../../services/borrowService';

function BorrowRequestsPage() {
  const [borrowRequests, setBorrowRequests] = useState<BorrowRequest[]>([]);
  const [requestsLoaded, setRequestsLoaded] = useState(false);

  const fetchBorrowRequests = async () => {
    try {
      const response = await getAllBorrowRequests();
      setBorrowRequests(response);
      setRequestsLoaded(true);
    } catch (error) {
      console.error('Failed to fetch borrow requests:', error);
    }
  };

  useEffect(() => {
    void fetchBorrowRequests();
  }, []);

  if (!requestsLoaded) {
    return <p>Loading requests...</p>;
  }

  const approveBorrowStatus = async (data: UpdateBorrowStatusData) => {
    try {
      await updateBorrowStatus(data);
      await fetchBorrowRequests();

      console.log('approve submitted!');
    } catch (error) {
      console.error(error);
    }
  };

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
              <th className="borrow-requests__header-cell">Delete</th>
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
                    {request.borrow_status === 'pending' && (
                      <>
                        <button
                          className="borrow-requests__button borrow-requests__button--approve"
                          onClick={() =>
                            approveBorrowStatus({
                              id: request.id,
                              toy_id: request.toy_id,
                              status: 'approved',
                            })
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="borrow-requests__button borrow-requests__button--reject"
                          onClick={() =>
                            approveBorrowStatus({
                              id: request.id,
                              toy_id: request.toy_id,
                              status: 'rejected',
                            })
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {request.borrow_status === 'rejected' && (
                      <button
                        className="borrow-requests__button borrow-requests__button--approve"
                        onClick={() =>
                          approveBorrowStatus({
                            id: request.id,
                            toy_id: request.toy_id,
                            status: 'approved',
                          })
                        }
                      >
                        Approve
                      </button>
                    )}

                    {request.borrow_status === 'approved' && (
                      <button
                        className="borrow-requests__button borrow-requests__button--return"
                        onClick={() =>
                          approveBorrowStatus({
                            id: request.id,
                            toy_id: request.toy_id,
                            status: 'completed',
                          })
                        }
                      >
                        Return Toy
                      </button>
                    )}
                  </div>
                </td>
                <td className="borrow-requests__cell">
                  <div className="borrow-requests__delete">
                    <button className="borrow-requests__button borrow-requests__button--delete">
                      Delete
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
