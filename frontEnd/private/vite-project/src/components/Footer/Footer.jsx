import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '2rem',
              }}
            >
              WECare
            </Link>
          </div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Your Company. All rights reserved.</p>
          <p>Terms of Service | Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
