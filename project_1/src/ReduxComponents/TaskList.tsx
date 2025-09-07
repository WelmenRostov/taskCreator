import ParameterViewingPanel from './ViewParametrPanel';
import ViewTasks from './ViewTasks';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState2 } from '../app/store';
import { useEffect } from 'react';
import { fetchTodos } from './features/todos/todoSlice';
import PostItem from './PostItem';

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, status, error } = useSelector((state: RootState2) => state.todo);

  useEffect(() => {
    dispatch(fetchTodos({ page: 1, limit: 10, filter: 'pending' }));
  }, [dispatch]);

  useEffect(() => {
    console.log('Todos:', items);
  }, [items]);

  const LoadingComponent = (
    <div className="h-screen w-auto">
      Бабах
      <div className="flex justify-center items-center mt-10 mb-10">
        <span className="w-[100px] loading loading-spinner loading-xl mt-[60%]"></span>
      </div>
    </div>
  );

  return (
    <>
      <div className="h-full">
        <ViewTasks />
        <ParameterViewingPanel />
      </div>

      {status === 'succeeded' ? (
        <>
          {items.length !== 0 ? (
            items.map((post, count: number) => <PostItem key={post.id} {...post} index={count} />)
          ) : (
            <div className="p-10 place-self-center">
              <h1>Задачи отсутствуют...</h1>
            </div>
          )}
        </>
      ) : status === 'loading' ? (
        LoadingComponent
      ) : status === 'failed' ? (
        <p>Ошибка: {error}</p>
      ) : (
        <p>Ошибка: {error}</p>
      )}
    </>
  );
};

export default TaskList;
