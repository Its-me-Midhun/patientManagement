import React from 'react';
import './404.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>Oops!</h1>
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <button className="not-found-button">
          <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
            Go Back
          </Link>
        </button>
      </div>
      <div className="not-found-animation">
        <div className="circle"></div>
        <div className="triangle"></div>
        <div className="square"></div>
      </div>
    </div>
  );
};

export default NotFound;
