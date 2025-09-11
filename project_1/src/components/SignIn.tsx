import MyTextarea from './UI/textarear/MyTextarea';
import MyButton from './UI/button/MyButton';
import { NavLink, useNavigate } from 'react-router-dom';
import { fonColor } from '../ReduxComponents/type/type';
import { userLogin } from '../ReduxComponents/features/user/userThunk';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.user.loading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { email, password };

    // Отправляем объект с данными
    dispatch(userLogin(userData));
  };

  useEffect(() => {
    if (loading === 'succeeded') {
      navigate('/user/profile');
    }
  }, [loading, navigate]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);
  const isEmail = isValidEmail
    ? 'rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
    : 'border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500';

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={` resize-none absolute top-0 left-0 w-full h-full ${fonColor}`}></div>
        <div className="bg-indigo-500 shadow-lg shadow-indigo-500/50 w-[400px] item-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-indigo-600 rounded-4xl max-w-sm mx-auto p-6 outline-black/5 dark:bg-gray-800 bg-opacity-50">
          <h2 className="text-2xl font-semibold mb-4">Email</h2>
          <input
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEmail}`}
            placeholder="Email..."
            maxLength={35}
            minLength={0}
          />
          <h2 className="text-2xl font-semibold mb-4">Password</h2>

          <MyTextarea
            size="base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className="min-h-[50px] w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden resize-none"
            placeholder="Password..."
            rows={1}
          ></MyTextarea>
          <p className="mt-[-20px] text-gray-600/100 dark:text-gray-600/200">Forgot password?</p>

          <MyButton className={'mt-10 btn btn-soft w-full bg-indigo-500'} type="submit" color="blue">
            Login
          </MyButton>
          <NavLink to="/registration">
            <p className=" text-gray-600/100 dark:text-gray-600/200">Registration</p>
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default SignIn;
