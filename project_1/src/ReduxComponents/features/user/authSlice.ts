import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  logoutUser,
  userAccessImage,
  userAccessTokenLife,
  userLogin,
  userNewRegister,
  userPasswordUpdate,
} from './userThunk';

export interface UserType {
  id: number | null;
  email: string;
  password: string;
  age?: string;
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
    age: '',
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
          const token = localStorage.getItem('accessToken');
          if (token) {
            try {
              const { email, id, age } = JSON.parse(atob(token.split('.')[1]));
              state.user.email = email;
              state.user.id = id;
              state.user.age = age;
              state.user.isAuth = true;
            } catch (e) {
              console.error('Ошибка при декодировании токена:', e);
            }
          }
          localStorage.setItem('user', JSON.stringify(state.user));
        }

        state.loading = 'succeeded';
        state.error = null;
      })

      .addCase(userPasswordUpdate.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(userPasswordUpdate.fulfilled, (state, action) => {
        console.log('Ответ от API с токенами:', action.payload);

        state.user = { ...action.payload };

        if (action.payload.accessToken) {
          localStorage.setItem('accessToken', action.payload.accessToken);
          const token = localStorage.getItem('accessToken');
          if (token) {
            try {
              const { email, id, age } = JSON.parse(atob(token.split('.')[1]));
              state.user.email = email;
              state.user.id = id;
              state.user.age = age;
              state.user.isAuth = true;
            } catch (e) {
              console.error('Ошибка при декодировании токена:', e);
            }
          }
          localStorage.setItem('user', JSON.stringify(state.user));
        }

        state.loading = 'succeeded';
        state.error = null;
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

      .addCase(userAccessImage.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(userAccessImage.fulfilled, (state, action) => {
        if (action.payload?.image) {
          state.user.profile = action.payload.image.profile;
          state.user.cover = action.payload.image.cover;
        }
        state.loading = 'succeeded';
        state.error = null;
      })

      .addCase(userLogin.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        console.log('Ответ от API с токенами:', action.payload);

        state.user = { ...action.payload };

        if (action.payload.accessToken) {
          localStorage.setItem('accessToken', action.payload.accessToken);
          const token = localStorage.getItem('accessToken');
          if (token) {
            try {
              const { email, id } = JSON.parse(atob(token.split('.')[1]));
              state.user.email = email;
              state.user.id = id;
              state.user.isAuth = true;
            } catch (e) {
              console.error('Ошибка при декодировании токена:', e);
            }
          }
          localStorage.setItem('user', JSON.stringify(state.user));
        }

        state.loading = 'succeeded';
        state.error = null;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {
          id: null,
          email: 'Неавторизированный пользльзователь',
          password: '',
          age: '',
          login: '',
          profile: 'default',
          cover: 'default',
          isAuth: false,
          accessToken: 'null',
        };
      })
      .addCase(userPasswordUpdate.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Unknown error';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Unknown error';
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = (action.payload as string) || 'Unknown error';
      })

      .addCase(userNewRegister.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = (action.payload as string) || 'Unknown error';
      })

      .addCase(userAccessImage.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = (action.payload as string) || 'Unknown error';
      });
  },
});

export const { setUserData, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
