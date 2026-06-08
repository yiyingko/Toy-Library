import './EditToyPage.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getToyById } from '../../services/toyService';
import type { ToyFormData } from '../../types/toy';
import { useForm } from 'react-hook-form';

function EditToyPage() {
  const { id } = useParams<{ id: string }>();

  const {
    register,
    reset,
    formState: { errors },
  } = useForm<ToyFormData>({
    defaultValues: {
      name: '',
      description: '',
      age_group: '',
      tags: '',
      image_path: '',
    },
  });

  useEffect(() => {
    async function loadToy() {
      if (!id) return;

      const toy = await getToyById(Number(id));

      reset({
        name: toy.name,
        description: toy.description,
        age_group: toy.age_group,
        tags: toy.tags,
        image_path: toy.image_path,
      });
    }

    loadToy();
  }, [id, reset]);

  return (
    <section className="edit-toy-form__form">
      {/* {!success ? ( */}
      <form
        className="edit-toy-form"
        // onSubmit={handleSubmit(onSubmit)}
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
              // onChange={handleChange}
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
            <span className="error-message">{errors.description.message}</span>
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
          <label htmlFor="tags">Image path:</label>
          <div className="edit-toy-form__control edit-toy-form__message">
            <textarea
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

        <button type="submit" className="edit-toy-form__button">
          Submit
        </button>
      </form>
      {/* ) : ( */}
      <div className="edit-toy-success">
        <p className="edit-toy-success__message">New toy added sucessfully !</p>

        <Link to="/" className="edit-toy-success__btn">
          Back to Toy Management Page.
        </Link>
      </div>
      {/* )} */}
    </section>
  );
}

export default EditToyPage;
