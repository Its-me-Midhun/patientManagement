import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../signUp/signUp.css';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { signUp } from '../../actions';

const SignupPage = () => {
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    aadharNo: Yup.string()
      .required('Aadhaar Number is required')
      .matches(/^[0-9]{12}$/, 'Aadhaar Number must be 12 digits'),
    dob: Yup.date().required('Date of Birth is required'),
    address: Yup.string().required('Address is required'),
    pinCode: Yup.string().required('Pincode is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    role: Yup.string().required('Role is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      aadharNo: '',
      dob: null,
      address: '',
      pinCode: '',
      country: '',
      state: '',
      role: 'patient',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signUp(values));
    },
  });

  const countries = [
    { code: 'IN', name: 'India' },
    { code: 'US', name: 'United States' },
    // Add more countries here
  ];

  const states = {
    IN: [
      { code: 'AP', name: 'Andhra Pradesh' },
      { code: 'KA', name: 'Karnataka' },
      // Add more states of India here
    ],
    US: [
      { code: 'CA', name: 'California' },
      { code: 'NY', name: 'New York' },
      // Add more states of the US here
    ],
    // Add more countries with their states here
  };

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    setSelectedCountry(selectedCountryCode);
    setSelectedState('');
    formik.setFieldValue('country', selectedCountryCode);
    formik.setFieldValue('state', '');
  };

  const handleStateChange = (e) => {
    const selectedStateCode = e.target.value;
    setSelectedState(selectedStateCode);
    formik.setFieldValue('state', selectedStateCode);
  };

  return (
    <div className="login-container">
      <h2 className="LoginHead">
        <span style={{ color: 'white', fontSize: '5rem' }}>Sign Up</span>
      </h2>
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <div className="formHead">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="input-field"
            value={formik.values.name}
            placeholder="Enter Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="formHead">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            value={formik.values.email}
            placeholder="Enter Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="formHead">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="input-field"
            value={formik.values.phoneNumber}
            placeholder="Enter Phone Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="error">{formik.errors.phoneNumber}</div>
          )}
        </div>
        <div className="formHead">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter password"
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div className="formHead">
          <label htmlFor="aadharNo">Aadhaar Number</label>
          <input
            type="text"
            id="aadharNo"
            name="aadharNo"
            className="input-field"
            value={formik.values.aadharNo}
            placeholder="Enter Aadhaar Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.aadharNo && formik.errors.aadharNo && (
            <div className="error">{formik.errors.aadharNo}</div>
          )}
        </div>
        <div className="formHead">
          <label htmlFor="dob">Date of Birth</label>
          <DatePicker
            id="dob"
            name="dob"
            className="input-field"
            selected={formik.values.dob}
            onChange={(date) => formik.setFieldValue('dob', date)}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dob && formik.errors.dob && (
            <div className="error">{formik.errors.dob}</div>
          )}
        </div>
        <div className="formHead">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            className="input-field"
            value={formik.values.address}
            placeholder="Enter Address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && (
            <div className="error">{formik.errors.address}</div>
          )}
        </div>
        <div className="formHead">
          <label htmlFor="pinCode">Pincode</label>
          <input
            type="text"
            id="pinCode"
            name="pinCode"
            className="input-field"
            value={formik.values.pinCode}
            placeholder="Enter Pincode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.pinCode && formik.errors.pinCode && (
            <div className="error">{formik.errors.pinCode}</div>
          )}
        </div>
        <div className="formHead">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            className="input-field"
            value={formik.values.country}
            onChange={handleCountryChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {formik.touched.country && formik.errors.country && (
            <div className="error">{formik.errors.country}</div>
          )}
        </div>
        <div className="formHead">
          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            className="input-field"
            value={formik.values.state}
            onChange={handleStateChange}
            onBlur={formik.handleBlur}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {selectedCountry &&
              states[selectedCountry]?.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
          </select>
          {formik.touched.state && formik.errors.state && (
            <div className="error">{formik.errors.state}</div>
          )}
        </div>
        <div className="formHead">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            className="input-field"
            defaultValue="patient"
            placeholder="Enter Role"
            disabled="true"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.role && formik.errors.role && (
            <div className="error">{formik.errors.role}</div>
          )}
        </div>
        <button
          type="submit"
          className="submit-button-signup"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Sign Up
        </button>
        <h5 style={{ color: 'white', margin: '3% 0% 0% 40%' }}>
          Existing User? <Link to="/login">Login</Link>
        </h5>
      </form>
    </div>
  );
};

export default SignupPage;
