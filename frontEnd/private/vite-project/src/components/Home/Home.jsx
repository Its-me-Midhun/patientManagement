import React, { useState, useEffect } from 'react';
import ContactForm from '../ContactUs/Contactus';
import Services from '../Services/Services';
import Testimonials from '../Testimonials/Testimonials';
import './Home.css';

const HomePage = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['Compassionate', 'Innovative', 'Dedicated'];
  const quotes = [
    'Health is a state of body. Wellness is a state of being.',
    'The best way to find yourself is to lose yourself in the service of others.',
    'If you want to lift yourself up, lift up someone else.',
    'I believe health care is a civil right.',
  ];
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

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
      <Testimonials />
      <ContactForm />
    </div>
  );
};

export default HomePage;
