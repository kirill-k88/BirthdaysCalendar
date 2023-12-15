import { configureStore } from '@reduxjs/toolkit';
import { currentDateReducer } from './currentDateSlice';
import { eventListReducer } from './eventListSlice';

export const store = configureStore({
  reducer: {
    currentDateReducer,
    eventListReducer
  }
});

export type RootStore = ReturnType<typeof store.getState>;
