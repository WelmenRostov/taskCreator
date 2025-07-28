import MyButton from '../UI/button/MyButton';
import type { Post } from '../../types/types';

interface Props extends Omit<Post, 'status'> {
  // removePost: (index: number) => void;
  changeStatus: () => void;
  fulfilledStatus: () => void;
  rejectedStatus: () => void;
  index: number;
}

const PostItemPending = ({ fulfilledStatus, id, title, text, data, changeStatus, index, rejectedStatus }: Props) => {
  return (
    <div
      key={id}
      className={
        'bg-indigo-500 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-[1vw] mb-5 p-5 outline-black/5 dark:bg-gray-800 bg-opacity-10 overflow-hidden resize-none'
      }
    >
      <h1 className={'break-words'}>
        {index + 1}. {title}
      </h1>
      <p
        className={
          'min-h-[50px] w-full pt-2 rounded-[1vw] focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-x-auto resize-none flex-grow break-words'
        }
      >
        {text}
      </p>
      <div className={'grid grid-flow-row-dense grid-cols-1 grid-rows-1 '}>
        <MyButton className={'m-2 col-end-1 row'} onClick={fulfilledStatus}>
          Выполнена
        </MyButton>
        <MyButton className={'m-2 col-end-3 row'} onClick={changeStatus}>
          Изменить
        </MyButton>
        <MyButton className={'m-2 col-end-4 row-end-1'} onClick={rejectedStatus}>
          Удалить
        </MyButton>
        {/*<MyButton className={'m-2 col-end-4 row-end-1'} onClick={() => removePost(id)}>*/}
        {/*  Удалить*/}
        {/*</MyButton>*/}
        <p className={'mr-2 col-end-4 row-end-3'}>
          {data.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }) +
            ' ' +
            data.toDateString()}
        </p>
      </div>
    </div>
  );
};

export default PostItemPending;
