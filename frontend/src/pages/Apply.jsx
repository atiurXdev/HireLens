import React, { useState } from 'react';
import axios from 'axios';

function Apply() {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState('Full Stack Developer');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatusMessage('Please select a resume file first.');
      setIsSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobTitle', jobTitle);

    setStatusMessage('Uploading resume & running AI screening...');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5001/api/applications/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setIsSuccess(true);
      setStatusMessage(response.data.message || 'Resume analyzed!');
      setResult(response.data.screeningResult);
    } catch (err) {
      setIsSuccess(false);
      setStatusMessage(err.response?.data?.message || 'Upload failed. Check backend server.');
      setResult(null);
    }
  };

  return React.createElement(
    'div',
    { style: { maxWidth: '500px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' } },
    React.createElement('h2', { style: { textAlign: 'center', marginBottom: '10px', color: '#2d3748' } }, 'Apply & Screen Resume'),
    React.createElement('p', { style: { textAlign: 'center', color: '#718096', marginBottom: '20px' } }, 'Upload your PDF resume for AI candidate matching'),
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
        React.createElement('label', { style: { display: 'block', marginBottom: '5px', color: '#4a5568', fontWeight: 'bold' } }, 'Target Job Title'),
        React.createElement('input', {
          type: 'text',
          value: jobTitle,
          onChange: (e) => setJobTitle(e.target.value),
          required: true,
          style: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e0', boxSizing: 'border-box' }
        })
      ),
      React.createElement(
        'div',
        { style: { marginBottom: '20px' } },
        React.createElement('label', { style: { display: 'block', marginBottom: '5px', color: '#4a5568', fontWeight: 'bold' } }, 'Upload PDF Resume'),
        React.createElement('input', {
          type: 'file',
          accept: '.pdf,.doc,.docx',
          onChange: handleFileChange,
          required: true,
          style: { width: '100%', padding: '10px', border: '1px solid #cbd5e0', borderRadius: '4px', boxSizing: 'border-box' }
        })
      ),
      React.createElement(
        'button',
        {
          type: 'submit',
          style: { width: '100%', padding: '12px', backgroundColor: '#3182ce', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }
        },
        'Upload & Screen'
      )
    ),
    result && React.createElement(
      'div',
      { style: { marginTop: '25px', padding: '15px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#f7fafc' } },
      React.createElement('h3', { style: { margin: '0 0 10px 0', color: '#2b6cb0' } }, 'AI Screening Results'),
      React.createElement('p', null, `Match Score: ${result.matchScore}`),
      React.createElement('p', null, `Status: ${result.status}`),
      React.createElement('p', null, `Matched Skills: ${result.matchedSkills ? result.matchedSkills.join(', ') : 'None'}`)
    )
  );
}

export default Apply;