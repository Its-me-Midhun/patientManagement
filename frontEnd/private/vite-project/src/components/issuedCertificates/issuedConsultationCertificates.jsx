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
  getIssuedConsultationCertificates
} from '../../actions';


const IssuedConsultationCertificatePage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { issuedConsultationCertificate } = useSelector(
    (state) => state.functionReducer
  );
  console.log('issuedConsultationCertificate', issuedConsultationCertificate);
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getIssuedConsultationCertificates())
  },[])
  useEffect(() => {
    setData(issuedConsultationCertificate);
    setFilteredData(issuedConsultationCertificate);
  }, [issuedConsultationCertificate]);

  useEffect(() => {
    dispatch(getAllVaccinations());
  }, []);

  const handleFilter = (field, value) => {
    const filteredData = data.filter((item) => {
      if (field === 'doctorName') {
        return (
          item.doctorName &&
          item.doctorName.toLowerCase().includes(value.toLowerCase())
        );
      }
      if (field === 'hospitalName') {
        return (
          item.hospitalName &&
          item.hospitalName.toLowerCase().includes(value.toLowerCase())
        );
      }
      return true;
    });

    setFilteredData(filteredData);
  };

  const handleResetFilters = () => {
    setFilteredData(data);
  };



  return (
    <div className="custom-data-table">
      <div className="filters">
        <input
          type="text"
          placeholder="Search Doctor"
          onChange={(e) => handleFilter('doctorName', e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Hospital"
          onChange={(e) => handleFilter('hospitalName', e.target.value)}
        />
        <button onClick={handleResetFilters}>Reset Filters</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Patient Registration ID</th>
            <th>Doctor Name</th>
            <th>Consultation Time</th>
            <th>Department</th>
            <th>Hospital</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row._id}>
              <td>{row?.patientName}</td>
              <td>{row?.patientRegId}</td>
              <td>{row?.doctorName}</td>
              <td>{row?.consultationTime}</td>
              <td>{row?.departmentName}</td>
              <td>{row?.hospitalName}</td>
              <td>{row?.Status}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuedConsultationCertificatePage;
