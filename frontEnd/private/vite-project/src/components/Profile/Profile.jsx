import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ListingProfile from '../listingProfile/listingProfile';
import MedicalInfoForm from '../Medicalinfo/Medicalinfo';

const ProfileContainer = styled.div`
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align items at the top */
  height: 93vh;
  padding-top: 10%;
`;

const ProfileCard = styled.div`
  background-color: #6c63ff;
  padding: 78px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 514px; /* Adjust the width as needed */
  margin-right: 20px; /* Add margin to create space between the sections */
  padding-bottom: 1%;
`;

const MedicalInfoContainer = styled.div`
  background-color: #222;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #6c63ff;
  align-items: flex-start; /* Align items at the top */
  width: 600px; /* Adjust the width as needed */
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
  color: #6c63ff;
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
  const { profile } = useSelector((e) => e.functionReducer);
  const [randomQuote, setRandomQuote] = useState('');

  return (
    <>
      <div>
        <ProfileContainer>
          <ProfileCard>
            <ProfileImage
              src="https://scontent-sin6-3.xx.fbcdn.net/v/t39.30808-1/325188505_925445105136375_449028671237095168_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=c6021c&_nc_ohc=GLBi-cErjz0AX8OJQkw&_nc_ht=scontent-sin6-3.xx&oh=00_AfBdnbnMq548zyf2MQ57Pk3toP-9dgq6ZHnWONqdmjHfQA&oe=6469A856"
              alt="Profile Picture"
            />

            <ProfileName style={{ fontSize: '35px', margin: '0% 0% 4% 14%' }}>
              {profile?.name}
            </ProfileName>
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
                  margin: '0% 0% 0% 1%',
                  margin: '11% 0% 0% 0%',
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
                  margin: '0% 0% 0% 2%',
                  margin: '11% 0% 0% 2%',
                  height: '6vh',
                  borderRadius: '10px',
                  width: '50%',
                }}
              >
                <Link
                  to="/changePassword"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                  }}
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
        </ProfileContainer>
      </div>
      <div>
        <ListingProfile />
      </div>
    </>
  );
};

export default ViewProfilePage;
