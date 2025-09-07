import MyTextarea from './UI/textarear/MyTextarea';
import MyButton from './UI/button/MyButton';
import { NavLink } from 'react-router-dom';
import { fonColor } from '../ReduxComponents/type/type';

const SignIn = () => {
  return (
    <>
      <div className={` resize-none absolute top-0 left-0 w-full h-full ${fonColor}`}></div>
      <div className="bg-indigo-500 shadow-lg shadow-indigo-500/50 w-[400px] item-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-indigo-600 rounded-4xl max-w-sm mx-auto p-6 outline-black/5 dark:bg-gray-800 bg-opacity-50">
        <h2 className="text-2xl font-semibold mb-4">Email</h2>
        <input
          name="title"
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email..."
          maxLength={35}
          minLength={0}
        />
        <h2 className="text-2xl font-semibold mb-4">Password</h2>

        <MyTextarea
          size="base"
          name="text"
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
    </>
  );
};

export default SignIn;
