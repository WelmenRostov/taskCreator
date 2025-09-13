import ParameterViewingPanel from './ViewParametrPanel';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState2 } from '../app/store';
import { useEffect } from 'react';
import { fetchTodos } from './features/todos/todoThunk';
import PostItem from './PostItem';
import LoadSpinner from '../components/LoadSpinner';
import { selectFilteredSortedPaginated } from './services/selectFilteredSortedPaginated';
import ViewTasks from '../components/ViewTasks';

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, page, filterStatus } = useSelector((state: RootState2) => state.todo);
  const tasks = useSelector(selectFilteredSortedPaginated);

  const limit = useSelector((state: RootState2) => state.todo.limit);
  useEffect(() => {
    dispatch(fetchTodos({ page: 1, limit, filter: filterStatus }));
  }, [dispatch, limit, filterStatus]);
  return (
    <>
      <ViewTasks />
      <div className="h-full">
        <ParameterViewingPanel />
      </div>
      {status === 'succeeded' ? (
        <>
          {tasks.length !== 0 ? (
            tasks.map((task, i) => (
              <PostItem
                key={task.id}
                {...task}
                order={(page - 1) * limit + i + 1} // <-- глобальная нумерация
              />
            ))
          ) : (
            <div className="p-10 place-self-center">
              <h1 className="text-4xl">
                Задачи отсутствуют
                <span className="loading loading-dots loading-md mt-[20px] gap-[20px]"></span>
              </h1>
            </div>
          )}
        </>
      ) : status === 'loading' ? (
        <LoadSpinner />
      ) : status === 'failed' ? (
        <p>Ошибка: {error}</p>
      ) : (
        <p>Ошибка: {error}</p>
      )}
    </>
  );
};

export default TaskList;
