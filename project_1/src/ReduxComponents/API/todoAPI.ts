import axios from 'axios';
import type { Post } from '../type/type';

const API_URL = 'http://localhost:3002';

export const fetchTodosAPI = async (
  page: number,
  limit: number,
  filter: 'pending' | 'fulfilled' | 'rejected' | 'all'
): Promise<{ data: Post[]; totalPages: number; page: number }> => {
  const token = localStorage.getItem('accessToken') || 'undefined';
  const response = await axios.get(`${API_URL}/todos`, {
    params: { page, limit, filter },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return {
    data: response.data.data,
    totalPages: response.data.totalPages,
    page: response.data.page,
  };
};

interface ApiResponse {
  data: Post; // Предположим, что возвращаемый объект — это один пост, а не массив
  totalPages: number;
  page: number;
}

export const saveEditorAPI = async (id: number, title?: string, text?: string): Promise<ApiResponse> => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Access token is missing');
  }

  try {
    const response = await axios.put(
      `${API_URL}/todo/editor`,
      {
        id,
        title,
        text,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return {
      data: response.data.data, // Теперь возвращаем один обновленный пост
      totalPages: response.data.totalPages,
      page: response.data.page,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Axios error:', err.response?.data || err.message);
      throw new Error(err.response?.data?.message || 'Unknown API error');
    } else {
      console.error('Unknown error:', err);
      throw new Error('An unknown error occurred');
    }
  }
};

export const activEditorAPI = async (id: number): Promise<ApiResponse> => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Access token is missing');
  }

  try {
    const response = await axios.put(
      `${API_URL}/todo/seteditor`,
      {
        id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return {
      data: response.data.data, // Теперь возвращаем один обновленный пост
      totalPages: response.data.totalPages,
      page: response.data.page,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Axios error:', err.response?.data || err.message);
      throw new Error(err.response?.data?.message || 'Unknown API error');
    } else {
      console.error('Unknown error:', err);
      throw new Error('An unknown error occurred');
    }
  }
};
