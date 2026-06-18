import './ContactMessagesPage.css';
import type { Contact } from '../../types/contact';
import {
  getAllContactMessages,
  deleteContactMessage,
} from '../../services/contactService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

function ContactMessagesPage() {
  const [contactMessages, setContactMessages] = useState<Contact[]>([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);

  const fetchContactMessages = async () => {
    try {
      const response = await getAllContactMessages();
      setContactMessages(response);
      setMessagesLoaded(true);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  useEffect(() => {
    void fetchContactMessages();
  }, []);

  if (!messagesLoaded) {
    return <p>Loading toys...</p>;
  }

  const handleDeleteRequest = async (id: number) => {
    try {
      await deleteContactMessage(id);
      fetchContactMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contact-messages-page">
      <main className="contact-messages">
        <table className="contact-messages__table">
          <thead className="contact-messages__table-head">
            <tr className="contact-messages__header-row">
              <th className="contact-messages__header-cell">Contact ID</th>
              <th className="contact-messages__header-cell">Name</th>
              <th className="contact-messages__header-cell">Email</th>
              <th className="contact-messages__header-cell">Subject</th>
              <th className="contact-messages__header-cell">Status</th>
              <th className="contact-messages__header-cell">Date</th>
              <th className="contact-messages__header-cell">Action</th>
              <th className="contact-messages__header-cell">Delete</th>
            </tr>
          </thead>

          <tbody className="contact-messages__table-body">
            {contactMessages.map((request) => (
              <tr key={request.id} className="contact-messages__row">
                <td className="contact-messages__cell">{request.id}</td>
                <td className="contact-messages__cell">{request.name}</td>
                <td className="contact-messages__cell">{request.email}</td>
                <td className="contact-messages__cell">{request.subject}</td>
                <td className="contact-messages__cell">
                  <span className="contact-messages__status">
                    {request.status}
                  </span>
                </td>

                <td className="contact-messages__cell">
                  {formatDate(request.created_at)}
                </td>

                <td className="contact-messages__cell">
                  <div className="contact-messages__actions">
                    <Link
                      to={`/admin/messages/${request.id}`}
                      className="contact-messages__button contact-messages__button--check-message"
                    >
                      Read
                    </Link>
                  </div>
                </td>
                <td className="contact-messages__cell">
                  <div className="contact-messages__delete">
                    <button
                      className="contact-messages__button contact-messages__button--delete"
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

export default ContactMessagesPage;
