import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage для веба

import todoSlice from '../ReduxComponents/features/todos/todoSlice';
import userSlice from '../ReduxComponents/features/user/authSlice';

// объединяем редьюсеры
const rootReducer = combineReducers({
  todo: todoSlice,
  user: userSlice,
});

// конфиг для persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todo', 'user'], // сохраняем только эти редьюсеры
};

// оборачиваем rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// создаём store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// создаём persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState2 = ReturnType<typeof store.getState>;
