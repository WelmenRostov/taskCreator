import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post } from '../../type/type';
import { activEditor, fetchTodos, saveEditor } from './todoThunk';

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

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Post>) => {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Загружаем список
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
      })

      // Сохраняем изменения (редактор)
      .addCase(saveEditor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, title, text } = action.payload;

        const index = state.items.findIndex((p) => p.id === id);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            title: title || state.items[index].title,
            text: text || state.items[index].text,
            editable: false,
          };
        }
      })

      // Активируем редактор
      .addCase(activEditor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id } = action.payload;

        const index = state.items.findIndex((p) => p.id === id);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            editable: true,
          };
        }
      });
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
