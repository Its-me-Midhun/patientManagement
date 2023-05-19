import React, { useState, useEffect } from 'react';
import './navbar.css';
import avatarImage from '../../../images/659651.svg'; // Replace with your own avatar image
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavbarTransparent, setIsNavbarTransparent] = useState(true);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const shouldNavbarBeTransparent = window.scrollY === 0;
      setIsNavbarTransparent(shouldNavbarBeTransparent);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isNavbarTransparent ? 'transparent' : ''}`}>
      <div className="logo">
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: 'white',
            fontSize: '2rem',
          }}
        >
          WE
          <b
            style={{
              color: `${isNavbarTransparent ? '#6c63ff' : 'white'}`,
              fontSize: '2rem',
            }}
          >
            C
          </b>
          are
        </Link>
        <Link
          to="/login"
          style={{
            margin: '0% 0% 0% 70px',
            textDecoration: 'none',
            color: 'white',
          }}
        >
          Login
        </Link>
        <Link
          to="/dashboard"
          style={{
            margin: '0% 0% 0% 70px',
            textDecoration: 'none',
            color: 'white',
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/vaccine"
          style={{
            margin: '0% 0% 0% 70px',
            textDecoration: 'none',
            color: 'white',
          }}
        >
          Vaccine
        </Link>
      </div>
      <button className="avatar-button" onClick={handleAvatarClick}>
        <img
          src="https://scontent-sin6-3.xx.fbcdn.net/v/t39.30808-1/325188505_925445105136375_449028671237095168_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=c6021c&_nc_ohc=GLBi-cErjz0AX8OJQkw&_nc_ht=scontent-sin6-3.xx&oh=00_AfBdnbnMq548zyf2MQ57Pk3toP-9dgq6ZHnWONqdmjHfQA&oe=6469A856"
          alt="Avatar"
          className="avatar-image"
        />
      </button>
      {isDropdownOpen && (
        <div className="dropdown">
          <ul className="dropdown-list" style={{ backgroundColor: 'black' }}>
            <li>
              <Link
                to="/profile"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
