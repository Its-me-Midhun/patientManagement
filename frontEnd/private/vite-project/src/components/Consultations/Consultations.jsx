import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Consultations.css';
import Web3 from 'web3';
import wrappedTokenDeposit from '../../../blockChain/wrappedTokenDeposit';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDepartmentHospitalDoctor,
  setConsultationData,
} from '../../actions';
import { useNavigate } from 'react-router-dom';

const ConsultationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDepartmentHospitalDoctor());
  }, []);
  const { dropdownDataConsultations } = useSelector((e) => e.functionReducer);
  const initialValues = {
    hospital: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
  };

  console.log('dropdownDataConsultations', dropdownDataConsultations);
  const departmentMap = dropdownDataConsultations?.dataDepartment?.map(
    (data, index) => {
      return (
        <option value={data.departmentName} key={index}>
          {data.departmentName}
        </option>
      );
    }
  );

  const doctorMap = dropdownDataConsultations?.dataDoctor?.map(
    (data, index) => {
      return (
        <option value={data.doctorName} key={index}>
          {data.doctorName}
        </option>
      );
    }
  );

  const hospitalMap = dropdownDataConsultations?.dataHospital?.map(
    (data, index) => {
      return (
        <option value={data.hospitalName} key={index}>
          {data.hospitalName}
        </option>
      );
    }
  );

  const validationSchema = Yup.object({
    hospital: Yup.string().required('Hospital Name is required'),
    department: Yup.string().required('Department is required'),
    doctor: Yup.string().required('Doctor is required'),
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
  });

  const onSubmit = async (values) => {
    console.log(values);
    // dispatch(setConsultationData(values, navigate));
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const netVer = await web3.eth.net.getId();
    localStorage.setItem('walletAddress', accounts[0]);
    const wrapper = await wrappedTokenDeposit({
      web3,
      address: accounts[0],
      netVer,
    });

    console.log('wrappedTokenWithdraw', loader);
    // Perform submission logic here
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="consultation-form" style={{ color: '#6c63ff' }}>
      <h2 className="form-title" style={{ color: 'white' }}>
        Consultation Form
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-row">
          <label htmlFor="hospital" style={{ color: 'white' }}>
            Hospital Name:
          </label>
          <select
            id="hospital"
            name="hospital"
            className="text-input"
            {...formik.getFieldProps('hospital')}
          >
            <option value="">Select Hospital</option>
            {hospitalMap}
          </select>
          {formik.touched.hospital && formik.errors.hospital && (
            <div className="error-message">{formik.errors.hospital}</div>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="department" style={{ color: 'white' }}>
            Department:
          </label>
          <select
            id="department"
            name="department"
            className="text-input"
            {...formik.getFieldProps('department')}
          >
            <option value="">Select Department</option>
            {departmentMap}
          </select>
          {formik.touched.department && formik.errors.department && (
            <div className="error-message">{formik.errors.department}</div>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="doctor" style={{ color: 'white' }}>
            Doctor:
          </label>
          <select
            id="doctor"
            name="doctor"
            className="text-input"
            {...formik.getFieldProps('doctor')}
          >
            <option value="">Select Doctor</option>
            {doctorMap}
          </select>
          {formik.touched.doctor && formik.errors.doctor && (
            <div className="error-message">{formik.errors.doctor}</div>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="date" style={{ color: 'white' }}>
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="text-input"
            {...formik.getFieldProps('date')}
          />
          {formik.touched.date && formik.errors.date && (
            <div className="error-message">{formik.errors.date}</div>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="time" style={{ color: 'white' }}>
            Time:
          </label>
          <select
            id="time"
            name="time"
            className="text-input"
            {...formik.getFieldProps('time')}
          >
            <option value="">Select Time</option>
            <option value="9:00am-10:00am">9:00am - 10:00am</option>
            <option value="10:00am-11:00am">10:00am - 11:00am</option>
            <option value="11:00am-12:00pm">11:00am - 12:00pm</option>
            <option value="12:00pm-1:00pm">12:00pm - 1:00pm</option>
            <option value="2:00pm-3:00pm">2:00pm - 3:00pm</option>
            <option value="3:00pm-4:00pm">3:00pm - 4:00pm</option>
            <option value="4:00pm-5:00pm">4:00pm - 5:00pm</option>
          </select>
          {formik.touched.time && formik.errors.time && (
            <div className="error-message">{formik.errors.time}</div>
          )}
        </div>
        <button type="submit" className="submit-button">
          Pay
        </button>
      </form>
    </div>
  );
};

export default ConsultationForm;
