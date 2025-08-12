import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { fetchTodos } from '../../api/todos';
import { setPagination, setPosts } from '../postReducer/postReducer';

export function Pagination() {
  const dispatch = useDispatch();
  const { status, limit, page, totalPage } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchTodos(page, limit, status);
        dispatch(setPosts(response.data));
        dispatch(setPagination({ page: response.page, totalPage: response.totalPages }));
      } catch (error) {
        console.error('Ошибка при загрузке с сервера.');
        return error;
      }
    };

    loadPosts();
  }, [dispatch, page, limit, status]);

  const handlePreviousPage = () => {
    if (page > 1) {
      dispatch(setPagination({ page: page - 1, totalPage }));
    }
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      dispatch(setPagination({ page: page + 1, totalPage }));
    }
  };

  return (
    <div className={'absolute pagination left-1/2 -translate-x-1/2'}>
      <div className="">
        <button className={'btn bg-indigo-800'} onClick={handlePreviousPage} disabled={page === 1}>
          «
        </button>
        <span className={'btn bg-indigo-800'}>
          Страница {page} из {totalPage}
        </span>
        <button className={'btn bg-indigo-800'} onClick={handleNextPage} disabled={page === totalPage}>
          »
        </button>
      </div>
    </div>
  );
}
