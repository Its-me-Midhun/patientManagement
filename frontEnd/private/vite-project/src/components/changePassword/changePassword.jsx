import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../actions';

const PageContainer = styled.div`
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ChangePasswordCard = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #6c63ff;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #6c63ff;
  border-radius: 4px;
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
`;

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Please enter your old password'),
  newPassword: Yup.string()
    .required('Please enter a new password')
    .min(6, 'Password must be at least 6 characters long'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Please confirm your new password'),
});

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(changePassword(values));
      // Handle form submission and password change
    },
  });

  return (
    <PageContainer>
      <ChangePasswordCard>
        <h2>Change Password</h2>
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <Label htmlFor="oldPassword">Old Password:</Label>
            <Input
              type="password"
              id="oldPassword"
              name="oldPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.oldPassword}
            />
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <ErrorMsg>{formik.errors.oldPassword}</ErrorMsg>
            )}
          </FormField>

          <FormField>
            <Label htmlFor="newPassword">New Password:</Label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <ErrorMsg>{formik.errors.newPassword}</ErrorMsg>
            )}
          </FormField>

          <FormField>
            <Label htmlFor="confirmNewPassword">Confirm New Password:</Label>
            <Input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmNewPassword}
            />
            {formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword && (
                <ErrorMsg>{formik.errors.confirmNewPassword}</ErrorMsg>
              )}
          </FormField>

          <button type="submit">Change Password</button>
        </Form>
      </ChangePasswordCard>
    </PageContainer>
  );
};

export default ChangePasswordPage;
