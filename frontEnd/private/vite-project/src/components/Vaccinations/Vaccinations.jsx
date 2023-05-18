import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import './Vaccinations.css';
import Web3 from 'web3';
import wrappedTokenWithdraw from '../../../blockChain/wrappedTokenWithdraw';
import { useDispatch, useSelector } from 'react-redux';
import { loaderFalse, loaderTrue } from '../../actions';

const FormContainer = styled.div`
  background-color: #222;
  padding: 20px;
  color: #6c63ff;
  padding-top: 10%;
  padding-bottom: 13%;
  padding-left: 30%;
`;

const FormField = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 60%;
  padding: 8px;
  background-color: black;
  border: 1px solid #6c63ff;
  border-radius: 10px;
  color: white;
  border: none;
  outline: none;
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
`;

const validationSchema = Yup.object({
  hospital: Yup.string()
    .required('Hospital name is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Special characters are not allowed'),
  vaccineName: Yup.string()
    .required('Vaccine name is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Special characters are not allowed'),
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is required'),
});

const VaccinationForm = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((e) => e.commonReducer);
  const walletisConnected = async () => {
    const web3 = new Web3(window.ethereum);
    const isConnected = await web3.eth.getAccounts();
    console.log('isConnected', isConnected);
  };
  useEffect(() => {
    walletisConnected();
  }, []);
  const formik = useFormik({
    initialValues: {
      hospital: '',
      vaccineName: '',
      date: '',
      time: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const netVer = await web3.eth.net.getId();
      localStorage.setItem('walletAddress', accounts[0]);
      const wrapper = await wrappedTokenWithdraw({
        web3,
        address: accounts[0],
        netVer,
      });

      console.log('wrappedTokenWithdraw', loader);
      // Handle form submission
    },
  });

  return (
    <FormContainer>
      {loader ? (
        <div className="overlay"></div>
      ) : (
        <div>
          <h2 style={{ color: 'white' }}>Vaccination Details</h2>
          <form onSubmit={formik.handleSubmit}>
            <FormField>
              <Label htmlFor="hospital" style={{ color: 'white' }}>
                Hospital:
              </Label>
              <Input
                type="text"
                id="hospital"
                name="hospital"
                placeholder="Enter Hospital"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hospital}
              />
              {formik.touched.hospital && formik.errors.hospital && (
                <ErrorMsg>{formik.errors.hospital}</ErrorMsg>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="vaccineName" style={{ color: 'white' }}>
                Vaccine Name:
              </Label>
              <Input
                type="text"
                id="vaccineName"
                name="vaccineName"
                placeholder="Enter VaccineName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.vaccineName}
              />
              {formik.touched.vaccineName && formik.errors.vaccineName && (
                <ErrorMsg>{formik.errors.vaccineName}</ErrorMsg>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="date" style={{ color: 'white' }}>
                Date:
              </Label>
              <Input
                type="date"
                id="date"
                name="date"
                placeholder="Enter Date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
              />
              {formik.touched.date && formik.errors.date && (
                <ErrorMsg>{formik.errors.date}</ErrorMsg>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="time" style={{ color: 'white' }}>
                Time:
              </Label>
              <Input
                type="time"
                id="time"
                name="time"
                placeholder="Enter Time"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.time}
              />
              {formik.touched.time && formik.errors.time && (
                <ErrorMsg>{formik.errors.time}</ErrorMsg>
              )}
            </FormField>

            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </FormContainer>
  );
};

export default VaccinationForm;
