import MyButton from './UI/button/MyButton';
import ToggleDarkMode from './darkMode/ToggleDarkMode';

const Navigation = () => {
  return (
    <div className="relative bg-gray-200 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-[1vw] m-[30px] -mb-[30px] p-2 outline-black/5 dark:bg-gray-800 bg-opacity-10 h-auto w-auto flex gap-x-2 justify-between">
      <div className="flex gap-x-2">
        <MyButton className="btn btn-soft">Задачи</MyButton>
      </div>

      <div className="flex items-center justify-end">
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default Navigation;
