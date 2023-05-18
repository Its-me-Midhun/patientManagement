import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { islogin } from '../../actions';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      // Simulate login request
      dispatch(islogin(values));
      console.log(values);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      {/* <div className="login-image">
        <img src={loginImage} alt="Login" />
      </div> */}
      <div className="login-form">
        <img
          src="../../../images/DoctorSign.png"
          alt="Login"
          style={{ width: '40%', margin: '-8% 0% 0% 0%' }}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form className="formHead" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input-field"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input-field"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              <h5 style={{ color: 'white' }}>
                New User? <Link to="/signUp">Sign Up</Link>
              </h5>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
