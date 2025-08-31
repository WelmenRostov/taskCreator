import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postReducer from '../features/postReducer/postReducer';
import todoSlice from '../ReduxComponents/features/todos/todoSlice';
import userSlice from '../ReduxComponents/features/user/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    post: postReducer,
    todo: todoSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState2 = ReturnType<typeof store.getState>;
