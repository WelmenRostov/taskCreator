import { type JSX, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { accessTokenLifeAPI, refreshAccessTokenAPI } from '../ReduxComponents/API/authAPI';
import LoadSpinner from './LoadSpinner';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [isValid, setIsValid] = useState<null | boolean>(null);
  const location = useLocation();
  const isChecking = useRef(false);

  // Мемоизированный массив публичных путей
  const PublicPaths = useMemo(() => ['/signin', '/registration'], []);

  const checkToken = useCallback(async () => {
    if (isChecking.current) return;
    isChecking.current = true;
    
    try {
      const token = localStorage.getItem('accessToken');
      if (!token || token === 'undefined' || token === 'null') {
        setIsValid(false);
        return;
      }

      await accessTokenLifeAPI();
      setIsValid(true);
    } catch (error) {
      console.log('Access token недействителен. Пробуем обновить...', error);
      try {
        const res = await refreshAccessTokenAPI();

        // Сохраняем новый токен
        const newAccessToken = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // Повторная проверка с новым токеном
        await accessTokenLifeAPI();
        setIsValid(true);
      } catch (refreshError) {
        console.log('Refresh token не сработал, отправляем на логин', refreshError);
        setIsValid(false);
      }
    } finally {
      isChecking.current = false;
    }
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  if (isValid === null)
    return (
      <>
        <LoadSpinner />
      </>
    );

  // Если не авторизован и не на публичном пути - редирект на signin
  if (isValid === false && !PublicPaths.includes(location.pathname)) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
