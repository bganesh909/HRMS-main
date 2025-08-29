import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const ProfileNavbar = () => {
  const location = useLocation();

  const navItems = [
    { to: '/basic-details', label: 'Profile' },
    { to: '/documents-view', label: 'Documents' },
    { to: '/upload', label: 'Upload' },
  ];

  return (
    <nav className="modern-navbar">
      <div className="navbar-left">
        <div className="navbar-links">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ProfileNavbar;
