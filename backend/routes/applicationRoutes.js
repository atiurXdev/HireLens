const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadAndScreenResume, getApplications } = require('../controllers/applicationController');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post('/upload', upload.single('resume'), uploadAndScreenResume);
router.get('/', getApplications);

module.exports = router;