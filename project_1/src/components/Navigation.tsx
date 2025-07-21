
import MyButton from "./UI/button/MyButton.tsx";
import {usePostContext} from "../context/usePostContext";

const Navigation = () => {
    const {setModal} = usePostContext()
    return (
        <div className='relative bg-indigo-500 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-[1vw] m-[30px] -mb-[30px] p-2 outline-black/5 dark:bg-gray-800 bg-opacity-10 h-auto w-auto flex gap-x-2'>

            <MyButton onClick={() => setModal(true)}>Добавить задачу</MyButton>
            <MyButton>Задачи</MyButton>
            <MyButton>Выполненные задачи</MyButton>
        </div>
    );
};

export default Navigation;