const db = require('../config/db');

// In-memory fallback array for posted jobs if DB query hangs
let inMemoryJobs = [
  {
    id: 101,
    title: 'Full Stack Developer',
    description: 'React, Node.js, Express, and PostgreSQL expert needed for scalable recruitment engine.',
    experience_required: 2
  }
];

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const dbPromise = db.query('SELECT * FROM jobs ORDER BY id DESC');
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('DB Timeout')), 1500)
    );

    const result = await Promise.race([dbPromise, timeoutPromise]);
    return res.json(result.rows);
  } catch (err) {
    console.warn('PostgreSQL fetch fallback active:', err.message);
    return res.json(inMemoryJobs);
  }
};

// Create a new job opening
const createJob = async (req, res) => {
  const { title, description, experience_required } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required.' });
  }

  const newJob = {
    id: Date.now(),
    title,
    description,
    experience_required: parseInt(experience_required) || 0
  };

  try {
    const dbPromise = db.query(
      'INSERT INTO jobs (title, description, experience_required) VALUES ($1, $2, $3) RETURNING *',
      [title, description, newJob.experience_required]
    );

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('DB Timeout')), 1500)
    );

    const result = await Promise.race([dbPromise, timeoutPromise]);

    return res.status(201).json({
      message: 'Job posted successfully!',
      job: result.rows[0]
    });
  } catch (err) {
    console.warn('PostgreSQL save fallback active:', err.message);
    inMemoryJobs.unshift(newJob);

    return res.status(201).json({
      message: 'Job posted successfully!',
      job: newJob
    });
  }
};

module.exports = { getJobs, createJob };