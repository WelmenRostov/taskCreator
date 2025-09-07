import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const userInfo = useSelector((state: RootState) => state.user.user);
  const [user, setUser] = useState({ name: userInfo.login, email: userInfo.email });

  // Функция выхода
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser({ name: userInfo.login, email: userInfo.email });
  };

  return (
    <>
      <div
        className={
          'max-w-[1074px] min-w-[675px] m-auto bg-indigo-500 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-b-[1vw] pl-3 pr-2 outline-black/5 dark:bg-gray-800 bg-opacity-10 h-[80px] w-auto'
        }
      >
        <div className="flex justify-between items-center mt-1">
          <div>
            {isAuthenticated ? (
              <>
                <p className="left-0 text-2xl">{user?.name}</p>
                <hr />
                <p className="left-0 text-1xl">{user?.email}</p>
              </>
            ) : (
              <>
                <p className="left-0 text-2xl">Не авторизован</p>
                <hr />
              </>
            )}
          </div>

          <div className={'flex justify-end gap-5'}>
            <div className="flex flex-col items-end -mt-[5px]">
              {isAuthenticated ? (
                <>
                  <div className="flex flex-col items-end mt-[9px]">
                    <div className="avatar">
                      <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring-2 ring-offset-2">
                        <img src="https://i.ytimg.com/vi/bm1H0wzV2K8/maxresdefault.jpg" />
                      </div>
                    </div>
                    <p onClick={handleLogout}>Выйти</p>
                  </div>
                </>
              ) : (
                <>
                  <p>Регистрация</p>
                  <NavLink to="signin">
                    {' '}
                    <p>Вход</p>{' '}
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
