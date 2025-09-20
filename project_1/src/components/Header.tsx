import { useLoadUser } from '../ReduxComponents/hooks/useLoadUser';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../ReduxComponents/features/user/userThunk';
import type { AppDispatch } from '../app/store';
import { useLocalStorageCleaner } from '../ReduxComponents/hooks/useLocalStorageCleaner';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useLoadUser();
  const navigate = useNavigate();
  const { clearStorage } = useLocalStorageCleaner();

  // Функция выхода
  const handleLogout = () => {
    console.log('logout');
    clearStorage();
    dispatch(logoutUser());
    navigate('/signin');
  };

  return (
    <>
      <div
        className={
          'max-w-[1074px] min-w-[675px] m-auto bg-indigo-500 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-b-[1vw] pl-3 pr-2 outline-black/5 dark:bg-gray-800 bg-opacity-10 h-[80px] w-auto'
        }
      >
        <div className="flex justify-between items-center">
          <div>
            <>
              <h1 className="left-0 text-4xl">{user?.email}</h1>
            </>
          </div>

          <div className={'flex justify-end gap-5'}>
            <div className="flex flex-col items-end -mt-[5px]">
              <>
                <div className="flex flex-col items-end mt-[9px]">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring-2 ring-offset-2">
                      <img src={`${user?.profile}`} />
                    </div>
                  </div>
                  <button onClick={handleLogout}>Выйти</button>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
