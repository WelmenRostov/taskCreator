import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post } from '../../type/type';
import { activEditor, addNewTask, fetchTodos, saveEditor } from './todoThunk';

type TodoState = {
  items: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalPages: number;
  page: number;
  limit: number;
  filterStatus: string;
  searchText: string;
  sortBy: string;
};

const initialState: TodoState = {
  items: [],
  status: 'idle',
  error: null,
  totalPages: 0,
  page: 1,
  limit: 5, // 20 по умолчанию
  filterStatus: 'pending',
  sortBy: 'new',
  searchText: '',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
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
      })

      .addCase(addNewTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.unshift(action.payload); // добавляем задачу в начало
      });
  },
});

export const { addTodo, setPage, setFilterStatus, setLimit, setSearchText, setSortBy } = todoSlice.actions;
export default todoSlice.reducer;
