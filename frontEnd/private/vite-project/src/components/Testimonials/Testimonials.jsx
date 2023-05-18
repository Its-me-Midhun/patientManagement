import React from 'react';
import './Testimonials.css';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non mauris vitae erat consequat auctor eu in elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      testimonial:
        'Nullam mattis pulvinar ante, a consequat tellus vestibulum et. Aliquam et nunc convallis, sodales justo sed, fermentum odio. Nullam egestas diam mauris, eu cursus odio lobortis ac.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      testimonial:
        'Nullam mattis pulvinar ante, a consequat tellus vestibulum et. Aliquam et nunc convallis, sodales justo sed, fermentum odio. Nullam egestas diam mauris, eu cursus odio lobortis ac.',
    },
    // Add more testimonials as needed
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-heading">Testimonials</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial">
              <div className="testimonial-content">
                <div className="testimonial-icon">
                  <FaQuoteLeft />
                </div>
                <p className="testimonial-text">{testimonial.testimonial}</p>
              </div>
              <p className="testimonial-author">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
