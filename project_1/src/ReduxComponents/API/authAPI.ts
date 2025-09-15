import { AxiosError } from 'axios';
import api from '../features/interceptor';

export const registeringNewUserAPI = async (userData: FormData) => {
  const response = await api.post(`/auth/register`, userData);
  return response.data;
};

export const loginUserAPI = async (userData: { email: string; password: string }) => {
  const response = await api.post(`/auth/login`, userData);
  return response.data;
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
