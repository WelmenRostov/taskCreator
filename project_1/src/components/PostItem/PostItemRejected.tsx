import MyButton from '../UI/button/MyButton';
import type { Post } from '../../types/types';

interface Props extends Omit<Post, 'status'> {
  removePost: (index: number) => void;
  changeStatus: () => void;
  fulfilledStatus: () => void;
  index: number;
}

const PostItemPending = ({ id, title, text, data, index, removePost }: Props) => {
  return (
    <form
      key={id}
      className={
        'bg-red-600 shadow-lg shadow-red-500/50 border-2 border-red-600 rounded-[1vw] mb-5 p-5 outline-black/5 dark:bg-red-950 bg-opacity-10 overflow-hidden resize-none'
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
      <div className={'grid grid-flow-row-dense grid-cols-1 grid-rows-1'}>
        <MyButton className={'m-2 col-end-4 row-end-1'} onClick={() => removePost(id)}>
          Восстановить
        </MyButton>
        <p className={'mr-2 col-end-4 row-end-3'}>
          {data.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }) +
            ' ' +
            data.toDateString()}
        </p>
      </div>
    </form>
  );
};

export default PostItemPending;
