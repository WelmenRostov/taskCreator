import { createAsyncThunk } from '@reduxjs/toolkit';
import { activEditorAPI, addNewTaskAPI, fetchTodosAPI, saveEditorAPI } from '../../API/todoAPI';
import type { SaveEditorParams } from '../../type/type';

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (params: { page: number; limit: number; filter: 'pending' | 'fulfilled' | 'rejected' | 'all' }, thunkAPI) => {
    try {
      return await fetchTodosAPI(params.page, params.limit, params.filter);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const saveEditor = createAsyncThunk('todo/editor', async ({ id, title, text }: SaveEditorParams, thunkAPI) => {
  try {
    // Выполняем запрос на сервер (обновление поста)
    await saveEditorAPI(id, title, text);

    // Возвращаем только необходимые данные (id, title, text) для обновления состояния в Redux
    return { id, title, text };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return thunkAPI.rejectWithValue(message);
  }
});

export const activEditor = createAsyncThunk('todo/activEditor', async ({ id }: SaveEditorParams, thunkAPI) => {
  try {
    // Выполняем запрос на сервер (обновление поста)
    await activEditorAPI(id);

    // Возвращаем только необходимые данные (id, title, text) для обновления состояния в Redux
    return { id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return thunkAPI.rejectWithValue(message);
  }
});

export const addNewTask = createAsyncThunk(
  'todo/addNewTask',
  async ({ text, title }: { text: string; title: string }, thunkAPI) => {
    try {
      const newTask = await addNewTaskAPI(title, text);
      return newTask;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return thunkAPI.rejectWithValue(message);
    }
  }
);
