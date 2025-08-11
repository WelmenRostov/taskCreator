import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface initialStaeType {
  value: number;
}

const initialState: initialStaeType = {
  value: 1,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      if (state.value > 1) {
        state.value -= 1;
      } else {
        state.value = 1;
      }
    },
    // Типизируем payload как number
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
