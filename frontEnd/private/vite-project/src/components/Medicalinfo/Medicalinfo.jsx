import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
// import './Medicalinfo.css';

const MedicalInfoForm = () => {
  const [diseaseSections, setDiseaseSections] = useState([{}]);

  const addDiseaseSection = () => {
    setDiseaseSections([...diseaseSections, {}]);
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
        name: Yup.string().required('Disease name is required'),
        start_date: Yup.date().required('Start date is required'),
        remarks: Yup.string().required('Remarks are required'),
        status: Yup.string().required('Status is required'),
      })
    ),
  });

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
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

          <button
            type="submit"
            className="button"
            style={{
              backgroundColor: '#6c63ff',
              margin: '0% 0% 0% 1%',
              margin: '11% 0% 0% 0%',
              height: '6vh',
              borderRadius: '10px',
              width: '100%',
            }}
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default MedicalInfoForm;
