import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';
import type { RootState } from '../../app/store'; // путь до store.ts

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <div className="join flex items-center justify-center m-2">
          <button className="join-item btn bg-indigo-800" onClick={() => dispatch(decrement())}>
            «
          </button>
          <button className="join-item btn bg-indigo-700">{count}</button>
          <button className="join-item btn bg-indigo-800" onClick={() => dispatch(increment())}>
            »
          </button>
        </div>
      </div>
    </div>
  );
}
