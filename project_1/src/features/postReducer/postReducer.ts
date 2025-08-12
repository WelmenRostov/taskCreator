import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post, TStatus } from '../../types/types';
import type { PostState } from './postReducerTypes';

const initialState: PostState = {
  posts: [],
  status: 'pending',
  limit: 5,
  loading: 'process',
  page: 1,
  totalPage: 1,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload.map((post) => ({
        ...post,
        data: new Date(post.data).toISOString(),
      }));
    },
    setPagination(state, action: PayloadAction<{ page: number; totalPage: number }>) {
      state.page = action.payload.page;
      state.totalPage = action.payload.totalPage;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts.push(action.payload);
    },
    updatePost(state, action: PayloadAction<Post>) {
      const index = state.posts.findIndex((post: { id: number }) => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    removePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((post: { id: number }) => post.id !== action.payload);
    },
    setStatus(state, action: PayloadAction<TStatus>) {
      state.status = action.payload;
      console.log('123');
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export const { setPosts, addPost, setPagination, updatePost, removePost, setStatus, setLimit } = postSlice.actions;

export default postSlice.reducer;
