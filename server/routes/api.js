const express = require('express');
const router = express.Router();
const { getStravaActivities } = require('../utils/strava');
const { addedMeasurements, getMeasurements } = require('../utils/measurements');
const { refreshStravaAccessToken } = require('../utils/credentials');

// Define your API routes here
router.get('/strava-activities', async (req, res) => {
  const activities = await getStravaActivities();
  activities
    ? res.json(activities)
    : res.status(500).send({ msg: 'Auth Timed Out.', url: 'https://www.strava.com/oauth/authorize?client_id=129678&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=activity:read_all'});
});

router.post('/upload-measurements', async (req, res) => {
  const measurements = req.body;
  const result = await addedMeasurements(measurements);
  result 
    ? res.status(201).send('Measurements added!')
    : res.status(500).send('Something went wrong!');
});

router.get('/get-measurements', async (req, res) => {
  const measurements = await getMeasurements();
  res.json(measurements);
});

router.post('/update-strava-token', async (req, res) => {
  const code = req.body.code;
  const refreshedToken = await refreshStravaAccessToken(code);
  refreshedToken
    ? res.status(200).send('Token refreshed!')
    : res.status(500).send('Something went wrong!');
});

module.exports = router;