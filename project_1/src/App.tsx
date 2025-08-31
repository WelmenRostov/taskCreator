import React, { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import TaskForm from './components/TaskForm';
import { PostProvider } from './context/PostProvider';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Pagination } from './features/counter/Pagination';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import TaskList from './ReduxComponents/TaskList';
import { colorBase, colorShadow } from './ReduxComponents/type/type';
import SignIn from './components/SignIn';
import Registration from './components/Registration';

const PostList = lazy(() => import('./components/PostList'));

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PostProvider>
        <div className="mx-10">
          <Header />
          <div className="max-w-[1074px] min-w-[675px] m-auto mt-[30px]">
            <Routes>
              <Route path="signin" element={<SignIn />} />
              <Route path="registration" element={<Registration />} />
              <Route path="/base" element={<Navigation />}>
                <Route
                  path="redux"
                  element={
                    <>
                      <div
                        className={`relative rounded-b-[1vw] pl-3 pr-2 outline-black/5 bg-opacity-10 h-auto w-auto ${colorBase} ${colorShadow}`}
                      >
                        <TaskList />
                      </div>
                      <Pagination />
                      <TaskForm />
                    </>
                  }
                />
                <Route
                  path="tasks"
                  element={
                    <>
                      <div className="relative bg-indigo-500 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-b-[1vw] pl-3 pr-2 outline-black/5 dark:bg-gray-800 bg-opacity-10 h-auto w-auto">
                        <Suspense
                          fallback={
                            <div className="flex justify-center items-center mt-10 mb-10">
                              <span className="w-[100px] loading loading-spinner loading-xl"></span>
                            </div>
                          }
                        >
                          <PostList />
                        </Suspense>
                      </div>
                      <Pagination />
                      <TaskForm />
                    </>
                  }
                />
                <Route
                  path="userprofile"
                  element={
                    <div
                      className={`h-screen ${colorBase} ${colorShadow} rounded-b-[1vw] flex justify-center items-center`}
                    >
                      <div className="flex justify-center items-center mt-10 mb-10">
                        <span className="w-[100px] loading loading-spinner loading-xl"></span>
                      </div>
                    </div>
                  }
                />
                {/* Роут по умолчанию при ошибке внутри /base */}
                <Route
                  path="*"
                  element={
                    <div className="flex justify-center items-center mt-10 mb-10">
                      <span className="w-[100px] loading loading-spinner loading-xl"></span>
                    </div>
                  }
                />
              </Route>
              {/* Можно добавить редирект или страницу вне /base, если нужно */}
            </Routes>
          </div>
        </div>
      </PostProvider>
    </Provider>
  );
};
