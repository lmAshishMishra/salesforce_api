// index.js - Mock backend API for Salesforce job recommendations

const express = require('express');
const cors = require('cors');
const app = express();

// Allow cross-origin for testing (browser) — server-to-server doesn’t need CORS but it's harmless
app.use(cors());
app.use(express.json());

// Health check (useful to test if server is up)
app.get('/', (req, res) => {
  res.send('OK: API is running');
});

// API #1: Job Recommendations
// Usage: GET /job-recommendations?candidateId=003xx000000ABC
app.get('/job-recommendations', (req, res) => {
  const { candidateId } = req.query; // sent by Salesforce (Contact Id)
  // Return dummy data (in real-life you'd use candidateId for personalization)
  res.json([
    { jobId: "a01xx0000001", jobName: "Data Analyst", jobLocation: "Chennai" },
    { jobId: "a01xx0000002", jobName: "QA Engineer", jobLocation: "Remote" }
  ]);
});

// API #2: Job Details
// Usage: GET /job-details/:jobId
app.get('/job-details/:jobId', (req, res) => {
  const { jobId } = req.params;
  res.json({
    jobId,
    jobName: jobId === 'a01xx0000001' ? 'Data Analyst' : 'QA Engineer',
    description: "Job description for " + jobId,
    payRate: jobId === 'a01xx0000001' ? 850 : 700
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
