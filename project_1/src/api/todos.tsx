import axios from 'axios';
import type { Post } from '../types/types';

const API_URL = 'http://localhost:3001'; // замени на своё

export const fetchTodos = async (
  page: number,
  limit: number,
  filter: 'pending' | 'fulfilled' | 'rejected'
): Promise<{ data: Post[]; totalPages: number; page: number }> => {
  const response = await axios.get(`${API_URL}/todos`, {
    timeout: 15000000,
    params: { page, limit, filter },
  });
  return {
    data: response.data.data,
    totalPages: response.data.totalPages,
    page: response.data.page,
  };
};

export const createTodos = async (title: string, text: string) => {
  try {
    const response = await axios.post(`${API_URL}/todos`, { title, text });
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании задачи:', error);
    return null;
  }
};

export const patchTodos = async (id: number, title?: string, text?: string, status?: string) => {
  console.log('Что то происходит');
  try {
    const response = await axios.patch(`${API_URL}/todos/${id}`, { title, text, status });
    return response.data;
  } catch (error) {
    console.error('Ошибка изменении задачи:', error);
    return null;
  }
};
