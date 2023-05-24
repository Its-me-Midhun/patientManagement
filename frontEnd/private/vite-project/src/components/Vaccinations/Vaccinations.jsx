import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import './Vaccinations.css';
import Web3 from 'web3';
import wrappedTokenWithdraw from '../../../blockChain/vaccinationCertificate';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVaccinationListingDropdown,
  loaderFalse,
  loaderTrue,
  setVaccination,
} from '../../actions';

const FormContainer = styled.div`
  background-color: #222;
  padding: 20px;
  color: #6c63ff;
  padding-top: 10%;
  padding-bottom: 20%;
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

const Select = styled.select`
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

const hospitals = ['Hospital 1', 'Hospital 2', 'Hospital 3']; // Example array of hospitals
const vaccines = ['Vaccine 1', 'Vaccine 2', 'Vaccine 3']; // Example array of vaccines
const diseases = ['Disease 1', 'Disease 2', 'Disease 3']; // Example array of diseases

const validationSchema = Yup.object({
  hospital: Yup.string()
    .required('Hospital name is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Special characters are not allowed'),
  vaccineName: Yup.string()
    .required('Vaccine name is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Special characters are not allowed'),
  disease: Yup.string().required('Disease is required'),
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is required'),
});

const VaccinationForm = () => {
  const { vaccinationDropdown } = useSelector((e) => e.functionReducer);
  const dispatch = useDispatch();
  const { loader } = useSelector((e) => e.commonReducer);
  const walletisConnected = async () => {
    const web3 = new Web3(window.ethereum);
    const isConnected = await web3.eth.getAccounts();
    console.log('isConnected', isConnected);
  };
  console.log('vaccinationDropdown', vaccinationDropdown);
  useEffect(() => {
    walletisConnected();
  }, []);

  useEffect(() => {
    dispatch(getVaccinationListingDropdown());
  }, []);
  const formik = useFormik({
    initialValues: {
      hospital: '',
      vaccineName: '',
      disease: '',
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

      const tokenAddress = '0x72d46adf628719E83c67D1a3b91743f382355308';

      const toWei = async (web3, amount, decimals) => {
        return await web3.utils.toWei(
          parseFloat(amount).toFixed(decimals).toString(),
          'ether'
        );
      };

      const getGasPrice = async (web3) => {
        const gasPrice = await web3.eth.getGasPrice();
        return web3.utils.toBN(gasPrice).add(web3.utils.toBN('20000000000'));
      };

      const AmountInWei = await toWei(web3, 0.001, 18);
      const GetGasPricesss = await getGasPrice(web3);

      const result = await web3.eth.sendTransaction({
        from: accounts[0],
        to: tokenAddress,
        value: AmountInWei,
        GetGasPricesss,
      });

      if (result) {
        const finalValues = {
          ...values,
          transactionHash: result.transactionHash,
        };
        dispatch(setVaccination(finalValues));
      } else {
        console.log('error');
      }
    },
  });

  const DiseaseMap = vaccinationDropdown?.dataDisease?.map((data, index) => (
    <option value={data._id} key={index}>
      {data.diseaseName}
    </option>
  ));

  const hospitalMap = vaccinationDropdown?.dataHospital?.map((data, index) => (
    <option value={data._id} key={index}>
      {data.hospitalName}
    </option>
  ));

  const VaccineMap = vaccinationDropdown?.dataVaccine?.map((data, index) => (
    <option value={data._id} key={index}>
      {data.name}
    </option>
  ));
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
              <Select
                id="hospital"
                name="hospital"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hospital}
              >
                <option value="">Select Hospital</option>
                {hospitalMap}
              </Select>
              {formik.touched.hospital && formik.errors.hospital && (
                <ErrorMsg>{formik.errors.hospital}</ErrorMsg>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="vaccineName" style={{ color: 'white' }}>
                Vaccine Name:
              </Label>
              <Select
                id="vaccineName"
                name="vaccineName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.vaccineName}
              >
                <option value="">Select Vaccine</option>
                {VaccineMap}
              </Select>
              {formik.touched.vaccineName && formik.errors.vaccineName && (
                <ErrorMsg>{formik.errors.vaccineName}</ErrorMsg>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="disease" style={{ color: 'white' }}>
                Disease:
              </Label>
              <Select
                id="disease"
                name="disease"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.disease}
              >
                <option value="">Select Disease</option>
                {DiseaseMap}
              </Select>
              {formik.touched.disease && formik.errors.disease && (
                <ErrorMsg>{formik.errors.disease}</ErrorMsg>
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
              <Label htmlFor="date" style={{ color: 'white' }}>
                Date:
              </Label>
              <Select
                id="time"
                name="time"
                className="text-input"
                placeholder="Enter Date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.time}
              >
                <option value="">Select Time</option>
                <option value="9:00am-10:00am">9:00am - 10:00am</option>
                <option value="10:00am-11:00am">10:00am - 11:00am</option>
                <option value="11:00am-12:00pm">11:00am - 12:00pm</option>
                <option value="12:00pm-1:00pm">12:00pm - 1:00pm</option>
                <option value="2:00pm-3:00pm">2:00pm - 3:00pm</option>
                <option value="3:00pm-4:00pm">3:00pm - 4:00pm</option>
                <option value="4:00pm-5:00pm">4:00pm - 5:00pm</option>
              </Select>
              {formik.touched.time && formik.errors.time && (
                <ErrorMsg>{formik.errors.time}</ErrorMsg>
              )}
            </FormField>

            <button
              className="submit-button"
              type="submit"
              style={{ width: '60%' }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </FormContainer>
  );
};

export default VaccinationForm;
