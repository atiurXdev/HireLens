import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://hirelens-backend-78wg.onrender.com/api/jobs')
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      });
  }, []);

  return React.createElement(
    'div',
    { style: { padding: '20px', maxWidth: '800px', margin: '0 auto', minHeight: '100vh' } },
    React.createElement(
      'div',
      { style: { textAlign: 'center', marginBottom: '40px' } },
      React.createElement('h1', { style: { color: '#ffffff', fontSize: '2.5rem', fontWeight: 'bold' } }, 'Welcome to HireLens'),
      React.createElement('p', { style: { color: '#a0aec0', fontSize: '18px' } }, 'Smart AI Powered Candidate Screening System')
    ),
    React.createElement('h2', { style: { color: '#e2e8f0', borderBottom: '2px solid #4a5568', paddingBottom: '10px' } }, 'Available Job Openings'),
    loading
      ? React.createElement('p', { style: { color: '#cbd5e0' } }, 'Loading jobs from database...')
      : jobs.length === 0
        ? React.createElement('p', { style: { color: '#cbd5e0' } }, 'No jobs posted yet.')
        : React.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' } },
            jobs.map((job) =>
              React.createElement(
                'div',
                { key: job.id, style: { border: '1px solid #4a5568', padding: '20px', borderRadius: '8px', backgroundColor: '#2d3748', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' } },
                React.createElement('h3', { style: { margin: '0 0 10px 0', color: '#63b3ed' } }, job.title),
                React.createElement('p', { style: { margin: '0 0 15px 0', color: '#e2e8f0' } }, job.description),
                React.createElement(
                  'span',
                  { style: { fontSize: '0.85rem', background: '#4a5568', color: '#e2e8f0', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold' } },
                  `Required Experience: ${job.experience_required} years`
                )
              )
            )
          )
  );
}

export default Home;