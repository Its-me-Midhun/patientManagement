import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getConsultationsWithLogin } from '../../actions';
import ListingProfile from '../listingProfile/listingProfile';
import MedicalInfoForm from '../Medicalinfo/Medicalinfo';

const ProfileContainer = styled.div`
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 93vh;
  padding-top: 10%;
`;

const SectionContainer = styled.div`
  border: 1px solid #6c63ff;
  padding: 80px;
  margin-left: 1%;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  width: 27%;

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

const ProgressBarContainer = styled.div`
  background-color: #444;
  height: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
`;
const ProgressBarFill = styled.div`
  background-color: #6c63ff;
  height: 100%;
  width: ${(props) => props.progress}%;
`;

const ProfileCard = styled.div`
  background-color: #6c63ff;
  padding: 78px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 514px;
  margin-right: 20px;
  padding-bottom: 1%;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const MedicalInfoContainer = styled.div`
  background-color: #222;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #6c63ff;
  align-items: flex-start;
  width: 600px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  margin: -30% 0% 0% 26%;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  color: white;
`;

const Label = styled.span`
  font-weight: bold;
  color: white;
`;

const Value = styled.span`
  margin-left: 5px;
  color: white;
`;

const ProfileBio = styled.p`
  margin-bottom: 20px;
  color: white;
`;

const ViewProfilePage = () => {
  const { profile } = useSelector((state) => state.functionReducer);
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
    <>
      <div>
        <ProfileContainer>
          <ProfileCard>
            <ProfileImage
              src="https://scontent-sin6-3.xx.fbcdn.net/v/t39.30808-1/325188505_925445105136375_449028671237095168_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=c6021c&_nc_ohc=GLBi-cErjz0AX8OJQkw&_nc_ht=scontent-sin6-3.xx&oh=00_AfBdnbnMq548zyf2MQ57Pk3toP-9dgq6ZHnWONqdmjHfQA&oe=6469A856"
              alt="Profile Picture"
            />

            <ProfileName>{profile?.name}</ProfileName>
            <ProfileDetails>
              <Label>Email:</Label>
              <Value>{profile?.loginId?.email}</Value>
            </ProfileDetails>
            <ProfileDetails>
              <Label>Address:</Label>
              <Value>{profile?.address}</Value>
            </ProfileDetails>
            <ProfileBio>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed
              ligula sed nunc accumsan eleifend in ut ex. Nullam in massa sit
              amet dolor eleifend lobortis. Integer efficitur lacus vitae
              condimentum consectetur. Aliquam blandit risus ut sapien rhoncus
              aliquet.
            </ProfileBio>
            <div style={{ display: 'flex' }}>
              <button
                className="button"
                style={{
                  backgroundColor: 'black',
                  margin: '16% 0% 0% 1%',
                  height: '6vh',
                  borderRadius: '10px',
                  width: '50%',
                }}
              >
                <Link
                  to="/edit-profile"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Edit Profile
                </Link>
              </button>
              <button
                className="button"
                style={{
                  backgroundColor: 'black',
                  margin: '16% 0% 0% 2%',
                  height: '6vh',
                  borderRadius: '10px',
                  width: '50%',
                }}
              >
                <Link
                  to="/changePassword"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Change Password
                </Link>
              </button>
            </div>
          </ProfileCard>
          <MedicalInfoContainer>
            <h3 style={{ color: 'white' }}>Medical Information</h3>
            <MedicalInfoForm />
          </MedicalInfoContainer>
          <SectionContainer>
            <SectionTitle>Progress</SectionTitle>
            <div>
              <ProgressBarContainer>
                <ProgressBarFill progress={consultationProgress} />
              </ProgressBarContainer>
              <div>
                <strong style={{ color: 'white' }}>Total Consultations:</strong>
                <span style={{ color: 'white' }}>{totalConsultations}</span>
              </div>
              <ProgressBarContainer>
                <ProgressBarFill progress={vaccinationProgress} />
              </ProgressBarContainer>
              <div>
                <strong style={{ color: 'white' }}>Total Vaccinations:</strong>{' '}
                <span style={{ color: 'white' }}>{totalVaccinations}</span>
              </div>
            </div>
          </SectionContainer>
        </ProfileContainer>
      </div>
      <div>
        <ListingProfile />
      </div>
    </>
  );
};

export default ViewProfilePage;
