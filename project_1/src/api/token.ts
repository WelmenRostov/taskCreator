import axios from 'axios';

const API_URL = 'http://localhost:3001';

const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

$api.interceptors.response.use((config) => {
  config.headers.Autorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default $api;
