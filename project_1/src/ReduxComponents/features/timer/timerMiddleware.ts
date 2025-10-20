
import { Middleware } from 'redux';
import { tick } from './timerSlice';

let intervalId: ReturnType<typeof setInterval> | null = null;

export const timerMiddleware: Middleware = storeAPI => next => action => {
  const result = next(action);

  const state = storeAPI.getState();
  const timerState = state.timer;

  // старт таймера
  if (action.type === 'timer/startTimer') {
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
      storeAPI.dispatch(tick());
    }, 250);
  }

  // остановка или сброс
  if (
    action.type === 'timer/stopTimer' ||
    action.type === 'timer/resetTimer'
  ) {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  return result;
};
