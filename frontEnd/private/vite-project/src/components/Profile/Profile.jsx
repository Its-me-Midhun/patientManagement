import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  background-color: #222;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ProfileCard = styled.div`
  background-color: #6c63ff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
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

const QuoteContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #6c63ff;
`;

const quotes = [
  'Health is wealth.',
  'The greatest wealth is health.',
  'Take care of your body. It’s the only place you have to live.',
  'A healthy outside starts from the inside.',
  'Happiness is the highest form of health.',
  'An ounce of prevention is worth a pound of cure.',
];

const ViewProfilePage = () => {
  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    generateRandomQuote();
    const quoteInterval = setInterval(generateRandomQuote, 5000);

    return () => clearInterval(quoteInterval);
  }, []);

  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileImage
          src="https://scontent-sin6-3.xx.fbcdn.net/v/t39.30808-1/325188505_925445105136375_449028671237095168_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=c6021c&_nc_ohc=GLBi-cErjz0AX8OJQkw&_nc_ht=scontent-sin6-3.xx&oh=00_AfBdnbnMq548zyf2MQ57Pk3toP-9dgq6ZHnWONqdmjHfQA&oe=6469A856"
          alt="Profile Picture"
        />
        <h4>
          <Link to="/changePassword">Change Password</Link>
        </h4>
        <ProfileName style={{ fontSize: '35px' }}>John Doe</ProfileName>
        <ProfileDetails>
          <Label>Email:</Label>
          <Value>john.doe@example.com</Value>
        </ProfileDetails>
        <ProfileDetails>
          <Label>Phone:</Label>
          <Value>+1 123 456 7890</Value>
        </ProfileDetails>
        <ProfileDetails>
          <Label>Location:</Label>
          <Value>New York City</Value>
        </ProfileDetails>
        <ProfileBio>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla gravida
          dui et sapien dapibus, sit amet vestibulum turpis pharetra. Nulla
          facilisi. Fusce iaculis justo ac vehicula vestibulum.
        </ProfileBio>
        {/* <QuoteContainer>
          <p style={{ color: 'white' }}>{randomQuote}</p>
        </QuoteContainer> */}
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ViewProfilePage;
