import './AddToyPage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Toy } from '../../types/toy';
import { useForm } from 'react-hook-form';
import { uploadImage } from '../../services/uploadService';
import { createNewToy } from '../../services/toyService';

function AddToyPage() {
  const [success, setSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Toy>({
    defaultValues: {
      name: '',
      description: '',
      age_group: '',
      tags: '',
      image_path: '',
    },
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be smaller than 5MB');
      e.target.value = '';
      setSelectedFile(null);
      return;
    }

    setUploadError('');
    setSelectedFile(file);
  }

  const onSubmit = async (data: Toy) => {
    if (!selectedFile) {
      setUploadError('Please select an image.');
      return;
    }
    try {
      let imageUrl = '';

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      console.log('final imageUrl:', imageUrl);

      await createNewToy({
        name: data.name,
        description: data.description,
        age_group: data.age_group,
        tags: data.tags,
        image_path: imageUrl,
      });
      setSuccess(true);
      console.log('new toy created!');
      reset();
      setSelectedFile(null);
      setUploadError('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="add-toy-form__form">
      {!success ? (
        <form
          className="add-toy-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="add-toy-form__field">
            <div className="add-toy-form__control">
              <label htmlFor="name">Toy Name:</label>
              <input
                type="text"
                id="name"
                {...register('name', {
                  required: 'Name is required',
                })}
                required
              />
            </div>
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          <div className="add-toy-form__field">
            <div className="add-toy-form__control">
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

          <div className="add-toy-form__field">
            <div className="add-toy-form__control">
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

          <div className="add-toy-form__field">
            <label htmlFor="tags">Tags:</label>
            <div className="add-toy-form__control add-toy-form__message">
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

          <div className="add-toy-form__field">
            <label htmlFor="image">Add Image:</label>
            <div className="add-toy-form__control add-toy-form__message">
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {uploadError && <p>{uploadError}</p>}
          </div>
          <button type="submit" className="add-toy-form__button">
            Submit
          </button>
        </form>
      ) : (
        <div className="add-toy-success">
          <p className="add-toy-success__message">
            New toy added successfully!
          </p>

          <Link to="/admin/toys" className="add-toy-success__btn">
            Back to Toy Management Page.
          </Link>
        </div>
      )}
    </section>
  );
}

export default AddToyPage;
