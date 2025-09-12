import { colorBase, colorShadow } from '../type/type';
import MyButton from '../../components/UI/button/MyButton';
import type { Post } from '../../types/types';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { activEditor } from '../features/todos/todoThunk';
import React from 'react';
import { motion } from 'framer-motion';

interface Props extends Omit<Post, 'status'> {
  order: number;
}

const PostItemPending = React.memo(({ id, title, text, data, order }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleEditing = () => {
    dispatch(activEditor({ id }));
  };
  return (
    <>
      <motion.div>
        <div
          key={id}
          className={`rounded-[1vw] mb-5 p-5 outline-black/5 bg-opacity-10 overflow-hidden resize-none ${colorBase} ${colorShadow}`}
        >
          <h1 className={'break-words text-[30px]'}>
            {order}. {title}
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
            <MyButton className={'btn btn-soft m-2 -mr-[40px] col-end-3'} onClick={() => handleEditing()}>
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
      </motion.div>
    </>
  );
});

export default PostItemPending;
