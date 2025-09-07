import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { userAccessImage, userAccessTokenLife, userNewRegister } from './userThunk';

export interface UserType {
  id: number | null;
  email: string;
  password: string;
  age?: number;
  login: string;
  profile: 'default' | File | string;
  cover: 'default' | File | string;
  isAuth: boolean;
  accessToken: string;
}

type StateType = {
  user: UserType;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
};

const initialState: StateType = {
  user: {
    id: null,
    email: 'Неавторизированный пользльзователь',
    password: '',
    age: 0,
    login: 'Чепух',
    profile: 'default',
    cover: 'default',
    isAuth: false,
    accessToken: 'null',
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
        console.log('Ответ от API с токенами:', action.payload);

        state.user = { ...action.payload };

        if (action.payload.accessToken) {
          localStorage.setItem('accessToken', action.payload.accessToken);
          const { email, id } = JSON.parse(atob(localStorage.getItem('accessToken')!.split('.')[1]));
          state.user.email = email;
          state.user.id = id;
          state.user.isAuth = true;
          localStorage.setItem('user', JSON.stringify(state.user));
          console.log('Сохранили accessToken в localStorage');
        }

        state.loading = 'succeeded';
        state.error = null;
      })
      .addCase(userNewRegister.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Unknown error';
      })

      .addCase(userAccessTokenLife.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(userAccessTokenLife.fulfilled, (state, action) => {
        localStorage.setItem('accessToken', action.payload.accessToken); // всё ещё нужен accessToken для авторизации
        state.loading = 'succeeded';
        state.error = null;
      })
      .addCase(userAccessTokenLife.rejected, (state, action) => {
        state.loading = 'failed';
        localStorage.removeItem('accessToken');
        state.user.isAuth = false;
        state.error = action.error.message || 'Unknown error';
      })

      .addCase(userAccessImage.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(userAccessImage.fulfilled, (state, action) => {
        state.user.profile = action.payload.image.profile;
        state.user.cover = action.payload.image.cover;
        state.loading = 'succeeded';
        state.error = null;
      })
      .addCase(userAccessImage.rejected, (state, action) => {
        state.loading = 'failed';
        state.user.isAuth = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const { setUserData, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
