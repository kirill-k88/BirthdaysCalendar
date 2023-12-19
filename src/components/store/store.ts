import { configureStore } from '@reduxjs/toolkit';
import { currentDateReducer } from './currentDateSlice';
import { eventListReducer } from './eventListSlice';
import { isLoadingReducer } from './isloadingSlice';
import { currentEventReducer } from './currentEventSlice';
import { isAddPopupVisibleReducer } from './isAddPopupVisibleSlice';
import { requestErrorReducer } from './requestErrorSlice';

export const store = configureStore({
  reducer: {
    currentDateReducer,
    eventListReducer,
    isLoadingReducer,
    currentEventReducer,
    isAddPopupVisibleReducer,
    requestErrorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootStore = ReturnType<typeof store.getState>;
