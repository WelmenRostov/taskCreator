import MyTextarea from './UI/textarear/MyTextarea';
import MyButton from './UI/button/MyButton';
import { NavLink, useNavigate } from 'react-router-dom';
import { colorBase, colorShadow, fonColor } from '../ReduxComponents/type/type';
import { userLogin } from '../ReduxComponents/features/user/userThunk';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { setError } from '../ReduxComponents/features/user/authSlice';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  // Мемоизированные селекторы
  const loading = useSelector((state: RootState) => state.user.loading);
  const isAuth = useSelector((state: RootState) => state.user.user.isAuth);
  const error = useSelector((state: RootState) => state.user.error);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const hasNavigated = useRef(false);
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { email, password };
    dispatch(setError(null));
    dispatch(userLogin(userData));
  }, [email, password, dispatch]);

  const hundleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    dispatch(setError(null));
  }, [dispatch]);

  // Мемоизированная функция навигации
  const handleNavigation = useCallback(() => {
    if (loading === 'succeeded' && error === null && isAuth && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate('/user/profile');
    }
  }, [loading, error, isAuth, navigate]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);
  const isEmail = isValidEmail;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={` resize-none absolute top-0 left-0 w-full h-full ${fonColor}`}></div>
        <div
          className={`${colorBase} ${colorShadow} w-[400px] item-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-indigo-600 rounded-4xl max-w-sm mx-auto p-6 outline-black/5 dark:bg-gray-800 bg-opacity-50`}
        >
          <h2 className="text-2xl font-semibold mb-4">Почта</h2>

          <input
            name="email"
            type="text"
            value={email}
            onChange={hundleEmailChange}
            className={`w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEmail}`}
            placeholder="Email..."
            maxLength={35}
            minLength={0}
          />
          <h2 className="text-2xl font-semibold mb-4">Пароль</h2>

          <MyTextarea
            size="base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className="min-h-[50px] w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden resize-none"
            placeholder="Password..."
            rows={1}
          ></MyTextarea>
          <p className="mt-[-20px] text-gray-600/100 dark:text-gray-600/200">Забыли пароль?</p>
          <p className={`mt-10 text-red-500 text-2xl`}>{error}</p>
          <MyButton className={'mt-2 btn btn-soft w-full bg-indigo-500'} type="submit" color="blue">
            Войти
          </MyButton>
          <NavLink to="/registration">
            <p className=" text-gray-600/100 dark:text-gray-600/200">Создать аккаунт</p>
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default SignIn;
