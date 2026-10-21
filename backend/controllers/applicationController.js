const pdfParse = require('pdf-parse');

// In-memory application storage
let applicationsList = [
  {
    id: 1,
    candidateName: 'Candidate (atiur2004@gmail.com)',
    jobTitle: 'Full Stack Developer',
    matchScore: '100%',
    status: 'Shortlisted',
    matchedSkills: ['react', 'node', 'javascript', 'express', 'postgresql', 'sql', 'git', 'python', 'ai'],
    appliedAt: new Date().toLocaleDateString()
  }
];

const uploadAndScreenResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No resume file uploaded.' });
    }

    const jobTitle = req.body.jobTitle || 'General Application';
    let resumeText = '';

    try {
      const parsedPdf = await pdfParse(req.file.buffer);
      resumeText = parsedPdf.text ? parsedPdf.text.toLowerCase() : '';
    } catch (parseErr) {
      console.warn('pdf-parse fallback used:', parseErr.message);
      resumeText = req.file.buffer.toString('utf8').toLowerCase();
    }

    const requiredSkills = ['react', 'node', 'javascript', 'express', 'postgresql', 'sql', 'git', 'python', 'ai'];
    let matchedSkills = [];

    requiredSkills.forEach((skill) => {
      if (resumeText.includes(skill)) {
        matchedSkills.push(skill);
      }
    });

    const matchScore = Math.round((matchedSkills.length / requiredSkills.length) * 100);
    const status = matchScore >= 40 ? 'Shortlisted' : 'Under Review';

    const newApplication = {
      id: Date.now(),
      candidateName: 'Candidate (atiur2004@gmail.com)',
      jobTitle,
      matchScore: `${matchScore}%`,
      status,
      matchedSkills,
      appliedAt: new Date().toLocaleDateString()
    };

    applicationsList.unshift(newApplication);

    return res.status(200).json({
      message: 'Resume analyzed successfully!',
      screeningResult: newApplication
    });
  } catch (error) {
    console.error('Resume screening error:', error);
    return res.status(500).json({ message: 'Error processing resume file.' });
  }
};

const getApplications = (req, res) => {
  return res.status(200).json(applicationsList);
};

module.exports = { uploadAndScreenResume, getApplications };