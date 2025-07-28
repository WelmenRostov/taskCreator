import MyButton from './UI/button/MyButton.tsx';
import { usePostContext } from '../context/usePostContext';
import ToggleDarkMode from './darkMode/ToggleDarkMode';

const Navigation = () => {
  const { setModal, status, handleStatus } = usePostContext();

  return (
    <div className="relative bg-gray-200 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-[1vw] m-[30px] -mb-[30px] p-2 outline-black/5 dark:bg-gray-800 bg-opacity-10 h-auto w-auto flex gap-x-2 justify-between">
      <div className="flex gap-x-2">
        <MyButton className={'!border-2 !border-indigo-600'} onClick={() => setModal(true)}>
          +
        </MyButton>
        <MyButton onClick={() => handleStatus('pending')} isActive={status === 'pending'}>
          Активные
        </MyButton>
        <MyButton onClick={() => handleStatus('fulfilled')} isActive={status === 'fulfilled'}>
          Выполненные задачи
        </MyButton>
        <MyButton onClick={() => handleStatus('rejected')} isActive={status === 'rejected'}>
          Удаленные
        </MyButton>
      </div>

      <div className="flex items-center justify-end">
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default Navigation;
