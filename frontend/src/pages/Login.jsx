import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('Authenticating...');

    try {
      const response = await axios.post('https://hirelens-backend-78wg.onrender.com/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      setIsSuccess(true);
      setStatusMessage('Login Successful! Redirecting to Home...');
      
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setIsSuccess(false);
      setStatusMessage(err.response?.data?.message || 'Login failed. Check backend server.');
    }
  };

  return React.createElement(
    'div',
    { style: { maxWidth: '400px', margin: '50px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' } },
    React.createElement('h2', { style: { textAlign: 'center', marginBottom: '20px', color: '#2d3748' } }, 'Login to HireLens'),
    statusMessage && React.createElement(
      'p',
      { style: { textAlign: 'center', color: isSuccess ? '#2f855a' : '#e53e3e', fontWeight: 'bold', marginBottom: '15px' } },
      statusMessage
    ),
    React.createElement(
      'form',
      { onSubmit: handleSubmit },
      React.createElement(
        'div',
        { style: { marginBottom: '15px' } },
        React.createElement('label', { style: { display: 'block', marginBottom: '5px', color: '#4a5568' } }, 'Email Address'),
        React.createElement('input', {
          type: 'email',
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
          style: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e0', boxSizing: 'border-box' }
        })
      ),
      React.createElement(
        'div',
        { style: { marginBottom: '20px' } },
        React.createElement('label', { style: { display: 'block', marginBottom: '5px', color: '#4a5568' } }, 'Password'),
        React.createElement('input', {
          type: 'password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true,
          style: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e0', boxSizing: 'border-box' }
        })
      ),
      React.createElement(
        'button',
        {
          type: 'submit',
          style: { width: '100%', padding: '12px', backgroundColor: '#3182ce', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }
        },
        'Sign In'
      )
    )
  );
}

export default Login;