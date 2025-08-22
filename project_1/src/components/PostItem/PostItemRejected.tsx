import MyButton from '../UI/button/MyButton';
import type { Post } from '../../types/types';

interface Props extends Omit<Post, 'status'> {
  recoverStatus: () => void;
  fulfilledStatus: () => void;
  index: number;
}

const PostItemPending = ({ id, title, text, data, index, recoverStatus }: Props) => {
  return (
    <div
      key={id}
      className={
        'bg-red-600 shadow-lg shadow-red-500/50 border-2 border-red-600 rounded-[1vw] mb-5 p-5 outline-black/5 dark:bg-red-950 bg-opacity-10 overflow-hidden resize-none'
      }
    >
      <h1 className={'break-words text-[30px]'}>
        {index + 1}. {title}
      </h1>
      <p
        className={
          'min-h-[50px] w-full pt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-x-auto resize-none flex-grow break-words'
        }
      >
        {text}
      </p>
      <div className={'grid grid-flow-row-dense grid-cols-1 grid-rows-1'}>
        <MyButton className={'btn btn-soft m-2 col-end-4 row-end-1'} onClick={recoverStatus}>
          Восстановить
        </MyButton>
        <p className={'mr-2 col-end-4 row-end-3'}>
          {new Date(data).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }) +
            ' ' +
            new Date(data).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default PostItemPending;
