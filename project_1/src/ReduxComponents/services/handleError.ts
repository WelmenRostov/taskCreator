import { AxiosError } from 'axios';

export const handleError = (err: unknown): never => {
  const error = err as AxiosError<{ message?: string; error?: string }>;
  throw new Error(error.response?.data?.message || error.response?.data?.error || 'Ошибка запроса');
};
