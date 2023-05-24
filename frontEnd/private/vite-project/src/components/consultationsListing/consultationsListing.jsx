import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllConsultations,
  getPatientByID,
  setconsultationCertificate,
} from '../../actions';
import './consultationsListing.css';
import Web3 from 'web3';
import wrappedTokenDeposit from '../../../blockChain/consultationCertificate';

const ConsultationsPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { allconsultations, consultationsById, success, consultationDataById } =
    useSelector((state) => state.functionReducer);
  console.log(
    'consultationsById',
    allconsultations,
    consultationsById,
    success,
    consultationDataById
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setData(allconsultations);
    setFilteredData(allconsultations);
  }, [allconsultations]);

  useEffect(() => {
    dispatch(getAllConsultations());
  }, []);

  const handleFilter = (field, value) => {
    const filteredData = data.filter((item) => {
      // Check if doctor_details and hospital_details arrays exist
      if (
        item.doctor_details &&
        item.doctor_details.length > 0 &&
        item.hospital_details &&
        item.hospital_details.length > 0
      ) {
        // Check if any doctor or hospital name matches the filter value
        const matchingDoctors = item.doctor_details.filter((doctor) =>
          doctor.doctorName.toLowerCase().includes(value.toLowerCase())
        );
        const matchingHospitals = item.hospital_details.filter((hospital) =>
          hospital.hospitalName.toLowerCase().includes(value.toLowerCase())
        );
        return matchingDoctors.length > 0 || matchingHospitals.length > 0;
      }
      return false;
    });

    setFilteredData(filteredData);
  };

  const handleResetFilters = () => {
    setFilteredData(data);
  };

  const handleAction = async (row) => {
    // Perform action for the selected row
    console.log('Selected Row:', row);
    dispatch(getPatientByID(row));
    if (success) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const netVer = await web3.eth.net.getId();
      localStorage.setItem('walletAddress', accounts[0]);

      const certificationValues = {
        patientName: consultationsById?.SignUp?.name,
        patientUUID: JSON.stringify(consultationsById?.SignUp?.aadharNo),
        patientRegId: consultationsById?.SignUp?.loginId,
        doctorName:
          consultationsById?.consultationById[0]?.doctor_details[0]?.doctorName,
        consultationTime: consultationsById?.consultationById[0]?.time,
        departmentName:
          consultationsById?.consultationById[0]?.department_details[0]
            ?.departmentName,
        hospitalName:
          consultationsById?.consultationById[0]?.hospital_details[0]
            ?.hospitalName,
        issuerName:
          consultationsById?.consultationById[0]?.hospital_details[0]
            ?.hospitalName,
        issuerId:
          consultationsById?.consultationById[0]?.hospital_details[0]
            ?.hospitalId,
        issuedDateTime: Math.floor(new Date().getTime() / 1000.0),
      };
      console.log('certificationValuesMainPage', certificationValues);
      const wrapper = await wrappedTokenDeposit({
        web3,
        address: accounts[0],
        netVer,
        certificationValues,
      });
      console.log('wrapper', wrapper);
      dispatch(setconsultationCertificate(wrapper));
    }
  };

  return (
    <div className="custom-data-table">
      <div className="filters">
        <input
          type="text"
          placeholder="Search Doctor"
          onChange={(e) => handleFilter('doctor_details', e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Hospital"
          onChange={(e) => handleFilter('hospital_details', e.target.value)}
        />
        <button onClick={handleResetFilters}>Reset Filters</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Time</th>
            <th>Date</th>
            <th>Doctor</th>
            <th>Hospital</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row._id}>
              <td>{row.Login_details[0].email}</td>
              <td>{row.time}</td>
              <td>{row.date}</td>
              <td>{row.doctor_details[0]?.doctorName}</td>
              <td>{row.hospital_details[0]?.hospitalName}</td>
              <td>{row.Status}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleAction(row.loginId)}
                >
                  {consultationsById?.Login?._id !== row?.loginId
                    ? 'Initiate Certificate generation'
                    : ' Generate Cerfificate'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultationsPage;
