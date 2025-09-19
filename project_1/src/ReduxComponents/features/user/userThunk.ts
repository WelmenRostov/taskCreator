import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  accessTokenLifeAPI,
  accessImageAPI,
  refreshAccessTokenAPI,
  registeringNewUserAPI,
  loginUserAPI,
  userPasswordUpdateAPI,
} from '../../API/authAPI';
import { AxiosError } from 'axios';
import type { UserType } from './authSlice';

export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    // Удаляем куки
    document.cookie = 'refreshToken=; max-age=0; path=; domain=localhost; secure; SameSite=Lax;';
    localStorage.removeItem('accessToken');

    // Возвращаем null, чтобы сбросить состояние пользователя
    return null;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || 'Ошибка входа');
  }
});

export const userNewRegister = createAsyncThunk('user/register', async (userData: FormData, { rejectWithValue }) => {
  try {
    const response = await registeringNewUserAPI(userData);
    console.log(response);
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data?.message || 'Error registering user');
    }
    return rejectWithValue('Unknown error occurred');
  }
});

interface PasswordUpdatePayload {
  oldPassword: string;
  newPassword: string;
}

export const userPasswordUpdate = createAsyncThunk<
  any,
  PasswordUpdatePayload, // тип payload
  { rejectValue: string }
>('user/passwordUpdate', async ({ oldPassword, newPassword }, { rejectWithValue }) => {
  try {
    const response = await userPasswordUpdateAPI({ oldPassword, newPassword });
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data?.message || 'Error updating password');
    }
    return rejectWithValue('Unknown error occurred');
  }
});

export const userLogin = createAsyncThunk(
  'user/login',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(userData);
      return response;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || 'Ошибка входа');
    }
  }
);

export const userAccessTokenLife = createAsyncThunk(
  'user/accessToken',
  async (tokens: { accessToken: string }, { rejectWithValue }) => {
    try {
      const response = await accessTokenLifeAPI();
      return {
        accessToken: tokens.accessToken,
        user: response.data,
      };
    } catch {
      try {
        const refreshRes = await refreshAccessTokenAPI();
        const { accessToken } = refreshRes.data;

        return {
          accessToken,
          user: refreshRes.data.user ?? null,
        };
      } catch {
        return rejectWithValue('Не удалось обновить токен');
      }
    }
  }
);

type UserImageData = {
  profile: string;
  cover: string;
};

export const userAccessImage = createAsyncThunk<{ image: UserImageData }, number, { rejectValue: string }>(
  'user/accessImage',
  async (id, { rejectWithValue }) => {
    try {
      const response = await accessImageAPI(id);
      const rawUser = localStorage.getItem('user');
      if (!rawUser) {
        // Если пользователя нет, то просто возвращаем данные
        return { image: response };
      }

      const parsed = JSON.parse(rawUser) as UserType;

      // Обновляем profile и cover в объекте user
      const user = {
        ...parsed,
        profile: response.profile ?? parsed.profile,
        cover: response.cover ?? parsed.cover,
      };

      // Сохраняем обновлённого пользователя обратно в localStorage
      localStorage.setItem('user', JSON.stringify(user));
      return {
        image: response.data,
      };
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки изображения');
    }
  }
);
