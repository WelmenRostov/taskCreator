import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos, createTodos, patchTodos } from '../../api/todos';
import type { TStatus } from '../../types/types';

export const fetchPostsThunk = createAsyncThunk(
  'post/fetchTodos',
  async ({ page, limit, filter }: { page: number; limit: number; filter: TStatus }, thunkAPI) => {
    try {
      const data = await fetchTodos(page, limit, filter);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Ошибка при создании ${error}`);
    }
  }
);

export const createPostThunk = createAsyncThunk(
  'post/createPost',
  async ({ title, text }: { title: string; text: string }, thunkAPI) => {
    try {
      const data = await createTodos(title, text);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Ошибка при создании ${error}`);
    }
  }
);

export const updatePostThunk = createAsyncThunk(
  'post/updatePost',
  async ({ id, title, text, status }: { id: number; title?: string; text?: string; status?: string }, thunkAPI) => {
    try {
      const data = await patchTodos(id, title, text, status);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Ошибка при обновлении поста: ${error}`);
    }
  }
);
