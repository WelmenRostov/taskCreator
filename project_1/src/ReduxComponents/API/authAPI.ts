import { AxiosError } from 'axios';
import api from '../features/interceptor';

export const registeringNewUserAPI = async (userData: FormData) => {
  try {
    const response = await api.post(`/auth/register`, userData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Error updating user data');
    } else if (error instanceof Error) {
      throw new Error(error.message || 'Unknown error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const loginUserAPI = async (userData: { email: string; password: string }) => {
  console.log('Отправка данных на сервер:', userData);
  try {
    const response = await api.post(`/auth/login`, userData);
    console.log('Ответ от сервера:', response.data); // Логируем ответ
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Ошибка при запросе:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error updating user data');
    } else if (error instanceof Error) {
      console.error('Ошибка при запросе:', error.message);
      throw new Error(error.message || 'Unknown error occurred');
    } else {
      console.error('Неизвестная ошибка при запросе');
      throw new Error('An unexpected error occurred');
    }
  }
};

export const accessTokenLifeAPI = () => api.get(`/auth/me`);

export const refreshAccessTokenAPI = () =>
  api
    .post(`/auth/refresh`, null, {
      withCredentials: true,
    })
    .catch((err) => {
      throw err;
    });

export const accessImageAPI = async (id: number) => {
  try {
    const response = await api.get(`/auth/image/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Error fetching user image');
    } else if (error instanceof Error) {
      throw new Error(error.message || 'Unknown error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
