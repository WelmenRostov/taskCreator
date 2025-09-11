import MyButton from '../components/UI/button/MyButton';
import type { Post } from '../types/types';
import { colorBase, colorShadow } from './type/type';

interface PostItemProps extends Post {
  index: number;
}

const PostItem = (props: PostItemProps) => {
  console.log(props);
  const { id, data, text, title, index } = props;

  return (
    <>
      <div
        key={id}
        className={`rounded-[1vw] mb-5 p-5 outline-black/5 bg-opacity-10 overflow-hidden resize-none ${colorBase} ${colorShadow}`}
      >
        <h1 className={'break-words text-[30px]'}>
          {index + 1}. {title}
        </h1>
        <p
          className={
            'min-h-[50px] w-full pt-2  focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-x-auto resize-none flex-grow break-words'
          }
        >
          {text}
        </p>
        <div className={'grid grid-flow-row-dense grid-cols-1 grid-rows-1 justify-items-end'}>
          <MyButton className={'btn btn-soft m-2 col-end-1 row'}>
            {/* onClick={fulfilledStatus}*/}
            Выполнена
          </MyButton>
          <MyButton className={'btn btn-soft m-2 -mr-[40px] col-end-3'}>
            {' '}
            {/*onClick={() => handleEdit(id)}*/}
            Изменить
          </MyButton>
          <MyButton className={'btn btn-soft w-[100px] m-2 col-end-4 row-end-1 '}>
            {' '}
            {/*onClick={rejectedStatus}*/}
            Удалить
          </MyButton>
          {/*<MyButton className={'m-2 col-end-4 row-end-1'} onClick={() => removePost(id)}>*/}
          {/*  Удалить*/}
          {/*</MyButton>*/}
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
    </>
  );
};

export default PostItem;
