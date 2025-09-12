import { useDispatch, useSelector } from 'react-redux';
import type { RootState2, AppDispatch } from '../app/store';
import { setPage } from './features/todos/todoSlice';
import { fetchTodos } from './features/todos/todoThunk';

export function PaginationR() {
  const dispatch = useDispatch<AppDispatch>();
  const { page, limit, totalPages } = useSelector((state: RootState2) => state.todo);

  const handlePrev = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
      dispatch(fetchTodos({ page: page - 1, limit, filter: 'pending' }));
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      dispatch(setPage(page + 1));
      dispatch(fetchTodos({ page: page + 1, limit, filter: 'pending' }));
    }
  };

  return (
    <div className="absolute pagination left-1/2 -translate-x-1/2 mt-2">
      <div className="flex items-center gap-2">
        <button className="btn bg-indigo-800" onClick={handlePrev} disabled={page === 1}>
          «
        </button>
        <span className="btn bg-indigo-800">
          Страница {page} из {totalPages}
        </span>
        <button className="btn bg-indigo-800" onClick={handleNext} disabled={page === totalPages}>
          »
        </button>
      </div>
    </div>
  );
}
