import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import vaccineVerification from '../../../blockChain/vaccineVerification';
import ContactForm from '../ContactUs/Contactus';
import Services from '../Services/Services';
import Testimonials from '../Testimonials/Testimonials';
import Web3 from 'web3';
import Modal from 'react-modal';

import './Home.css';
import { Link } from 'react-router-dom';
import consultationVerification from '../../../blockChain/consultationVerification';

const HomePage = () => {
  const dispatch = useDispatch();

  const [wordIndex, setWordIndex] = useState(0);
  const [vaccinationCode, setVaccinationCode] = useState('');
  const [consultationCode, setConsultationCode] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [ConsultationCertificateDetails, setConsultationCertificateDetails] =
    useState(null);

  const [CertificateNotFound, setCertificateNotFound] = useState(false);
  const [ConsultationCertificateNotFound, setConsultationCertificateNotFound] =
    useState(false);

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '30%',
      margin: '5% 0% 0% 36%',
    },
    content: {
      backgroundColor: 'black',
      color: 'white',
      padding: '14%',
    },
  };

  const words = ['Compassionate', 'Innovative', 'Dedicated'];
  const quotes = [
    'Health is a state of body. Wellness is a state of being.',
    'The best way to find yourself is to lose yourself in the service of others.',
    'If you want to lift yourself up, lift up someone else.',
    'I believe health care is a civil right.',
  ];
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const handleVaccinationVerification = async () => {
    console.log('vaccinationCode', vaccinationCode);
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const netVer = await web3.eth.net.getId();
    const wrapper = await vaccineVerification({
      web3,
      address: accounts[0],
      netVer,
      vaccinationCode,
    });
    console.log('wrappersdgfgfghjfghgdhfb', wrapper);
    if (wrapper.antigen.length === 0) {
      setCertificateNotFound(true);
    } else {
      setCertificateNotFound(false);
    }
    setCertificateDetails(wrapper); // Update the certificate details state
    setModalIsOpen(true);

    // setCertificateNotFound(false);
  };

  const handleConsultationVerification = async () => {
    console.log('consultationCode', consultationCode);
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const netVer = await web3.eth.net.getId();
    const wrapper = await consultationVerification({
      web3,
      address: accounts[0],
      netVer,
      consultationCode,
    });
    console.log('wrappersdgfgfghjfghgdhfb', wrapper);
    if (wrapper.doctorName.length === 0) {
      setConsultationCertificateNotFound(true);
    } else {
      setConsultationCertificateNotFound(false);
    }
    setConsultationCertificateDetails(wrapper); // Update the certificate details state
    setModalIsOpen(true);
    // Handle consultation verification logic here
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  console.log('vaccinationCode.length ',vaccinationCode.length)
  return (
    <div className="home-page">
      <section className="quote-section">
        <div className="words-container">
          {words.map((word, index) => (
            <React.Fragment key={index}>
              <h1 className={`word ${index === wordIndex ? word : ''}`}>
                {word}
              </h1>
              {index !== words.length - 1 && <span className="dot">.</span>}
              <div></div>
            </React.Fragment>
          ))}
        </div>
        <div className="quote-container">
          <p className="quote">{quotes[currentQuoteIndex]}</p>
        </div>
      </section>

      <section className="services-section">
        <h1 style={{ color: 'white', fontSize: '7rem' }}>Our Services</h1>
        <Services />
      </section>
      <div className="verification-section">
        <h1 style={{ color: 'white', fontSize: '6rem' }}>
          Verification Section
        </h1>
        <div className="verification-field">
          <h1>Vaccination Verification</h1>
          <input
            type="text"
            value={vaccinationCode}
            style={{ width: '200%' }}
            onChange={(e) => setVaccinationCode(e.target.value)}
          />
          <button onClick={handleVaccinationVerification} disabled={vaccinationCode.length === 0 ? true : false}>
          {vaccinationCode.length === 0 ? 'Enter Certificate Number':'Verify Consultation'} 
          </button>
        </div>

        <div className="verification-field">
          <h1>Consultation Verification</h1>
          <input
            type="text"
            value={consultationCode}
            style={{ width: '200%' }}
            onChange={(e) => setConsultationCode(e.target.value)}
          />
          <button onClick={handleConsultationVerification} disabled={consultationCode.length === 0 ? true : false}>
          {consultationCode.length === 0 ? 'Enter Certificate Number':'Verify Vaccination'} 
            
          </button>
        </div>
      </div>
      <Testimonials />
      <ContactForm />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
      >
        <Link onClick={() => setModalIsOpen(false)}>
          <img
            src="https://img.icons8.com/office/50/close-window--v1.png"
            alt="close-window--v1"
          />
        </Link>

        {certificateDetails ? (
          <React.Fragment>
            <>
              {CertificateNotFound === false ? (
                <>
                  <h1>Vaccination Certificate Details</h1>
                  <p>
                    Certificate Number:{' '}
                    {certificateDetails
                      ? certificateDetails.certificateNumber
                      : ConsultationCertificateDetails
                      ? certificateDetails.certificateNumber.certificateNumber
                      : null}
                  </p>
                  <p>Patient Name: {certificateDetails.patientName}</p>
                  <p>Patient UUID: {certificateDetails.patientUUID}</p>
                  <p>
                    Patient Registration ID: {certificateDetails.patientRegId}
                  </p>
                  <p>Issuer Name: {certificateDetails.issuerName}</p>
                  <p>Issuer ID: {certificateDetails.issuerId}</p>
                  <p>Antigen: {certificateDetails.antigen}</p>
                  <p>Vaccine Name: {certificateDetails.vaccineName}</p>
                  <p>Disease: {certificateDetails.disease}</p>
                  <p>Issued Date & Time: {certificateDetails.issuedDateTime}</p>
                  <p>
                    Vaccine Taken Date & Time:{' '}
                    {certificateDetails.vaccineTakenDatetime}
                  </p>
                </>
              ) : (
                <h1>Invalid Certificate Number</h1>
              )}
            </>
          </React.Fragment>
        ) : ConsultationCertificateDetails ? (
          <React.Fragment>
            <>
              {ConsultationCertificateNotFound === false ? (
                <>
                  <h1>Vaccination Certificate Details</h1>
                  <p>
                    Certificate Number:
                    {ConsultationCertificateDetails.certificateNumber}
                  </p>
                  <p>
                    Patient Name: {ConsultationCertificateDetails.patientName}
                  </p>
                  <p>
                    Patient UUID: {ConsultationCertificateDetails.patientUUID}
                  </p>
                  <p>
                    Patient Registration ID:
                    {ConsultationCertificateDetails.patientRegId}
                  </p>
                  <p>
                    Issuer Name: {ConsultationCertificateDetails.issuerName}
                  </p>
                  <p>Issuer ID: {ConsultationCertificateDetails.issuerId}</p>
                  <p>Antigen: {ConsultationCertificateDetails.antigen}</p>
                  <p>
                    Vaccine Name: {ConsultationCertificateDetails.vaccineName}
                  </p>
                  <p>Disease: {ConsultationCertificateDetails.disease}</p>
                  <p>
                    Issued Date & Time:{' '}
                    {ConsultationCertificateDetails.issuedDateTime}
                  </p>
                  <p>
                    Vaccine Taken Date & Time:{' '}
                    {ConsultationCertificateDetails.vaccineTakenDatetime}
                  </p>
                </>
              ) : (
                <h1>Invalid Certificate Number</h1>
              )}
            </>
          </React.Fragment>
        ) : null}
      </Modal>
    </div>
  );
};

export default HomePage;
