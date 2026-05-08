import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToyById } from '../../services/toyService';
import type { Toy } from '../../types/toy';
import './ToyDetailPage.css';
import { Link } from 'react-router-dom';

function ToyDetailPage() {
  const { toyId } = useParams<{ toyId: string }>();
  const [toy, setToy] = useState<Toy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadToy() {
      try {
        if (!toyId) {
          throw new Error('Toy ID is missing');
        }

        const toyData = await getToyById(Number(toyId));
        setToy(toyData);
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

    loadToy();
  }, [toyId]);

  if (loading) return <p>Loading toy...</p>;
  if (error) return <p>{error}</p>;
  if (!toy) return <p>Toy not found.</p>;

  return (
    <section className="toy-detail">
      <img src={toy.image_path} alt={toy.name} className="toy-detail__img" />

      <div className="toy-detail__content">
        <h1 className="toy-detail__title">{toy.name}</h1>

        <div className="toy-detail__item">
          <p className="toy-detail__label">Description:</p>
          <p className="toy-detail__text">{toy.description}</p>
        </div>

        <div className="toy-detail__item">
          <p className="toy-detail__label">Age:</p>
          <p className="toy-detail__text">{toy.age_group}</p>
        </div>

        <div className="toy-detail__item toy-detail__last">
          <p className="toy-detail__label">Availability:</p>
          <p className="toy-detail__text">
            {toy.is_available ? 'Available' : 'Currently unavailable'}
          </p>
        </div>

        {toy.status === 'available' ? (
          <Link to={`/borrow/${toy.id}`} className="borrow__button">
            Borrow
          </Link>
        ) : toy.status === 'pending' ? (
          <div className="toy-detail__pending">Pending request...</div>
        ) : (
          <div className="toy-detail__unavailable">Currently unavailable</div>
        )}
      </div>
    </section>
  );
}

export default ToyDetailPage;
