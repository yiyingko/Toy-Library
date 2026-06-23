import './ContactDetailPage.css';
import type { Contact } from '../../types/contact';
import { getMessageById } from '../../services/contactService';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

function ContactDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [contactMessage, setContactMessage] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadContactMessage() {
      try {
        if (!id) {
          throw new Error('Message ID is missing');
        }

        const MessageData = await getMessageById(Number(id));
        setContactMessage(MessageData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    }

    loadContactMessage();
  }, [id]);

  if (loading) return <p>Loading toy...</p>;
  if (error) return <p>{error}</p>;
  if (!contactMessage) return <p>Message not found.</p>;
  return (
    <main className="message-detail">
      <div className="message-detail__content">
        <h1 className="message-detail__title">Message...</h1>
        <div className="message-detail__item">
          <p className="message-detail__label">ID:</p>
          <p className="message-detail__text">{contactMessage.id}</p>
        </div>
        <div className="message-detail__item">
          <p className="message-detail__label">Date:</p>
          <p className="message-detail__text">
            {formatDate(contactMessage.created_at)}
          </p>
        </div>
        <div className="message-detail__item">
          <p className="message-detail__label">Name:</p>
          <p className="message-detail__text">{contactMessage.name}</p>
        </div>
        <div className="message-detail__item">
          <p className="message-detail__label">Email:</p>
          <p className="message-detail__text">{contactMessage.email}</p>
        </div>
        <div className="message-detail__item">
          <p className="message-detail__label">Subject:</p>
          <p className="message-detail__text">{contactMessage.email}</p>
        </div>
        <div className="message-detail__item">
          <p className="message-detail__label">Message:</p>
          <p className="message-detail__text">{contactMessage.message}</p>
        </div>
      </div>
    </main>
  );
}

export default ContactDetailPage;
