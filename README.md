# HireLens - AI-Powered Candidate Screening & Recruitment Platform

HireLens is an automated recruitment system designed to streamline candidate evaluations. It parses candidate PDF resumes, extracts technical skill keywords, computes match scores against job requirements, and provides an interactive dashboard for recruiters.

## Key Features
- **Authentication:** Secure JWT-based route protection and state persistence.
- **Job Portal:** Recruiter job publishing interface with automated storage.
- **AI Screening Engine:** PDF buffer parsing (`pdf-parse`) and skill keyword matching algorithm.
- **Recruiter Analytics Dashboard:** Real-time metrics (Total Applicants, Shortlisted Count, Avg Score) with instant search/filter controls.

## Tech Stack
- **Frontend:** React.js, React Router DOM, Axios
- **Backend:** Node.js, Express.js, Multer, PDF-Parse
- **Database:** PostgreSQL