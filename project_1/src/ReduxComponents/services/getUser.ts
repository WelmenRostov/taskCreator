export const getUser = () => {
  const raw = localStorage.getItem('persist:root');
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    const userStr = parsed.user;
    const user = JSON.parse(userStr);

    return user.user;
  } catch (e) {
    console.error('Ошибка при получении токена', e);
    return null;
  }
};