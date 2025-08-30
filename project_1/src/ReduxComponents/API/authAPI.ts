import axios from 'axios';

const API_URL = 'http://localhost:3002';

interface RegistrationResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    login: string;
  };
}

export const fetchAuth = async (email: string, login: string, pass: string): Promise<RegistrationResponse> => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email,
    login,
    password: pass,
  });

  return response.data;
};
