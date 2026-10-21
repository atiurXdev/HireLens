-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('recruiter', 'candidate'))
);

-- Candidates Table
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    education TEXT,
    experience TEXT,
    resume_url TEXT
);

-- Jobs Table
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    recruiter_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    experience_required INT NOT NULL
);

-- Skills Table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Candidate Skills Junction Table
CREATE TABLE candidate_skills (
    candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
    skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (candidate_id, skill_id)
);

-- Job Skills Junction Table
CREATE TABLE job_skills (
    job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
    skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
    required BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (job_id, skill_id)
);

-- Applications Table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
    job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'applied',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Match Scores Table
CREATE TABLE match_scores (
    application_id INT PRIMARY KEY REFERENCES applications(id) ON DELETE CASCADE,
    skill_score FLOAT,
    semantic_score FLOAT,
    experience_score FLOAT,
    education_score FLOAT,
    overall_score FLOAT
);