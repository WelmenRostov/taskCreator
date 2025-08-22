import MyButton from './UI/button/MyButton';
import { usePostContext } from '../context/usePostContext';

const ViewTasks = () => {
  const { setModal, status, handleStatus } = usePostContext();

  return (
    <div className="flex gap-x-2 mt-2">
      <MyButton className={'btn btn-square btn-soft'} onClick={() => setModal(true)}>
        +
      </MyButton>
      <MyButton className="btn btn-soft" onClick={() => handleStatus('pending')} isActive={status === 'pending'}>
        Активные
      </MyButton>
      <MyButton className="btn btn-soft" onClick={() => handleStatus('fulfilled')} isActive={status === 'fulfilled'}>
        Выполненные задачи
      </MyButton>
      <MyButton className="btn btn-soft" onClick={() => handleStatus('rejected')} isActive={status === 'rejected'}>
        Удаленные
      </MyButton>
    </div>
  );
};

export default ViewTasks;
