import MyButton from './UI/button/MyButton';
import ToggleDarkMode from './darkMode/ToggleDarkMode';
import { NavLink, Outlet } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <div className="relative bg-gray-200 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-t-[1vw]  p-2 outline-black/5 dark:bg-gray-800 bg-opacity-10 h-auto w-auto flex gap-x-2 justify-between">
        <div className="flex gap-x-2">
          <NavLink to="userprofile">
            {({ isActive }) => (
              <MyButton className={`btn btn-soft ${isActive ? '!bg-indigo-700' : ''}`}>Профиль</MyButton>
            )}
          </NavLink>
          <NavLink to="tasks">
            {({ isActive }) => (
              <MyButton className={`btn btn-soft ${isActive ? '!bg-indigo-700' : ''}`}>Задачи</MyButton>
            )}
          </NavLink>
          <NavLink to="redux">
            {({ isActive }) => (
              <MyButton className={`btn btn-soft ${isActive ? '!bg-indigo-700' : ''}`}>Настройки</MyButton>
            )}
          </NavLink>
          <NavLink to="/">
            {({ isActive }) => (
              <MyButton className={`btn btn-soft ${isActive ? '!bg-indigo-700' : ''}`}>Информация</MyButton>
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
