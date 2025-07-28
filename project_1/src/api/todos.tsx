import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchTodos = async (page: number, limit: number, filter: 'active' | 'completed' | 'all') => {
  const response = await axios.get(`${API_URL}/todos?page=${page}&limit=${limit}&filter=${filter}`);
  return response.data;
};
