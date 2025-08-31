import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:3002';

export const registeringNewUser = async (userData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
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
