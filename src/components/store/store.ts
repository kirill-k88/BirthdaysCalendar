import { configureStore } from '@reduxjs/toolkit';
import { currentDateReducer } from './currentDateSlice';
import { eventListReducer } from './eventListSlice';
import { isLoadingReducer } from './isloadingSlice';
import { currentEventReducer } from './currentEventSlice';
import { isAddPopupVisibleReducer } from './isAddPopupVisibleSlice';

export const store = configureStore({
  reducer: {
    currentDateReducer,
    eventListReducer,
    isLoadingReducer,
    currentEventReducer,
    isAddPopupVisibleReducer
  }
});

export type RootStore = ReturnType<typeof store.getState>;
