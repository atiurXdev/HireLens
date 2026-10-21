const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize DB Connection
const db = require('./config/db');

const app = express();

// Enable Explicit CORS Policy for Production Frontend
app.use(cors({
  origin: '*', // Production deployment me sabhi clients allow honge
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

// Basic Health Check Route
app.get('/', (req, res) => {
  res.send('HireLens Backend API is running!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});