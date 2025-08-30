import axios from 'axios';
import type { Post } from '../type/type';

const API_URL = 'http://localhost:3001';

export const fetchTodos = async (
  page: number,
  limit: number,
  filter: 'pending' | 'fulfilled' | 'rejected' | 'all'
): Promise<{ data: Post[]; totalPages: number; page: number }> => {
  const response = await axios.get(`${API_URL}/todos`, {
    params: { page, limit, filter },
  });

  return {
    data: response.data.data,
    totalPages: response.data.totalPages,
    page: response.data.page,
  };
};
