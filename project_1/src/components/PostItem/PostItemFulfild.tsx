import type { Post } from '../../types/types';

interface Props extends Omit<Post, 'status'> {
  removePost: (index: number) => void;
  changeStatus: () => void;
  fulfilledStatus: () => void;
  index: number;
}

const PostItemfulFilled = ({ id, title, text, data, index }: Props) => {
  return (
    <form
      key={id}
      className={
        'bg-green-400 shadow-lg shadow-green-500/50 border-2 border-green-600 rounded-[1vw]  mb-5 p-5 outline-black/5 dark:bg-green-950 bg-opacity-10 overflow-hidden resize-none'
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
      <div className={'grid grid-flow-row-dense grid-cols-1 grid-rows-1 '}>
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

export default PostItemfulFilled;
