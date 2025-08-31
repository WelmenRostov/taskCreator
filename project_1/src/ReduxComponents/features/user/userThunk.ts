import { createAsyncThunk } from '@reduxjs/toolkit';
import { registeringNewUser } from '../../API/authAPI';
import { AxiosError } from 'axios';

// Типизация createAsyncThunk для FormData
export const userNewRegister = createAsyncThunk('user/register', async (userData: FormData, { rejectWithValue }) => {
  try {
    const response = await registeringNewUser(userData); // Здесь вы передаете FormData
    return response; // Возвращаем данные пользователя
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data?.message || 'Error registering user');
    }
    return rejectWithValue('Unknown error occurred');
  }
});
