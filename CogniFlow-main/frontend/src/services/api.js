import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTweets = async () => {
  try {
    const response = await api.get('/twitter');
    return response.data;
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw error;
  }
};

export const fetchInfluencers = async () => {
  try {
    const response = await api.get('/influencers');
    return response.data;
  } catch (error) {
    console.error('Error fetching influencers:', error);
    throw error;
  }
};

export default api;
