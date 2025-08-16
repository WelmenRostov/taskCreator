import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { setPagination } from '../postReducer/postReducer';
import { fetchPostsThunk } from '../postReducer/postThunks';

export function Pagination() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, limit, page, totalPage } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch(fetchPostsThunk({ page, limit, filter: status }));
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
