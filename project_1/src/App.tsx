import React, { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import TaskForm from './components/TaskForm';
import { PostProvider } from './context/PostProvider';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Pagination } from './features/counter/Pagination';

const PostList = lazy(() => import('./components/PostList'));

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PostProvider>
        <div className="max-w-[1074px] min-w-[675px] m-auto">
          <Navigation />
          <div className="relative bg-indigo-500 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-[1vw] m-[30px] pl-3 pr-2 outline-black/5 dark:bg-gray-800 bg-opacity-10 h-auto w-auto">
            <Suspense fallback={<div>Загрузка постов...</div>}>
              <PostList />
            </Suspense>
          </div>
          <TaskForm />
          <Pagination />
        </div>
      </PostProvider>
    </Provider>
  );
};
