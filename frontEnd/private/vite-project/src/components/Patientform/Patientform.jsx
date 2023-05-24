import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Patientform.css';

const PatientForm = () => {
  const initialValues = {
    patientName: '',
    patientUUID: '',
    patientRegId: '',
    doctorName: '',
    consultationTime: '',
    departmentName: '',
    hospitalName: '',
    issuerName: '',
    issuerId: '',
    issuedDateTime: '',
  };

  const validationSchema = Yup.object({
    patientName: Yup.string().required('Patient Name is required'),
    patientUUID: Yup.string().required('Patient UUID is required'),
    patientRegId: Yup.string().required('Patient Registration ID is required'),
    doctorName: Yup.string().required('Doctor Name is required'),
    consultationTime: Yup.string().required('Consultation Time is required'),
    departmentName: Yup.string().required('Department Name is required'),
    hospitalName: Yup.string().required('Hospital Name is required'),
    issuerName: Yup.string().required('Issuer Name is required'),
    issuerId: Yup.string().required('Issuer ID is required'),
    issuedDateTime: Yup.string().required('Issued Date and Time is required'),
  });

  const onSubmit = (values) => {
    console.log(values);
    // Perform submission logic here
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div
      className="patient-form"
      style={{ backgroundColor: 'black', color: '#6c63ff' }}
    >
      <h2 className="form-title">Patient Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-row">
          <label htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            className="text-input"
            {...formik.getFieldProps('patientName')}
          />
          {formik.touched.patientName && formik.errors.patientName && (
            <div className="error-message">{formik.errors.patientName}</div>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="patientUUID">Patient UUID:</label>
          <input
            type="text"
            id="patientUUID"
            name="patientUUID"
            className="text-input"
            {...formik.getFieldProps('patientUUID')}
          />
          {formik.touched.patientUUID && formik.errors.patientUUID && (
            <div className="error-message">{formik.errors.patientUUID}</div>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="patientRegId">Patient Registration ID:</label>
          <input
            type="text"
            id="patientRegId"
            name="patientRegId"
            className="text-input"
            {...formik.getFieldProps('patientRegId')}
          />
          {formik.touched.patientRegId && formik.errors.patientRegId && (
            <div className="error-message">{formik.errors.patientRegId}</div>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="doctorName">Doctor Name:</label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            className="text-input"
            {...formik.getFieldProps('doctorName')}
          />
          {formik.touched.doctorName && formik.errors.doctorName && (
            <div className="error-message">{formik.errors.doctorName}</div>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="consultationTime">Consultation Time:</label>
          <input
            type="text"
            id="consultationTime"
            name="consultationTime"
            className="text-input"
            {...formik.getFieldProps('consultationTime')}
          />
          {formik.touched.consultationTime &&
            formik.errors.consultationTime && (
              <div className="error-message">
                {formik.errors.consultationTime}
              </div>
            )}
        </div>
        <div className="form-row">
          <label htmlFor="departmentName">Department Name:</label>
          <input
            type="text"
            id="departmentName"
            name="departmentName"
            className="text-input"
            {...formik.getFieldProps('departmentName')}
          />
          {formik.touched.departmentName && formik.errors.departmentName && (
            <div className="error-message">{formik.errors.departmentName}</div>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="hospitalName">Hospital Name:</label>
          <input
            type="text"
            id="hospitalName"
            name="hospitalName"
            className="text-input"
            {...formik.getFieldProps('hospitalName')}
          />
          {formik.touched.hospitalName && formik.errors.hospitalName && (
            <div className="error-message">{formik.errors.hospitalName}</div>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="issuerName">Issuer Name:</label>
          <input
            type="text"
            id="issuerName"
            name="issuerName"
            className="text-input"
            {...formik.getFieldProps('issuerName')}
          />
          {formik.touched.issuerName && formik.errors.issuerName && (
            <div className="error-message">{formik.errors.issuerName}</div>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="issuerId">Issuer ID:</label>
          <input
            type="text"
            id="issuerId"
            name="issuerId"
            className="text-input"
            {...formik.getFieldProps('issuerId')}
          />
          {formik.touched.issuerId && formik.errors.issuerId && (
            <div className="error-message">{formik.errors.issuerId}</div>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="issuedDateTime">Issued Date and Time:</label>
          <input
            type="text"
            id="issuedDateTime"
            name="issuedDateTime"
            className="text-input"
            {...formik.getFieldProps('issuedDateTime')}
          />
          {formik.touched.issuedDateTime && formik.errors.issuedDateTime && (
            <div className="error-message">{formik.errors.issuedDateTime}</div>
          )}
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
