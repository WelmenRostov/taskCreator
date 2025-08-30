import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type User = {
  id: string;
  email: string;
  profile: string;
  cover: string;
};

type RegisterResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk<
  RegisterResponse,
  { email: string; password: string },
  { rejectValue: string }
>('auth/registerUser', async ({ email, password }, thunkAPI) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return thunkAPI.rejectWithValue(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    return data as RegisterResponse;
  } catch (error: never) {
    return thunkAPI.rejectWithValue(error.message || 'Network error');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
