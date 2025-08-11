import React from 'react';
import Navigation from './components/Navigation';
import TaskForm from './components/TaskForm';
import PostList from './components/PostList';
import { PostProvider } from './context/PostProvider';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Counter } from './features/counter/Counter';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PostProvider>
        <div className="max-w-[1074px] min-w-[675px] m-auto">
          <Navigation />
          <div className="relative bg-indigo-500 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-[1vw] m-[30px] pl-3 pr-2 outline-black/5 dark:bg-gray-800 bg-opacity-10 h-auto w-auto">
            <PostList />
          </div>
          <TaskForm />
          <Counter />
        </div>
      </PostProvider>
    </Provider>
  );
};
