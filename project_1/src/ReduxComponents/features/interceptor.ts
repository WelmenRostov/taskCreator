import axios from 'axios';

const API_URL = 'https://welmenrostov.ru/servers/todo-backend-core-05'; // твой бэкенд

// Создаём экземпляр axios
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Интерцептор для подстановки accessToken
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерцептор для обработки 401 и обновления токена
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401 и это не запрос на /auth/login или /auth/register
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/auth/register')
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });

        const newAccessToken = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // Обновляем заголовок и повторяем запрос
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token invalid', refreshError);
        localStorage.removeItem('accessToken');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
