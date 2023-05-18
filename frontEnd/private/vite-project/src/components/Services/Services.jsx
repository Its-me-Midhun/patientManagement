import React, { useState } from 'react';
import './Services.css';

const Services = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (index) => {
    console.log('index', activeCard);
    setActiveCard(index === activeCard ? null : index);
  };

  const servicesData = [
    {
      title: 'Emergency Care',
      description: '24/7 emergency medical services.',
      icon: 'https://img.freepik.com/premium-vector/child-hospital-room-2d-vector-isolated-illustration-parents-talking-with-pediatrician-about-patient-state-flat-characters-cartoon-background-pediatric-emergency-room-colourful-scene_151150-5666.jpg',
    },
    {
      title: 'Surgery',
      description: 'State-of-the-art surgical procedures.',
      icon: 'https://img.freepik.com/free-vector/surgeons-team-surrounding-patient-operation-table-flat-vector-illustration-cartoon-medical-workers-preparing-surgery-medicine-technology-concept_74855-8596.jpg',
    },
    {
      title: 'Maternity',
      description: 'Expert care for expecting mothers.',
      icon: 'https://static.vecteezy.com/system/resources/previews/004/154/446/original/happy-pregnant-woman-holds-her-belly-active-well-fitted-pregnant-female-character-happy-pregnancy-flat-cartoon-illustration-free-vector.jpg',
    },
    {
      title: 'Maternity',
      description: 'Expert care for expecting mothers.',
      icon: 'https://static.vecteezy.com/system/resources/previews/004/154/446/original/happy-pregnant-woman-holds-her-belly-active-well-fitted-pregnant-female-character-happy-pregnancy-flat-cartoon-illustration-free-vector.jpg',
    },
    {
      title: 'Maternity',
      description: 'Expert care for expecting mothers.',
      icon: 'https://static.vecteezy.com/system/resources/previews/004/154/446/original/happy-pregnant-woman-holds-her-belly-active-well-fitted-pregnant-female-character-happy-pregnancy-flat-cartoon-illustration-free-vector.jpg',
    },
    {
      title: 'Maternity',
      description: 'Expert care for expecting mothers.',
      icon: 'https://static.vecteezy.com/system/resources/previews/004/154/446/original/happy-pregnant-woman-holds-her-belly-active-well-fitted-pregnant-female-character-happy-pregnancy-flat-cartoon-illustration-free-vector.jpg',
    },
    {
      title: 'Maternity',
      description: 'Expert care for expecting mothers.',
      icon: 'https://static.vecteezy.com/system/resources/previews/004/154/446/original/happy-pregnant-woman-holds-her-belly-active-well-fitted-pregnant-female-character-happy-pregnancy-flat-cartoon-illustration-free-vector.jpg',
    },
    {
      title: 'Maternity',
      description: 'Expert care for expecting mothers.',
      icon: 'https://static.vecteezy.com/system/resources/previews/004/154/446/original/happy-pregnant-woman-holds-her-belly-active-well-fitted-pregnant-female-character-happy-pregnancy-flat-cartoon-illustration-free-vector.jpg',
    },
    {
      title: 'Maternity',
      description: 'Expert care for expecting mothers.',
      icon: 'https://static.vecteezy.com/system/resources/previews/004/154/446/original/happy-pregnant-woman-holds-her-belly-active-well-fitted-pregnant-female-character-happy-pregnancy-flat-cartoon-illustration-free-vector.jpg',
    },
    {
      title: 'Maternity',
      description: 'Expert care for expecting mothers.',
      icon: 'https://static.vecteezy.com/system/resources/previews/004/154/446/original/happy-pregnant-woman-holds-her-belly-active-well-fitted-pregnant-female-character-happy-pregnancy-flat-cartoon-illustration-free-vector.jpg',
    },
    // ...
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        {servicesData.map((service, index) => (
          <div
            className={`service-cards ${activeCard === index ? 'active' : ''}`}
            key={index}
            onClick={() => handleCardClick(index)}
          >
            <img
              src={service.icon}
              alt={service.title}
              className="service-image"
            />
            <h3 className="service-title">{service.title}</h3>
            {activeCard === index && (
              <p className="service-description">{service.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
