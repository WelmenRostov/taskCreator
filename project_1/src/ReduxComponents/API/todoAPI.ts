import axios from 'axios';
import type { ApiResponse, Post } from '../type/type';
import api from '../features/interceptor';

export const fetchTodosAPI = async (
  page: number,
  limit: number,
  filter: 'pending' | 'fulfilled' | 'rejected'
): Promise<{ data: Post[]; totalPages: number; page: number }> => {
  const response = await api.get(`/todos`, {
    params: { page, limit, filter },
  });
  return {
    data: response.data.data,
    totalPages: response.data.totalPages,
    page: response.data.page,
  };
};

export const addNewTaskAPI = async (title: string, text: string): Promise<Post> => {
  const response = await api.post(`/todos`, { title, text });
  console.log(response.data);
  return response.data;
};

export const saveEditorAPI = async (id: number, title?: string, text?: string): Promise<ApiResponse> => {
  try {
    const response = await api.put(`/todo/editor`, {
      id,
      title,
      text,
    });
    return {
      data: response.data.data, // Теперь возвращаем один обновленный пост
      totalPages: response.data.totalPages,
      page: response.data.page,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || 'Unknown API error');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const activEditorAPI = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.put(`/todo/seteditor`, {
      id,
    });
    return {
      data: response.data.data, // Теперь возвращаем один обновленный пост
      totalPages: response.data.totalPages,
      page: response.data.page,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || 'Unknown API error');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
