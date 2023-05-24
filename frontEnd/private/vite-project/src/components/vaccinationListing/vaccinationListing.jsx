import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllConsultations,
  getAllVaccinations,
  getPatientByID,
  getVaccinationsByID,
  setconsultationCertificate,
  setvaccinationCertificate,
} from '../../actions';
import './vaccinationListing.css';
import Web3 from 'web3';
import wrappedTokenDeposit from '../../../blockChain/consultationCertificate';
import wrappedTokenWithdraw from '../../../blockChain/vaccinationCertificate';

const VaccinationsPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { allvaccinations, vaccinationDataById } = useSelector(
    (state) => state.functionReducer
  );
  console.log('vaccinationDataById', vaccinationDataById);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(allvaccinations);
    setFilteredData(allvaccinations);
  }, [allvaccinations]);

  useEffect(() => {
    dispatch(getAllVaccinations());
  }, []);

  const handleFilter = (field, value) => {
    const filteredData = data.filter((item) => {
      // Check if disease and hospital arrays exist
      if (
        item.disease &&
        item.disease.length > 0 &&
        item.hospital &&
        item.hospital.length > 0
      ) {
        // Check if any disease or hospital name matches the filter value
        const matchingDiseases = item.disease.filter((disease) =>
          disease.toLowerCase().includes(value.toLowerCase())
        );
        const matchingHospitals = item.hospital.filter((hospital) =>
          hospital.toLowerCase().includes(value.toLowerCase())
        );
        return matchingDiseases.length > 0 || matchingHospitals.length > 0;
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
    dispatch(getVaccinationsByID(row));

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const netVer = await web3.eth.net.getId();
    localStorage.setItem('walletAddress', accounts[0]);
    const certificationValues = {
      patientName: vaccinationDataById?.SignUp?.name,
      patientUUID: JSON.stringify(vaccinationDataById?.SignUp?.aadharNo),
      patientRegId: vaccinationDataById?.SignUp?.loginId,
      vaccineName:
        vaccinationDataById?.vaccinationById[0]?.vaccine_details[0]?.name,
      vaccineTakenDatetime: vaccinationDataById?.vaccinationById[0]?.time,
      disease:
        vaccinationDataById?.vaccinationById[0]?.disease_details[0]
          ?.diseaseName,
      antigen:
        vaccinationDataById?.vaccinationById[0]?.vaccine_details[0]?.antigen,
      issuerName:
        vaccinationDataById?.vaccinationById[0]?.hospital_details[0]
          ?.hospitalName,
      issuerId:
        vaccinationDataById?.vaccinationById[0]?.hospital_details[0]
          ?.hospitalId,
      issuedDateTime: Math.floor(new Date().getTime() / 1000.0),
    };
    console.log('VaccinecertificationValues', certificationValues);

    // Rest of the code...

    // Uncomment and customize the certificate generation logic according to your requirements

    // const certificationValues = {
    //   // Certification values...
    // };

    const wrapper = await wrappedTokenWithdraw({
      web3,
      address: accounts[0],
      netVer,
      certificationValues,
    });
    dispatch(setvaccinationCertificate(wrapper));
    console.log('wrapperVaccine', wrapper);
  };

  return (
    <div className="custom-data-table">
      <div className="filters">
        <input
          type="text"
          placeholder="Search Disease"
          onChange={(e) => handleFilter('disease', e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Hospital"
          onChange={(e) => handleFilter('hospital', e.target.value)}
        />
        <button onClick={handleResetFilters}>Reset Filters</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Time</th>
            <th>Date</th>
            <th>Disease</th>
            <th>Hospital</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row._id}>
              <td>{row?.Login_details[0]?.email}</td>
              <td>{row?.time}</td>
              <td>{row?.date}</td>
              <td>{row?.disease_details[0]?.diseaseName}</td>
              <td>{row?.hospital_details[0]?.hospitalName}</td>
              <td>{row.Status}</td>
              <td>
                <Button variant="danger" onClick={() => handleAction(row._id)}>
                  {vaccinationDataById?.vaccinationById?._id !== row?._id
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

export default VaccinationsPage;
