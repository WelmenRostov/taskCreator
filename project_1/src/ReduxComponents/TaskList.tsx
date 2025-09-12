import ParameterViewingPanel from './ViewParametrPanel';
import ViewTasks from './ViewTasks';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState2 } from '../app/store';
import { useEffect } from 'react';
import { fetchTodos } from './features/todos/todoThunk';
import PostItem from './PostItem';
import LoadSpinner from '../components/LoadSpinner';

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState2) => state.todo);

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchTodos({ page: 1, limit: 10, filter: 'pending' }));
    }
  }, [dispatch, items]);

  return (
    <>
      <div className="h-full">
        <ViewTasks />
        <ParameterViewingPanel />
      </div>

      {status === 'succeeded' ? (
        <>
          {items.length !== 0 ? (
            items.map((post, i) => (
              <PostItem key={post.id} {...post} order={i + 1} /> // 👈 добавляем order
            ))
          ) : (
            <div className="p-10 place-self-center">
              <h1>Задачи отсутствуют...</h1>
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
