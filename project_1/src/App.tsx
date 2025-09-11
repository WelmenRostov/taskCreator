import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Registration from './components/Registration';
import React from 'react';
import UserPage from './ReduxComponents/RoutersPage/UserPage';
import PrivateRoute from './components/PrivateRoute';
import Error404Page from './ReduxComponents/RoutersPage/Error404Page';

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="registration" element={<Registration />} />
        <Route
          path="/user/*"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </>
  );
};
