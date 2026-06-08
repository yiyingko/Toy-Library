import './EditToyPage.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToyById, updateToyInformation } from '../../services/toyService';
import type { ToyFormData, Toy } from '../../types/toy';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../utils/formatDate';

function EditToyPage() {
  const { id } = useParams<{ id: string }>();
  const [toy, setToy] = useState<Toy | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ToyFormData>({
    defaultValues: {
      name: '',
      description: '',
      age_group: '',
      tags: '',
      image_path: '',
      is_available: false,
      status: '',
    },
  });

  const imagePath = watch('image_path');

  useEffect(() => {
    async function loadToy() {
      if (!id) return;

      const toy = await getToyById(Number(id));
      setToy(toy);
      reset({
        name: toy.name,
        description: toy.description,
        age_group: toy.age_group,
        tags: toy.tags,
        image_path: toy.image_path,
        is_available: toy.is_available,
        status: toy.status,
      });
    }

    loadToy();
  }, [id, reset]);

  const onSubmit = async (data: ToyFormData) => {
    if (!id) return;
    try {
      await updateToyInformation({
        id: Number(id),
        name: data.name,
        description: data.description,
        age_group: data.age_group,
        tags: data.tags,
        image_path: data.image_path,
        is_available: data.is_available,
        status: data.status,
      });
      setSuccess(true);
      console.log('toy updated information submitted!');
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="edit-toy-form__form">
      <p>Toy ID: {toy?.id}</p>
      <p>Created at: {toy ? formatDate(toy.created_at) : ''}</p>
      {!success ? (
        <form
          className="edit-toy-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="edit-toy-form__field">
            <div className="edit-toy-form__control">
              <label htmlFor="name">Toy Name:</label>
              <input
                type="text"
                id="name"
                {...register('name', {
                  required: 'Name is required',
                })}
                required
                name="name"
              />
            </div>
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          <div className="edit-toy-form__field">
            <div className="edit-toy-form__control">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                required
                {...register('description', {
                  required: 'Description is required',
                })}
              />
            </div>
            {errors.description && (
              <span className="error-message">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="edit-toy-form__field">
            <div className="edit-toy-form__control">
              <label htmlFor="age_group">Age group:</label>
              <input
                type="text"
                id="age_group"
                {...register('age_group', {
                  required: 'age_group is required',
                })}
                required
              />
            </div>
            {errors.age_group && (
              <span className="error-message">{errors.age_group.message}</span>
            )}
          </div>

          <div className="edit-toy-form__field">
            <label htmlFor="tags">Tags:</label>
            <div className="edit-toy-form__control edit-toy-form__message">
              <textarea
                id="tags"
                {...register('tags', {
                  required: 'Tag is required',
                })}
              />
            </div>
            {errors.tags && (
              <span className="error-message">{errors.tags.message}</span>
            )}
          </div>

          <div className="edit-toy-form__field">
            <label htmlFor="image_path">Image path:</label>
            <div className="edit-toy-form__control edit-toy-form__message">
              {imagePath && <img src={imagePath} alt="Toy preview" />}
              <input
                id="image_path"
                {...register('image_path', {
                  required: 'image_path is required',
                })}
              />
            </div>
            {errors.image_path && (
              <span className="error-message">{errors.image_path.message}</span>
            )}
          </div>

          <div className="edit-toy-form__field">
            <label htmlFor="is_available">is_available:</label>
            <div className="edit-toy-form__control edit-toy-form__message">
              <input
                type="checkbox"
                id="is_available"
                {...register('is_available')}
              />
            </div>
            {errors.is_available && (
              <span className="error-message">
                {errors.is_available.message}
              </span>
            )}
          </div>

          <div className="edit-toy-form__field">
            <label htmlFor="status">status:</label>
            <div className="edit-toy-form__control edit-toy-form__message">
              <select
                id="status"
                {...register('status', {
                  required: 'Status is required',
                })}
              >
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
            {errors.status && (
              <span className="error-message">{errors.status.message}</span>
            )}
          </div>

          <button type="submit" className="edit-toy-form__button">
            Submit
          </button>
        </form>
      ) : (
        <div className="edit-toy-success">
          <p className="edit-toy-success__message">
            New toy added sucessfully !
          </p>

          <Link to="/admin/toys" className="edit-toy-success__btn">
            Back to Toy Management Page.
          </Link>
        </div>
      )}
    </section>
  );
}

export default EditToyPage;
