import type { Post } from '../../types/types';
import MyTextarea from '../UI/textarear/MyTextarea';
import MyButton from '../UI/button/MyButton';
import React from 'react';

interface EditorProps extends Post {
  handleSave: () => void;
  handleSetEditableTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSetEditableText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  editableTitle: string;
  editableText: string;
  index: number;
  handleNoSave: () => void;
}

const PostItemEditor = ({
  index,
  handleSave,
  handleSetEditableTitle,
  handleSetEditableText,
  editableTitle,
  editableText,
  handleNoSave,
  data,
}: EditorProps) => {
  return (
    <div>
      <div
        className={
          'bg-indigo-500 shadow-lg shadow-orange-400/50 border-2 border-orange-400 rounded-[1vw]  mb-5 p-5 outline-black/5 dark:bg-gray-800 bg-opacity-10 overflow-hidden resize-none'
        }
      >
        <h1 className={'flex'}>
          {index + 1}.
          <MyTextarea
            name="title"
            type="text"
            className="text-gray-300 mb-1 w-full ml-[15px] border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 overflow-hidden resize-none"
            value={editableTitle}
            text={editableTitle}
            onChange={handleSetEditableTitle}
          />
        </h1>
        <MyTextarea
          text={editableText} // Используем локальное состояние
          size="base"
          className="border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 overflow-hidden resize-none"
          value={editableText} // Используем локальное состояние
          onChange={handleSetEditableText} // Обновляем локальное состояние
        />
        <div className={'grid grid-flow-row-dense grid-cols-1 grid-rows-1'}>
          <MyButton className="m-2 col-end-3 row" onClick={handleSave}>
            Сохранить
          </MyButton>

          <MyButton className="m-2 col-end-4 row-end-1" onClick={handleNoSave}>
            Отмена
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
      </div>
    </div>
  );
};

export default PostItemEditor;
