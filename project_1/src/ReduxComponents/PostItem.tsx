import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';
import { saveEditor, activEditor } from './features/todos/todoThunk';
import type { Post } from '../types/types';
import MyTextarea from '../components/UI/textarear/MyTextarea';
import MyButton from '../components/UI/button/MyButton';
import { colorBase, colorShadow } from './type/type';

interface PostItemProps extends Post {
  order: number;
}

const PostItem = ({ id, title: initialTitle, text: initialText, data, editable, order }: PostItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setTitle(initialTitle);
    setText(initialText);
  }, [initialTitle, initialText]);

  const handleSave = () => {
    dispatch(saveEditor({ id, title, text }));
  };

  const handleCancel = () => {
    dispatch(saveEditor({ id })); // снимаем editable
  };

  const handleEdit = () => {
    dispatch(activEditor({ id }));
  };

  return (
    <>
      <motion.div
        layout
        initial={false}
        animate={{
          borderColor: editable ? '#facc15' : '#3b82f6',
          scale: editable ? 1.0 : 1.0,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div
          className={`rounded-[1vw] mb-5 p-5 outline-black/5 bg-opacity-10 overflow-hidden resize-none ${
            editable
              ? 'bg-gray-800/30 shadow-lg shadow-orange-400/50 border-2 border-orange-400'
              : `${colorBase} ${colorShadow} border-2 border-blue-500`
          }`}
        >
          <h1 className="break-words text-[30px] flex items-start">
            {order}.
            {editable ? (
              <MyTextarea
                name="title"
                type="title"
                value={title}
                text={title}
                onChange={(e) => setTitle(e.target.value)} // Используем универсальный обработчик
                className="text-gray-300 mb-1 w-full ml-[10px] -mt-[1px] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 overflow-hidden resize-none"
              />
            ) : (
              <span className="ml-2 overflow-scroll">{initialTitle}</span>
            )}
          </h1>

          {editable ? (
            <MyTextarea
              size="base"
              value={text}
              text={text}
              onChange={(e) => setText(e.target.value)} // Используем универсальный обработчик
              className="rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-orange-300 overflow-hidden resize-none "
            />
          ) : (
            <p className="min-h-[50px] w-full pt-2 overflow-x-auto resize-none flex-grow break-words">{initialText}</p>
          )}

          <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 justify-items-end mt-3">
            {editable ? (
              <>
                <MyButton className="btn btn-soft m-2 -mr-[40px] col-end-3" onClick={handleSave}>
                  Сохранить
                </MyButton>
                <MyButton className="btn btn-soft w-[100px] ml-[50px] m-2 col-end-4 row-end-1" onClick={handleCancel}>
                  Отмена
                </MyButton>
              </>
            ) : (
              <>
                <MyButton className="btn btn-soft m-2 col-end-1 row">Выполнена</MyButton>
                <MyButton className="btn btn-soft m-2 -mr-[40px] col-end-3" onClick={handleEdit}>
                  Изменить
                </MyButton>
                <MyButton className="btn btn-soft w-[100px] m-2 col-end-4 row-end-1">Удалить</MyButton>
              </>
            )}

            <p className="mr-2 col-end-4 row-end-3">
              {new Date(data).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
              {new Date(data).toDateString()}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PostItem;
