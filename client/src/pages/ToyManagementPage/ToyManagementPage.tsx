import './ToyManagementPage.css';
import type { Toy } from '../../types/toy';
import { getAllToys, deleteToy } from '../../services/toyService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { useAuth0 } from '@auth0/auth0-react';

function ToyManagementPage() {
  const [toys, setToys] = useState<Toy[]>([]);
  const [toysLoaded, setToysLoaded] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const fetchToys = async () => {
    try {
      const response = await getAllToys();
      setToys(response);
      setToysLoaded(true);
    } catch (error) {
      console.error('Failed to fetch toys:', error);
    }
  };

  useEffect(() => {
    void fetchToys();
  }, []);

  if (!toysLoaded) {
    return <p>Loading toys...</p>;
  }

  const handleDeleteRequest = async (id: number) => {
    try {
      await deleteToy(getAccessTokenSilently, id);
      fetchToys();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="toy-management-page">
      <main className="toy-management">
        <div className="toy-management__title">
          <h1>Show All Toys</h1>
          <div className="toy-management__actions toy-management__actions--add">
            <Link to="/admin/toys/new" className="toy-management__button">
              Add New Toy
            </Link>
          </div>
        </div>
        <table className="toy-management__table">
          <thead className="toy-management__table-head">
            <tr className="toy-management__header-row">
              <th className="toy-management__header-cell">Toy ID</th>
              <th className="toy-management__header-cell">Name</th>
              <th className="toy-management__header-cell">Age Group</th>
              <th className="toy-management__header-cell">Created at</th>
              <th className="toy-management__header-cell">Available</th>
              <th className="toy-management__header-cell">Status</th>
              <th className="toy-management__header-cell">Edit</th>
              <th className="toy-management__header-cell">Delete</th>
            </tr>
          </thead>

          <tbody className="toy-management__table-body">
            {toys.map((request) => (
              <tr key={request.id} className="toy-management__row">
                <td className="toy-management__cell">{request.id}</td>
                <td className="toy-management__cell">{request.name}</td>
                <td className="toy-management__cell">{request.age_group}</td>
                <td className="toy-management__cell">
                  {formatDate(request.created_at)}
                </td>
                <td className="toy-management__cell">
                  {request.is_available ? 'Yes' : 'No'}
                </td>
                <td className="toy-management__cell">
                  <span className="toy-management__status">
                    {request.status}
                  </span>
                </td>

                <td className="toy-management__cell">
                  <div className="toy-management__actions">
                    <Link
                      to={`/admin/toys/${request.id}/edit`}
                      className="toy-management__button toy-management__button--check-message"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
                <td className="toy-management__cell">
                  <div className="toy-management__delete">
                    <button
                      className="toy-management__button toy-management__button--delete"
                      onClick={() => handleDeleteRequest(request.id)}
                    >
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

export default ToyManagementPage;
