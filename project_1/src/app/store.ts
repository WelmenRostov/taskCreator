import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postReducer from '../features/postReducer/postReducer';
import todoSlice from '../ReduxComponents/features/todos/todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    post: postReducer,
    todo: todoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState2 = ReturnType<typeof store.getState>;
