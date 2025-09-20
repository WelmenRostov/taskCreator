import type { UserType } from '../features/user/authSlice';

export const loadUserFromStorage = (): UserType | null => {
  try {
    const raw = localStorage.getItem('user'); // Получение строки из localStorage по ключу 'user'
    console.log('инфа', raw); // Лог для отладки — покажет, что именно достаётся из localStorage
    if (!raw) return null; // Если ничего нет — возвращаем null
    return JSON.parse(raw); // Преобразуем строку JSON обратно в объект
  } catch (error) {
    console.error('Ошибка при загрузке пользователя:', error);
    return null;
  }
};
