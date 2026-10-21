const express = require('express');
const router = express.Router();
const { getJobs, createJob } = require('../controllers/jobController');

// Get all jobs for candidate display
router.get('/', getJobs);

// Create a new job opening
router.post('/', createJob);

module.exports = router;