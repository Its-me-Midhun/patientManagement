import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Contactus.css';

const ContactForm = () => {
  const initialValues = {
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission logic here
    console.log(values);
    resetForm();
  };

  return (
    <div className="contact-section">
      <h2>Contact Us</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group-contact">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group-contact">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group-contact">
            <label htmlFor="phoneNumber">Phone Number</label>
            <Field type="text" id="phoneNumber" name="phoneNumber" />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group-contact">
            <label htmlFor="message">Message</label>
            <Field as="textarea" id="message" name="message" />
            <ErrorMessage
              name="message"
              component="div"
              className="error-message"
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
