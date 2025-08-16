import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post, TStatus } from '../../types/types';
import type { PostState } from './postReducerTypes';
import { createPostThunk, fetchPostsThunk, updatePostThunk } from './postThunks';

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
  extraReducers: (builder) => {
    builder.addCase(fetchPostsThunk.pending, (state) => {
      state.loading = 'process';
    });
    builder.addCase(fetchPostsThunk.fulfilled, (state, action) => {
      state.loading = 'uploaded';
      state.posts = action.payload.data;
      state.page = action.payload.page;
      state.totalPage = action.payload.totalPages;
    });

    builder.addCase(fetchPostsThunk.rejected, (state) => {
      state.loading = 'error';
    });

    builder.addCase(createPostThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.posts.push(action.payload);
      }
    });

    builder.addCase(updatePostThunk.fulfilled, (state, action) => {
      if (!action.payload) return;
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    });
  },
});

export const { setPosts, addPost, setPagination, updatePost, removePost, setStatus, setLimit } = postSlice.actions;

export default postSlice.reducer;
