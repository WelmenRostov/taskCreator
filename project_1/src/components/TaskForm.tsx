import { type FormEvent, useRef } from 'react';
import MyButton from './UI/button/MyButton.tsx';
import clsx from 'clsx';
import MyTextarea from './UI/textarear/MyTextarea';
import { useAppDispatch, usePostContext } from '../context/usePostContext';
import { createPostThunk } from '../features/postReducer/postThunks';

const TaskForm = () => {
  const { modal, setModal, handleAddPost } = usePostContext();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const dispatch = useAppDispatch(); // <- типизированный dispatch
  // Функция для изменения высоты textarea по мере ввода
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      if ('style' in textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      if ('style' in textareaRef.current) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  };

  const setModalFunctyon = (): void => {
    setModal(false);
  };

  const visibleStatus = clsx('', {
    hidden: !modal,
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const title = form.elements.namedItem('title') as HTMLInputElement;
    const text = form.elements.namedItem('text') as HTMLTextAreaElement;

    if (!title.value.trim() || !text.value.trim()) {
      e.preventDefault();
      return;
    }
    const result = await dispatch(createPostThunk({ title: title.value, text: text.value })).unwrap();
    if (result) {
      title.value = '';
      text.value = '';
      return;
    }

    handleAddPost({
      title: title.value,
      text: text.value,
      count: 1,
      data: new Date().toISOString(),
      status: 'pending',
      id: +new Date(),
      editable: false,
    });
    e.preventDefault();
    title.value = '';
    text.value = '';
  };

  return (
    <div className="">
      <form onSubmit={onSubmit} className={`${visibleStatus} z-10`}>
        <div
          onClick={setModalFunctyon}
          className="overflow-hidden resize-none absolute top-0 left-0 w-full h-full bg-indigo-950 opacity-55 backdrop-blur-sm"
        ></div>
        <div className="bg-indigo-500 shadow-lg shadow-indigo-500/50 w-[400px] item-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-indigo-600 rounded-4xl max-w-sm mx-auto p-6 outline-black/5 dark:bg-gray-800 bg-opacity-50">
          <h2 className="text-2xl font-semibold text-center mb-4">Задача:</h2>
          <input
            name="title"
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите название..."
            maxLength={35}
            minLength={0}
          />
          <h2 className="text-2xl font-semibold text-center mb-4">Содержание:</h2>
          <MyTextarea
            size="base"
            ref={textareaRef}
            name="text"
            className="min-h-[50px] w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden resize-none"
            placeholder="Введите описание..."
            rows={1}
            onInput={adjustTextareaHeight}
          ></MyTextarea>
          <div className="flex items-center justify-center">
            <MyButton className={'btn btn-soft w-[160px] bg-indigo-500'} type="submit" color="blue">
              Отправить
            </MyButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
