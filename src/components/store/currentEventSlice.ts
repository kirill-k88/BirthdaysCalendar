import { createSlice } from '@reduxjs/toolkit';
import { INIT_EVENT_LIST } from '../../utils/constants';

const currentEventSlice = createSlice({
  name: 'currentEvent',
  initialState: {
    currentEvent: INIT_EVENT_LIST[0]
  },
  reducers: {
    setCurrentEvent(state, action) {
      state.currentEvent = action.payload.currentEvent;
    }
  }
});

export const { setCurrentEvent } = currentEventSlice.actions;

export const currentEventReducer = currentEventSlice.reducer;
