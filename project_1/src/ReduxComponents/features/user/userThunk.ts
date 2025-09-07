import { createAsyncThunk } from '@reduxjs/toolkit';
import { accessTokenLifeAPI, accessImageAPI, refreshAccessTokenAPI, registeringNewUserAPI } from '../../API/authAPI';
import { AxiosError } from 'axios';
import type { UserType } from './authSlice';

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

export const userAccessTokenLife = createAsyncThunk(
  'user/accessToken',
  async (tokens: { accessToken: string }, { rejectWithValue }) => {
    try {
      const response = await accessTokenLifeAPI(tokens.accessToken);
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
      console.log('Запрос изображения для id:', id);
      const response = await accessImageAPI(id);
      console.log('оно?', response);
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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка получения image');
      }
      return rejectWithValue('Unknown error occurred');
    }
  }
);
