import { useEffect, useState, useRef } from 'react';
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
        const raw = localStorage.getItem('user');
        if (!raw) {
          setUser(null);
          setLoading(false);
          return;
        }

        const parsed = JSON.parse(raw) as UserType;
        setUser(parsed);
        if (!parsed.cover || !parsed.profile) {
          await dispatch(userAccessImage(parsed.id!));
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
