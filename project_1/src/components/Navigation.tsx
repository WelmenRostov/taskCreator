import MyButton from './UI/button/MyButton';
import ToggleDarkMode from './darkMode/ToggleDarkMode';
import { NavLink, Outlet } from 'react-router-dom';
import { colorBase, colorShadow } from '../ReduxComponents/type/type';

const Navigation = () => {
  return (
    <>
      <div
        className={`relative shadow-lg  border-2  rounded-t-[1vw]  p-2 outline-black/5  bg-opacity-10 h-auto w-auto flex gap-x-2 justify-between ${colorBase} ${colorShadow}`}
      >
        <div className="flex gap-x-2">
          <NavLink to="/user/profile">
            {({ isActive }) => (
              <MyButton className={`btn btn-soft ${isActive ? 'dark:bg-indigo-700' : ''}`}>Профиль</MyButton>
            )}
          </NavLink>
          <NavLink to="/user/tasks">
            {({ isActive }) => (
              <MyButton className={`btn btn-soft ${isActive ? 'dark:bg-indigo-700' : ''}`}>Настройки</MyButton>
            )}
          </NavLink>
          <NavLink to="/user/redux">
            {({ isActive }) => (
              <MyButton className={`btn btn-soft ${isActive ? 'dark:bg-indigo-700' : ''}`}>Задачи</MyButton>
            )}
          </NavLink>
          <NavLink to="/registration">
            {({ isActive }) => (
              <MyButton className={`btn btn-soft ${isActive ? 'dark:bg-indigo-700' : ''}`}>Информация</MyButton>
            )}
          </NavLink>
        </div>

        <div className="flex items-center justify-end">
          <ToggleDarkMode />
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Navigation;
