import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostJob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState(1);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('Posting job...');

    try {
      const response = await axios.post('https://hirelens-backend-78wg.onrender.com/api/jobs', {
        title,
        description,
        experience_required: parseInt(experience)
      });

      setIsSuccess(true);
      setStatusMessage('Job posted successfully! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setIsSuccess(false);
      setStatusMessage(err.response?.data?.message || 'Failed to post job.');
    }
  };

  return React.createElement(
    'div',
    { style: { maxWidth: '600px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' } },
    React.createElement('h2', { style: { textAlign: 'center', marginBottom: '10px', color: '#2d3748' } }, 'Post a New Job'),
    React.createElement('p', { style: { textAlign: 'center', color: '#718096', marginBottom: '20px' } }, 'Create a new opening for AI candidate screening'),
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
        React.createElement('label', { style: { display: 'block', marginBottom: '5px', color: '#4a5568', fontWeight: 'bold' } }, 'Job Title'),
        React.createElement('input', {
          type: 'text',
          value: title,
          onChange: (e) => setTitle(e.target.value),
          required: true,
          placeholder: 'e.g. Backend Developer',
          style: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e0', boxSizing: 'border-box' }
        })
      ),
      React.createElement(
        'div',
        { style: { marginBottom: '15px' } },
        React.createElement('label', { style: { display: 'block', marginBottom: '5px', color: '#4a5568', fontWeight: 'bold' } }, 'Experience Required (Years)'),
        React.createElement('input', {
          type: 'number',
          value: experience,
          onChange: (e) => setExperience(e.target.value),
          min: '0',
          required: true,
          style: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e0', boxSizing: 'border-box' }
        })
      ),
      React.createElement(
        'div',
        { style: { marginBottom: '20px' } },
        React.createElement('label', { style: { display: 'block', marginBottom: '5px', color: '#4a5568', fontWeight: 'bold' } }, 'Job Description'),
        React.createElement('textarea', {
          value: description,
          onChange: (e) => setDescription(e.target.value),
          rows: 5,
          required: true,
          placeholder: 'Mention key responsibilities and required skills...',
          style: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e0', boxSizing: 'border-box', fontFamily: 'inherit' }
        })
      ),
      React.createElement(
        'button',
        {
          type: 'submit',
          style: { width: '100%', padding: '12px', backgroundColor: '#38a169', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }
        },
        'Publish Job'
      )
    )
  );
}

export default PostJob;