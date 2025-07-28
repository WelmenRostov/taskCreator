import React from 'react';
import Navigation from './components/Navigation.tsx';
import TaskForm from './components/TaskForm.tsx';
import PostList from './components/PostList.tsx';
import { PostProvider } from './context/PostContext';

export const App: React.FC = () => {
  return (
    <PostProvider>
      <div className={'max-w-[1074px] m-auto'}>
        <Navigation />
        <div
          className={
            'relative bg-indigo-500 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-[1vw] m-[30px] pl-3 pr-2 outline-black/5 bg- dark:bg-gray-800 bg-opacity-10 h-auto w-auto'
          }
        >
          <PostList />
        </div>
        <TaskForm />
      </div>
    </PostProvider>
  );
};
