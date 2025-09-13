import { type FormEvent, useEffect, useRef } from 'react';
import MyButton from './UI/button/MyButton.tsx';
import MyTextarea from './UI/textarear/MyTextarea';

const TaskForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const title = form.elements.namedItem('title') as HTMLInputElement;
    const text = form.elements.namedItem('text') as HTMLTextAreaElement;

    if (!title.value.trim() || !text.value.trim()) return;
  };

  const visibleStatus = 'hidden';

  useEffect(() => {
    const mam = false;
    if (mam) {
      // запретить скролл
      document.body.style.overflow = '';
    } else {
      // вернуть как было
      document.body.style.overflow = '';
    }

    // на всякий случай очистка при размонтировании
    return () => {
      document.body.style.overflow = '';
    };
  });
  return (
    <div className={`${visibleStatus}`}>
      <form onSubmit={onSubmit} className={`z-10`}>
        <div className="overflow-hidden resize-none fixed top-0 left-0 w-full h-[200%] bg-indigo-950 opacity-85 "></div>
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
