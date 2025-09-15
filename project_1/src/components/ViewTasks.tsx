import { useState } from 'react';
import MyButton from './UI/button/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState2 } from '../app/store';
import { setFilterStatus } from '../ReduxComponents/features/todos/todoSlice';
import { addNewTask } from '../ReduxComponents/features/todos/todoThunk';

const ViewTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentFilter = useSelector((state: RootState2) => state.todo.filterStatus);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  // Обработчик для кнопки добавления
  const handleAddClick = (e: React.FormEvent) => {
    setShowAddForm(!showAddForm);
    e.preventDefault();
  };

  const handlePostTask = (e: React.FormEvent) => {
    dispatch(addNewTask({ title, text })); // передаём объект
    setShowAddForm(false); // закрываем форму
    setTitle('');
    setText('');
    e.preventDefault();
    console.log('peq');
  };

  // Обработчик для установки фильтра
  const handleFilterClick = (status: 'pending' | 'fulfilled' | 'rejected') => {
    dispatch(setFilterStatus(status));
  };

  // Функция для проверки активного фильтра
  const isActiveFilter = (filterName: string) => {
    return currentFilter === filterName;
  };

  return (
    <div className={`view-tasks-container`}>
      <div className="flex gap-x-2 mt-2">
        {/* Кнопка добавления новой задачи */}
        <MyButton
          className={`btn btn-square btn-soft ${showAddForm ? 'active' : ''}`}
          onClick={handleAddClick}
          title="Добавить новую задачу"
        >
          {showAddForm ? '−' : '+'}
        </MyButton>

        {/* Кнопка активных задач */}
        <MyButton
          className={`btn btn-soft ${isActiveFilter('pending') ? 'dark:bg-indigo-700 bg-indigo-500 text-white' : ''}`}
          onClick={() => handleFilterClick('pending')}
        >
          Активные
        </MyButton>

        {/* Кнопка выполненных задач */}
        <MyButton
          className={`btn btn-soft ${isActiveFilter('fulfilled') ? 'dark:bg-indigo-700 bg-indigo-500 text-white' : ''}`}
          onClick={() => handleFilterClick('fulfilled')}
        >
          Выполненные
        </MyButton>

        {/* Кнопка удаленных задач */}
        <MyButton
          className={`btn btn-soft ${isActiveFilter('rejected') ? 'dark:bg-indigo-700 bg-indigo-500 text-white' : ''}`}
          onClick={() => handleFilterClick('rejected')}
        >
          Удаленные
        </MyButton>
      </div>

      {/* Контейнер для формы добавления (условный рендеринг) */}
      {showAddForm && (
        <div className={`add-form-container mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded`}>
          <h3 className="text-lg font-medium mb-3">Добавить новую задачу</h3>
          <form className="space-y-3">
            <div>
              <label htmlFor="taskTitle" className="block text-sm font-medium mb-1">
                Название задачи
              </label>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                id="taskTitle"
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Введите название задачи"
              />
            </div>
            <div>
              <label htmlFor="taskDescription" className="block text-sm font-medium mb-1">
                Описание задачи
              </label>
              <textarea
                onChange={(e) => setText(e.target.value)}
                id="taskDescription"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Введите описание задачи"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <MyButton
                type="button"
                className="px-4 py-2 text-sm bg-gray-300  rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200"
                onClick={() => setShowAddForm(false)}
              >
                Отмена
              </MyButton>
              <MyButton
                type="submit"
                className="px-4 py-2 text-sm bg-indigo-600 rounded-md hover:bg-indigo-700"
                onClick={handlePostTask}
              >
                Добавить
              </MyButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewTasks;
