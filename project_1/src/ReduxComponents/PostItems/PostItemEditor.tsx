import type { Post } from '../../types/types';
import MyTextarea from '../../components/UI/textarear/MyTextarea';
import MyButton from '../../components/UI/button/MyButton';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { saveEditor } from '../features/todos/todoThunk';

interface EditorProps extends Post {
  order: number;
}

const PostItemEditor = React.memo(({ id, data, order, title: initialTitle, text: initialText }: EditorProps) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [text, setText] = useState<string>(initialText);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setTitle(initialTitle);
    setText(initialText);
  }, [initialTitle, initialText]);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

  const handleSeveEditor = () => {
    dispatch(saveEditor({ id, title, text }));
  };
  const handleDontSaveEditor = () => {
    dispatch(saveEditor({ id }));
  };

  return (
    <div>
      <div
        className={
          'bg-gray-800/30 shadow-lg shadow-orange-400/50 border-2 border-orange-400 rounded-[1vw] mb-5 p-5 outline-black/5 dark:bg-gray-800 bg-opacity-10 overflow-hidden resize-none'
        }
      >
        <h1 className="flex text-[30px]">
          {order}.{' '}
          <MyTextarea
            name="title"
            type="title"
            value={title}
            text={title}
            onChange={handleChange(setTitle)} // Используем универсальный обработчик
            className="text-gray-300 mb-1 w-full ml-[15px] border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 overflow-hidden resize-none"
          />
        </h1>
        <MyTextarea
          size="base"
          value={text}
          text={text}
          onChange={handleChange(setText)} // Используем универсальный обработчик
          className="border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 overflow-hidden resize-none"
        />
        <div className={'grid grid-flow-row-dense grid-cols-1 grid-rows-1'}>
          <MyButton className={'btn btn-soft m-2 -mr-[40px] col-end-3'} onClick={handleSeveEditor}>
            Сохранить
          </MyButton>
          <MyButton
            className={'btn btn-soft w-[100px] ml-[50px] m-2 col-end-4 row-end-1 '}
            onClick={handleDontSaveEditor}
          >
            Отмена
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
    </div>
  );
});

export default PostItemEditor;
