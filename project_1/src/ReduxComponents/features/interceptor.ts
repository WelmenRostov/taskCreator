import axios from 'axios';

const API_URL = 'http://localhost:3002'; // твой бэкенд

// Создаём экземпляр axios
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // важно для refreshToken в cookie
});

// Интерцептор для подстановки accessToken
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерцептор для обработки 401 и обновления токена
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если получили 401 и ещё не пытались рефрешить
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Дёргаем refresh endpoint
        const res = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true } // refreshToken берём из cookie
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // Обновляем заголовок и повторяем запрос
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token invalid', refreshError);
        localStorage.removeItem('accessToken');
        window.location.href = '/signin'; // редирект на логин
      }
    }

    return Promise.reject(error);
  }
);

export default api;
