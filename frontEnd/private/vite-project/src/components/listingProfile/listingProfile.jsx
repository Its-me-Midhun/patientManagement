import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #222;
  color: #f5f5fb;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 20px;
`;

const SectionContainer = styled.div`
  border: 1px solid #6c63ff;
  padding: 20px;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #6c63ff;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const ItemContainer = styled.div`
  margin-bottom: 10px;
  border: 1px solid #6c63ff;
  padding: 20px;
  border-radius: 20px;
`;
const ProgressBarContainer = styled.div`
  background-color: #444;
  height: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden; /* Added overflow: hidden to hide overflowing progress */
`;
const ProgressBarFill = styled.div`
  background-color: #6c63ff;
  height: 100%;
  width: ${(props) => props.progress}%;
`;

const ListingProfile = () => {
  const consultations = [
    {
      hospital: 'Hospital 1',
      department: 'Cardiology',
      doctor: 'Dr. Smith',
      time: '9:00 AM',
    },
    {
      hospital: 'Hospital 2',
      department: 'Dermatology',
      doctor: 'Dr. Johnson',
      time: '10:30 AM',
    },
    {
      hospital: 'Hospital 3',
      department: 'Orthopedics',
      doctor: 'Dr. Williams',
      time: '11:45 AM',
    },
  ];

  const vaccinations = [
    {
      vaccine: 'Vaccine 1',
      hospital: 'Hospital 4',
      vaccinatedDate: '2023-05-19',
    },
    {
      vaccine: 'Vaccine 2',
      hospital: 'Hospital 5',
      vaccinatedDate: '2023-05-20',
    },
    {
      vaccine: 'Vaccine 3',
      hospital: 'Hospital 6',
      vaccinatedDate: '2023-05-21',
    },
  ];

  const totalConsultations = 8;
  const totalVaccinations = 5;
  const consultationProgress = (totalConsultations / 20) * 100;
  const vaccinationProgress = (totalVaccinations / 10) * 100;

  return (
    <Container>
      <SectionContainer>
        <SectionTitleContainer>
          <SectionTitle>Consultation Listing</SectionTitle>
          <button className="submit-button" style={{ width: '30%' }}>
            <Link
              to="/consultations"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Book&nbsp;Consultation
            </Link>
          </button>
        </SectionTitleContainer>
        {consultations.map((consultation, index) => (
          <ItemContainer key={index}>
            <strong>Hospital:</strong> {consultation.hospital}
            <br />
            <strong>Department:</strong> {consultation.department}
            <br />
            <strong>Doctor:</strong> {consultation.doctor}
            <br />
            <strong>Time:</strong> {consultation.time}
          </ItemContainer>
        ))}
      </SectionContainer>

      <SectionContainer>
        <SectionTitleContainer>
          <SectionTitle>Vaccination Listing</SectionTitle>
          <button className="submit-button" style={{ width: '30%' }}>
            <Link
              to="/vaccine"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Book&nbsp;Vaccination
            </Link>
          </button>
        </SectionTitleContainer>

        {vaccinations.map((vaccination, index) => (
          <ItemContainer key={index}>
            <strong>Vaccine:</strong> {vaccination.vaccine}
            <br />
            <strong>Hospital:</strong> {vaccination.hospital}
            <br />
            <strong>Vaccinated Date:</strong> {vaccination.vaccinatedDate}
          </ItemContainer>
        ))}
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Progress</SectionTitle>
        <div>
          <ProgressBarContainer>
            <ProgressBarFill progress={consultationProgress} />
          </ProgressBarContainer>
          <div>
            <strong>Total Consultations:</strong> {totalConsultations}
          </div>
          <ProgressBarContainer>
            <ProgressBarFill progress={vaccinationProgress} />
          </ProgressBarContainer>
          <div>
            <strong>Total Vaccinations:</strong> {totalVaccinations}
          </div>
        </div>
      </SectionContainer>
    </Container>
  );
};

export default ListingProfile;
