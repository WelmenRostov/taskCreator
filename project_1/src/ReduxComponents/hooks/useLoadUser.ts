import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userAccessImage } from '../features/user/userThunk';
import type { UserType } from '../features/user/authSlice';
import type { AppDispatch } from '../../app/store';

export const useLoadUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = localStorage.getItem('persist:root');
        if (!raw) {
          setUser(null);
          setLoading(false);
          return;
        }

        const parsed = JSON.parse(raw); // объект с ключами user, odo, _persist
        const userStr = parsed.user;

        if (!userStr) {
          setUser(null);
          setLoading(false);
          return;
        }

        const userParsed = JSON.parse(userStr); // объект со структурой { user: { ... }, loading, error }
        const userObj = userParsed.user;

        setUser(userObj);

        if ((!userParsed.cover || !userParsed.profile) && userObj?.id) {
          await dispatch(userAccessImage(userObj.id));
        }

        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке пользователя:', err);
        setError('Не удалось загрузить пользователя');
        setLoading(false);
      }
    };

    load();
  }, [dispatch]);

  return { user, loading, error };
};
