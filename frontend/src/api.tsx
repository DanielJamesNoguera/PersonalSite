import axios from 'axios';
const API_BASE_URL = 'http://localhost:4000/api';

export const getStravaActivities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/strava-activities`);
    return response.data;
  } catch (error) {
    console.error('Error fetching example data:', error);
    throw error;
  }
};

export const uploadMeasurements = async (measurements: { [key: string]: number }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/upload-measurements`, measurements);
    return response.data;
  } catch (error) {
    console.error('Error uploading measurements:', error);
    throw error;
  }
}

export const getMeasurements = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-measurements`);
    return response.data;
  } catch (error) {
    console.error('Error fetching measurements:', error);
    throw error;
  }
}

export const updateStravaToken = async (code: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update-strava-token`, { code });
    return response.data;
  } catch (error) {
    console.error('Error updating Strava token:', error);
    throw error;
  }
}