import axios, { AxiosError } from 'axios';
import { API_URL } from '../type/type';

export const registeringNewUserAPI = async (userData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData, {
      withCredentials: true,
    });
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

export const accessTokenLifeAPI = (accessToken: string) =>
  axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const refreshAccessTokenAPI = () =>
  axios
    .post(`${API_URL}/auth/refresh`, null, {
      withCredentials: true,
    })
    .catch((err) => {
      console.log('DEBUG ошибка refresh:', err.toJSON());
      throw err;
    });

export const accessImageAPI = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/auth/image/${id}`);
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
