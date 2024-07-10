const axios = require('axios');
const { dbCollection } = require('./db');

const fetchStravaAccessToken = async () => {
  const collection = await dbCollection('credentials');
  const stravaCredentials = await collection.findOne({ service: 'strava' });
  return stravaCredentials.accessToken;
}

const refreshStravaAccessToken = async (code) => {
  const client_id = "129678";
  const client_secret = "6fe4cc61634271918ae551382a9e55c64b75c731";
  const grant_type = "authorization_code";

  try {
    const response = await axios.post(
      'https://www.strava.com/oauth/token', 
      {client_id, client_secret, code, grant_type}, 
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded'}}
    );

    console.log(response.data);

    if (response.data.access_token && response.data.athlete.id === 118605640) {
      const collection = await dbCollection('credentials');
      collection.updateOne(
        { service: 'strava' },
        { $set: { accessToken: response.data.access_token } }
      );
      return response.data.access_token;
    }
    return true;
  } catch (error) {
    console.error('Error fetching the token:', error);
    return false;
  }
}

module.exports = { fetchStravaAccessToken, refreshStravaAccessToken };