import { createSlice } from '@reduxjs/toolkit';
import { INIT_EVENT_LIST } from '../../utils/constants';

const eventListSlice = createSlice({
  name: 'eventList',
  initialState: {
    eventList: INIT_EVENT_LIST,
    needUpdateEventList: false
  },
  reducers: {
    setEventList(state, action) {
      state.eventList = action.payload.eventList;
    },
    setNeedUpdateEventList(state, action) {
      state.needUpdateEventList = action.payload.needUpdateEventList;
    }
  }
});

export const { setEventList, setNeedUpdateEventList } = eventListSlice.actions;

export const eventListReducer = eventListSlice.reducer;
