import Header from '../../components/Header';
import { Route, Routes } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import { colorBase, colorShadow } from '../type/type';
import TaskList from '../TaskList';
import { Pagination } from '../../features/counter/Pagination';
import TaskForm from '../../components/TaskForm';
import { lazy, Suspense } from 'react';
import Profile from '../../components/Profile';

const PostList = lazy(() => import('../../components/PostList'));

const UserPage = () => {
  return (
    <>
      <div className="mx-10 ">
        <Header />
        <div className="max-w-[1074px] min-w-[675px] m-auto mt-[30px]">
          <Navigation />
          <Routes>
            <Route
              path="redux"
              element={
                <>
                  <div
                    className={`relative rounded-b-[1vw] pl-3 pr-2 outline-black/5 bg-opacity-10 h-auto w-auto ${colorBase} ${colorShadow} overflow-hidden mb-[20px]`}
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
                  <div className="relative bg-indigo-500 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-b-[1vw] pl-3 pr-2 outline-black/5 dark:bg-gray-800 bg-opacity-10 h-auto w-auto overflow-hidden mb-[20px]">
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
              path="profile"
              element={
                <div className={` ${colorBase} ${colorShadow} rounded-b-[1vw] border-t-0  mb-[20px] pb-5 h-auto`}>
                  <Profile />
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
          </Routes>
        </div>
      </div>
    </>
  );
};

export default UserPage;
