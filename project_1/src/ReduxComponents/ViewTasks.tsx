import { usePostContext } from '../context/usePostContext';
import MyButton from '../components/UI/button/MyButton';
import { colorBase } from './type/type';

const ViewTasks = () => {
  const { setModal } = usePostContext();

  return (
    <div className={`flex gap-x-2 mt-2 ${colorBase}`}>
      <MyButton className={'btn btn-square btn-soft'} onClick={() => setModal(true)}>
        +
      </MyButton>
      <MyButton className="btn btn-soft">Активные</MyButton>
      <MyButton className="btn btn-soft">Выполненные задачи</MyButton>
      <MyButton className="btn btn-soft">Удаленные</MyButton>
    </div>
  );
};

export default ViewTasks;
