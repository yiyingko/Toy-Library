import './ContactPage.css';
import { createContactMessage } from '../../services/contactService';
import type { Contact } from '../../types/contact';
import { useForm, useWatch } from 'react-hook-form';
import toyLibraryMap from '../../assets/images/map.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ContactPage() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Contact>();

  const nameValue = useWatch({ control, name: 'name' }) || '';
  const emailValue = useWatch({ control, name: 'email' }) || '';
  const subjectValue = useWatch({ control, name: 'subject' }) || '';
  const messageValue = useWatch({ control, name: 'message' }) || '';

  //   // Handle form submission

  const onSubmit = async (data: Contact) => {
    try {
      await createContactMessage({
        name: data.name,
        email: data.email,
        message: data.message,
        subject: data.subject,
      });
      setSuccess(true);
      console.log('contact message submitted!');
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="contact-form__section">
      <div className="contact-form__info">
        <div className="contact-form__map">
          <img
            src={toyLibraryMap}
            alt="Map showing the location of The Toy Corner at Curious City Central Library"
            className="contact-form__img"
          />
        </div>
        <div className="contact-form__details">
          <section className="contact-form__address">
            <h2 className="contact-form__heading">Address</h2>
            <address>
              The Toy Corner (Room 2B)
              <br /> Curious City Central Library <br />7 Rainbow Lane
              <br /> Curious City <br />
              CC3 4TO <br />
              United Kingdom
            </address>
          </section>
          <section className="contact-form__hours">
            <h2 className="contact-form__heading">Opening Hours</h2>
            <p className="contact-form__note">
              <strong>By appointment only</strong>
            </p>

            <ul>
              <li>Tuesday: 10:00 – 16:00</li>
              <li>Wednesday: 12:00 – 18:00</li>
              <li>Friday: 10:00 – 16:00</li>
              <li>Saturday: 11:00 – 15:00</li>
              <li>Closed: Sunday, Monday, Thursday</li>
            </ul>
          </section>

          <p className="contact-from__description">
            We’re a small volunteer-run toy library — booking ahead helps us
            prepare your visit and keep things running smoothly
          </p>
        </div>
      </div>

      <section className="contact-from__form">
        <h1>Contact Us</h1>
        {!success ? (
          <form
            className="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="contact-form__field">
              <div className="contact-form__control">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  maxLength={50}
                  {...register('name', {
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
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>

            <div className="contact-form__field">
              <div className="contact-form__control">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  maxLength={254}
                  required
                  {...register('email', {
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
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="contact-form__field">
              <div className="contact-form__control">
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  maxLength={80}
                  {...register('subject', {
                    required: 'subject is required',
                  })}
                  required
                />
                <small>{subjectValue.length}/80</small>
              </div>
              {errors.subject && (
                <span className="error-message">{errors.subject.message}</span>
              )}
            </div>

            <div className="contact-form__field">
              <label htmlFor="message">Message:</label>
              <div className="contact-form__control contact-form__message">
                <textarea
                  id="message"
                  maxLength={500}
                  {...register('message', {
                    required: 'Message is required',
                  })}
                />
                <small>{messageValue.length}/500</small>
              </div>
              {errors.message && (
                <span className="error-message">{errors.message.message}</span>
              )}
            </div>

            <button type="submit" className="contact-form__button">
              Submit
            </button>
          </form>
        ) : (
          <div className="contact-success">
            <p className="contact-success__message">Message sent!</p>

            <Link to="/" className="contact-success__btn">
              Back to Home
            </Link>
          </div>
        )}
      </section>
    </section>
  );
}

export default ContactPage;
