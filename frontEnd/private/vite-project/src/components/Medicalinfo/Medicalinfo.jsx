import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';

import './Medicalinfo.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMedicalInfoData } from '../../actions';

const MedicalInfoForm = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [diseaseSections, setDiseaseSections] = useState([]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const addDiseaseSection = (values) => {
    setDiseaseSections([...diseaseSections, values]);
    handleCloseModal();
  };

  const removeDiseaseSection = (index) => {
    setDiseaseSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections.splice(index, 1);
      return updatedSections;
    });
  };

  const initialValues = {
    blood: '',
    height: '',
    weight: '',
    gender: '',
    diseases: diseaseSections,
  };

  const validationSchema = Yup.object({
    blood: Yup.string().required('Blood type is required'),
    height: Yup.number().required('Height is required'),
    weight: Yup.number().required('Weight is required'),
    gender: Yup.string().required('Gender is required'),
    diseases: Yup.array().of(
      Yup.object().shape({
        diseaseName: Yup.string().required('Disease name is required'),
        start_date: Yup.date().required('Start date is required'),
        remarks: Yup.string().required('Remarks are required'),
        status: Yup.string().required('Status is required'),
      })
    ),
  });

  const handleSubmit = (values) => {
    // Combine the main form values with the modal form values
    const finalValues = {
      ...values,
      diseases: [...diseaseSections, ...values.diseases],
    };

    // Handle form submission
    console.log(finalValues);
    dispatch(setMedicalInfoData(finalValues));
  };
  return (
    <div className="medical-info-form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-section">
            <div
              className="form-row "
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '93px',
              }}
            >
              <label htmlFor="blood">Blood Type:</label>
              <Field
                type="text"
                id="blood"
                name="blood"
                placeholder="Enter Blood Group"
                className="text-input"
                style={{
                  width: '200%',
                  backgroundColor: 'black',
                  border: '1px solid #6c63ff',
                }}
              />
              <ErrorMessage
                name="blood"
                component="div"
                className="error-message"
              />
            </div>
            <div
              className="form-row"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '93px',
              }}
            >
              <label htmlFor="height">Height:</label>
              <Field
                type="text"
                id="height"
                placeholder="Enter height"
                name="height"
                className="text-input"
                style={{
                  width: '200%',
                  backgroundColor: 'black',
                  border: '1px solid #6c63ff',
                }}
              />
              <ErrorMessage
                name="height"
                component="div"
                className="error-message"
              />
            </div>
            <div
              className="form-row"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '93px',
              }}
            >
              <label htmlFor="weight">Weight:</label>
              <Field
                type="text"
                id="weight"
                name="weight"
                placeholder="Enter Weight"
                className="text-input"
                style={{
                  width: '200%',
                  backgroundColor: 'black',
                  border: '1px solid #6c63ff',
                }}
              />
              <ErrorMessage
                name="weight"
                component="div"
                className="error-message"
              />
            </div>
            <div
              className="form-row"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '93px',
              }}
            >
              <label htmlFor="gender">Gender:</label>
              <Field
                as="select"
                id="gender"
                placeholder="Enter Gender"
                name="gender"
                className="text-input"
                style={{
                  width: '200%',
                  backgroundColor: 'black',
                  border: '1px solid #6c63ff',
                }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          <Button
            variant="primary"
            onClick={handleShowModal}
            style={{
              backgroundColor: '#6c63ff',
              marginTop: '1rem',
            }}
          >
            Add Disease
          </Button>
          <button
            type="submit"
            className="button"
            style={{
              backgroundColor: '#6c63ff',
              margin: '11% 0% 0% 1%',
              height: '6vh',
              borderRadius: '10px',
              width: '100%',
            }}
          >
            Submit
          </button>
        </Form>
      </Formik>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        style={{ color: '6c63ff' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Disease</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{ diseaseName: '', start_date: '', remarks: '' }}
          validationSchema={Yup.object({
            diseaseName: Yup.string().required('Disease name is required'),
            start_date: Yup.date().required('Start date is required'),
            remarks: Yup.string().required('Remarks are required'),
          })}
          onSubmit={(values, { resetForm }) => {
            addDiseaseSection(values);
            resetForm();
          }}
        >
          <Form>
            <div className="modal-form-row">
              <label htmlFor="name" style={{ margin: '0% 0% 0% 5%' }}>
                Disease:
              </label>
              <Field
                type="text"
                id="name"
                name="diseaseName"
                className="text-input"
                placeholder="Enter Disease Name"
                style={{ border: '1px solid #6c63ff', margin: '10%' }}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>
            <div className="modal-form-row">
              <label htmlFor="start_date" style={{ margin: '0% 0% 0% 5%' }}>
                Start Date:
              </label>
              <Field
                type="date"
                id="start_date"
                name="start_date"
                className="text-input"
                placeholder="Enter Disease Start Date"
                style={{ border: '1px solid #6c63ff', margin: '6%' }}
              />
              <ErrorMessage
                name="start_date"
                component="div"
                className="error-message"
              />
            </div>
            <div className="modal-form-row">
              <label htmlFor="remarks" style={{ margin: '0% 0% 0% 5%' }}>
                Remarks:
              </label>
              <Field
                type="text"
                id="remarks"
                name="remarks"
                className="text-input"
                placeholder="Enter Remarks"
                style={{ border: '1px solid #6c63ff', margin: '8%' }}
              />
              <ErrorMessage
                name="remarks"
                component="div"
                className="error-message"
              />
            </div>
            <div className="modal-form-row">
              <button
                type="submit"
                className="submit-button"
                style={{ width: '30%', margin: '0% 0% 0% 35%' }}
              >
                Add
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default MedicalInfoForm;
