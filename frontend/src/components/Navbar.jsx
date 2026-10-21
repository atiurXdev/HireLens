import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return React.createElement(
    'nav',
    { style: { padding: '15px 30px', backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
    React.createElement('h2', { style: { margin: 0, color: '#2d3748' } }, 'HireLens'),
    React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center' } },
      React.createElement(Link, { to: '/', style: { marginRight: '20px', textDecoration: 'none', color: '#4a5568', fontWeight: 'bold' } }, 'Home'),
      React.createElement(Link, { to: '/apply', style: { marginRight: '20px', textDecoration: 'none', color: '#4a5568', fontWeight: 'bold' } }, 'Apply'),
      token && React.createElement(Link, { to: '/post-job', style: { marginRight: '20px', textDecoration: 'none', color: '#38a169', fontWeight: 'bold' } }, 'Post Job'),
      token && React.createElement(Link, { to: '/applications', style: { marginRight: '20px', textDecoration: 'none', color: '#3182ce', fontWeight: 'bold' } }, 'Dashboard'),
      token
        ? React.createElement(
            'button',
            {
              onClick: handleLogout,
              style: { backgroundColor: '#e53e3e', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
            },
            'Logout'
          )
        : React.createElement(Link, { to: '/login', style: { textDecoration: 'none', color: '#3182ce', fontWeight: 'bold' } }, 'Login')
    )
  );
}

export default Navbar;