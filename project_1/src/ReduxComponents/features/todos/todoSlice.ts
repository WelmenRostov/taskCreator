import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Post } from '../../type/type';
import { fetchTodos as fetchTodosApi } from '../../API/todoAPI';

type TodoState = {
  items: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalPages: number;
  page: number;
};

const initialState: TodoState = {
  items: [],
  status: 'idle',
  error: null,
  totalPages: 0,
  page: 1,
};

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (params: { page: number; limit: number; filter: 'pending' | 'fulfilled' | 'rejected' | 'all' }, thunkAPI) => {
    try {
      return await fetchTodosApi(params.page, params.limit, params.filter);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default todoSlice.reducer;
