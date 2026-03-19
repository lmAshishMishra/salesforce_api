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
    { jobId: "a00dL00002zUgorQAC", jobName: "Data Analyst", jobLocation: "Chennai" },
    { jobId: "a00dL00002zUgHuQAK", jobName: "QA Engineer", jobLocation: "Remote" },
    {jobId: "a00dL00002zUqrRQAS", jobName: "salesforce developer", jobLocation: "lucknow"}
  ]);
});

// API #2: Job Details
// Usage: GET /job-details/:jobId
app.get('/job-details/:jobId', (req, res) => {
  const { jobId } = req.params;
 if(jobId=="a00dL00002zUgorQAC")( res.json({
    jobId,
    jobName: "Data Analyst",
    description: "The position for data analyst is open for xyz componey " + jobId,
    payRate: "$50000"
  }))
 if(jobId=="a00dL00002zUgHuQAK")( res.json({
    jobId,
    jobName: "QA Engineer",
    description: "The QA position for adecco group is opened for the team" + jobId,
    payRate: "$100000"
  }))
  if(jobId=="a00dL00002zUqrRQAS")( res.json({
    jobId,
    jobName: "salesforce developer",
    description: "the salesforce developer role in abc compony is opened for" + jobId,
    payRate: "$60000"
  }))
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
