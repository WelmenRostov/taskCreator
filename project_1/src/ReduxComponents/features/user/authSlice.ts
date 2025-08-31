import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { userNewRegister } from './userThunk';

type TokenType = {
  accessToken?: string | null;
  refreshToken?: string | null;
};

export interface UserType {
  email: string;
  password: string;
  login: string;
  profile: 'default' | File;
  cover: 'default' | File;
  tokens?: TokenType;
}

type StateType = {
  user: UserType;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
};

const initialState: StateType = {
  user: {
    email: '',
    password: '',
    login: '',
    profile: 'default',
    cover: 'default',
    tokens: {
      accessToken: null,
      refreshToken: null,
    },
  },
  loading: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userNewRegister.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(userNewRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = 'succeeded';
        state.error = null;
      })
      .addCase(userNewRegister.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const { setUserData, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
