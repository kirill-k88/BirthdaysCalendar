import { createSlice } from '@reduxjs/toolkit';
import { INIT_EVENT_LIST } from '../../utils/constants';

const eventListSlice = createSlice({
  name: 'eventList',
  initialState: {
    eventList: INIT_EVENT_LIST
  },
  reducers: {
    setEventList(state, action) {
      state.eventList = action.payload.eventList;
    }
  }
});

export const { setEventList } = eventListSlice.actions;

export const eventListReducer = eventListSlice.reducer;
