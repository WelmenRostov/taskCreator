import api from '../features/interceptor';

export const registeringNewUserAPI = async (userData: FormData) => {
  const response = await api.post(`/auth/register`, userData);
  return response.data;
};

export const userPasswordUpdateAPI = async (userData: { oldPassword: string; newPassword: string }) => {
  const response = await api.post(`/auth/change-password`, userData, {
    withCredentials: true,
  });
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
  const response = await api.get(`/auth/image/${id}`);
  return response.data;
};
