const axios = require('axios');
const { fetchStravaAccessToken } = require('./credentials');

async function getStravaActivities() {
  try {
    // Fetch activities
    const accessToken = await fetchStravaAccessToken();
    const headers = { 'Authorization': `Bearer ${accessToken}`};
    let pageNumber = 1;
    const allActivities = [];

    let activityData = await axios.get(`https://www.strava.com/api/v3/athlete/activities?per_page=30&page=${pageNumber}`, { headers })

    while (activityData.data.length > 0) {
      allActivities.push(...activityData.data);
      pageNumber++;
      activityData = await axios.get(`https://www.strava.com/api/v3/athlete/activities?per_page=30&page=${pageNumber}`, { headers});
    }
    return allActivities;
    ;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error);
  }
}

module.exports = { getStravaActivities }