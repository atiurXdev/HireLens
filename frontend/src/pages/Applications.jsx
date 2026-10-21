import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Applications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:5001/api/applications')
      .then((res) => {
        setApps(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching applications:', err);
        setLoading(false);
      });
  }, []);

  // Calculate Metrics
  const totalApplicants = apps.length;
  const shortlistedCount = apps.filter((a) => a.status === 'Shortlisted').length;
  const avgScore = totalApplicants > 0
    ? Math.round(apps.reduce((acc, curr) => acc + parseInt(curr.matchScore), 0) / totalApplicants)
    : 0;

  // Filter Logic
  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(app.matchedSkills) ? app.matchedSkills.join(' ') : app.matchedSkills)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return React.createElement(
    'div',
    { style: { maxWidth: '1000px', margin: '30px auto', padding: '20px', color: '#ffffff' } },
    React.createElement('h2', { style: { textAlign: 'center', marginBottom: '25px' } }, 'Candidate AI Screening Dashboard'),

    // Analytics Cards Container
    React.createElement(
      'div',
      { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' } },
      React.createElement(
        'div',
        { style: { backgroundColor: '#2d3748', padding: '20px', borderRadius: '8px', textAlign: 'center', borderTop: '4px solid #3182ce' } },
        React.createElement('h3', { style: { margin: '0 0 5px 0', fontSize: '2rem', color: '#63b3ed' } }, totalApplicants),
        React.createElement('p', { style: { margin: 0, color: '#a0aec0', fontSize: '0.9rem' } }, 'Total Applicants')
      ),
      React.createElement(
        'div',
        { style: { backgroundColor: '#2d3748', padding: '20px', borderRadius: '8px', textAlign: 'center', borderTop: '4px solid #38a169' } },
        React.createElement('h3', { style: { margin: '0 0 5px 0', fontSize: '2rem', color: '#68d391' } }, shortlistedCount),
        React.createElement('p', { style: { margin: 0, color: '#a0aec0', fontSize: '0.9rem' } }, 'Shortlisted Candidates')
      ),
      React.createElement(
        'div',
        { style: { backgroundColor: '#2d3748', padding: '20px', borderRadius: '8px', textAlign: 'center', borderTop: '4px solid #ecc94b' } },
        React.createElement('h3', { style: { margin: '0 0 5px 0', fontSize: '2rem', color: '#f6e05e' } }, `${avgScore}%`),
        React.createElement('p', { style: { margin: 0, color: '#a0aec0', fontSize: '0.9rem' } }, 'Avg Match Score')
      )
    ),

    // Search and Filter Bar
    React.createElement(
      'div',
      { style: { display: 'flex', gap: '15px', marginBottom: '20px' } },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Search candidate, job, or skills (e.g. React)...',
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        style: { flex: 1, padding: '10px 15px', borderRadius: '6px', border: '1px solid #4a5568', backgroundColor: '#2d3748', color: '#ffffff', outline: 'none' }
      }),
      React.createElement(
        'select',
        {
          value: statusFilter,
          onChange: (e) => setStatusFilter(e.target.value),
          style: { padding: '10px 15px', borderRadius: '6px', border: '1px solid #4a5568', backgroundColor: '#2d3748', color: '#ffffff', outline: 'none', cursor: 'pointer' }
        },
        React.createElement('option', { value: 'All' }, 'All Status'),
        React.createElement('option', { value: 'Shortlisted' }, 'Shortlisted'),
        React.createElement('option', { value: 'Under Review' }, 'Under Review')
      )
    ),

    // Applications Table
    loading
      ? React.createElement('p', { style: { textAlign: 'center' } }, 'Loading candidate submissions...')
      : filteredApps.length === 0
        ? React.createElement('p', { style: { textAlign: 'center', color: '#a0aec0' } }, 'No matching applicants found.')
        : React.createElement(
            'table',
            { style: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#2d3748', borderRadius: '8px', overflow: 'hidden' } },
            React.createElement(
              'thead',
              { style: { backgroundColor: '#4a5568' } },
              React.createElement(
                'tr',
                null,
                React.createElement('th', { style: { padding: '12px', textAlign: 'left' } }, 'Candidate'),
                React.createElement('th', { style: { padding: '12px', textAlign: 'left' } }, 'Job Title'),
                React.createElement('th', { style: { padding: '12px', textAlign: 'center' } }, 'Match Score'),
                React.createElement('th', { style: { padding: '12px', textAlign: 'center' } }, 'Status'),
                React.createElement('th', { style: { padding: '12px', textAlign: 'left' } }, 'Matched Skills')
              )
            ),
            React.createElement(
              'tbody',
              null,
              filteredApps.map((app) =>
                React.createElement(
                  'tr',
                  { key: app.id, style: { borderBottom: '1px solid #4a5568' } },
                  React.createElement('td', { style: { padding: '12px' } }, app.candidateName),
                  React.createElement('td', { style: { padding: '12px' } }, app.jobTitle),
                  React.createElement('td', { style: { padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#63b3ed' } }, app.matchScore),
                  React.createElement(
                    'td',
                    { style: { padding: '12px', textAlign: 'center' } },
                    React.createElement(
                      'span',
                      {
                        style: {
                          backgroundColor: app.status === 'Shortlisted' ? '#2f855a' : '#c53030',
                          color: '#ffffff',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.85rem'
                        }
                      },
                      app.status
                    )
                  ),
                  React.createElement('td', { style: { padding: '12px', fontSize: '0.85rem', color: '#cbd5e0' } }, Array.isArray(app.matchedSkills) ? app.matchedSkills.join(', ') : app.matchedSkills)
                )
              )
            )
          )
  );
}

export default Applications;