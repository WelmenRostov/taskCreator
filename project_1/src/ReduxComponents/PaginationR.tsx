import { useDispatch, useSelector } from 'react-redux';
import type { RootState2, AppDispatch } from '../app/store';
import { setPage } from './features/todos/todoSlice';
import { fetchTodos } from './features/todos/todoThunk';

export function PaginationR() {
  const dispatch = useDispatch<AppDispatch>();
  const { page, limit, totalPages, filterStatus } = useSelector((state: RootState2) => state.todo);

  // Приводим к типу, который ожидает fetchTodos
  const filter: 'pending' | 'fulfilled' | 'rejected' =
    filterStatus === 'pending' || filterStatus === 'fulfilled' || filterStatus === 'rejected'
      ? filterStatus
      : 'pending';

  const handleNext = () => {
    const nextPage = Math.min(page + 1, totalPages);
    if (nextPage !== page) {
      dispatch(setPage(nextPage));
      dispatch(fetchTodos({ page: nextPage, limit, filter }));
    }
  };

  const handlePrev = () => {
    const prevPage = Math.max(page - 1, 1);
    if (prevPage !== page) {
      dispatch(setPage(prevPage));
      dispatch(fetchTodos({ page: prevPage, limit, filter }));
    }
  };

  return (
    <div className="absolute pagination left-1/2 -translate-x-1/2 -mt-[10px]">
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
