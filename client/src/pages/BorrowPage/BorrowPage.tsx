import './BorrowPage.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToyById } from '../../services/toyService';
import { createBorrowRequest } from '../../services/borrowService';
import type { Toy } from '../../types/toy';
import type { BorrowRequest } from '../../types/borrow';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';

function BorrowPage() {
  const { toyId } = useParams<{ toyId: string }>();
  const [toy, setToy] = useState<Toy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<BorrowRequest>();

  const nameValue = useWatch({ control, name: 'borrower_name' }) || '';
  const emailValue = useWatch({ control, name: 'borrower_email' }) || '';
  const messageValue = useWatch({ control, name: 'message' }) || '';

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

  // Handle form submission

  const onSubmit = async (data: BorrowRequest) => {
    try {
      await createBorrowRequest({
        toy_id: Number(toy.id),
        borrower_name: data.borrower_name,
        borrower_email: data.borrower_email,
        message: data.message,
      });
      setSuccess(true);
      console.log('Borrow request submitted!');
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="borrow-form__section">
      <div className="borrow-form__media">
        <img src={toy.image_path} alt={toy.name} className="borrow-form__img" />
      </div>

      {!success ? (
        <form
          className="borrow-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <p className="borrow-form__toy-name">Borrowing: {toy.name}</p>
          <p className="borrow-form__toy-id">Toy ID: {toy.id}</p>

          <div className="borrow-form__field">
            <div className="borrow-form__control">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                maxLength={50}
                {...register('borrower_name', {
                  required: 'Name is required',
                  pattern: {
                    value: /^[A-Za-z\s'-]+$/,
                    message:
                      'Name can only include letters, spaces, hyphens, and apostrophes',
                  },
                })}
                required
              />
              <small>{nameValue.length}/50</small>
            </div>
            {errors.borrower_name && (
              <span className="error-message">
                {errors.borrower_name.message}
              </span>
            )}
          </div>

          <div className="borrow-form__field">
            <div className="borrow-form__control">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                maxLength={254}
                required
                {...register('borrower_email', {
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
                    message: 'Email is invalid',
                  },
                })}
              />
              <small>{emailValue.length}/254</small>
            </div>
            {errors.borrower_email && (
              <span className="error-message">
                {errors.borrower_email.message}
              </span>
            )}
          </div>

          <div className="borrow-form__field">
            <label htmlFor="message">Message:</label>
            <div className="borrow-form__control">
              <textarea id="message" maxLength={500} {...register('message')} />
              <small>{messageValue.length}/500</small>
            </div>
          </div>

          <button type="submit" className="borrow-form__button">
            Submit
          </button>
        </form>
      ) : (
        <div className="borrow-success">
          <p className="borrow-success__message">
            Request for <strong>{toy.name}</strong> sent!
          </p>

          <Link to="/toys" className="borrow-success__btn">
            Back to Collection
          </Link>
        </div>
      )}
    </section>
  );
}

export default BorrowPage;
