import { createSlice } from '@reduxjs/toolkit';
import { IMyDate } from '../../utils/interfaces/IMyDate.interface';
import {
  createNewDate,
  getNextMonthDate,
  getNextYearDate,
  getPreviousMonthDate,
  getPreviousYearDate
} from '../../utils/functions/dateFunctions';

const myDate: IMyDate = createNewDate(new Date());

const currentDateSlice = createSlice({
  name: 'currentDate',
  initialState: {
    currentDate: myDate
  },
  reducers: {
    setCurrentDate(state, action) {
      state.currentDate = action.payload.currentDate;
    },
    setCurrentDateNextMonth(state) {
      state.currentDate = getNextMonthDate(state.currentDate.date);
    },
    setCurrentDatePreviousMonth(state) {
      state.currentDate = getPreviousMonthDate(state.currentDate.date);
    },
    setCurrentDateNextYear(state) {
      state.currentDate = getNextYearDate(state.currentDate.date);
    },
    setCurrentDatePreviousYear(state) {
      state.currentDate = getPreviousYearDate(state.currentDate.date);
    }
  }
});

export const {
  setCurrentDate,
  setCurrentDateNextMonth,
  setCurrentDatePreviousMonth,
  setCurrentDateNextYear,
  setCurrentDatePreviousYear
} = currentDateSlice.actions;

export const currentDateReducer = currentDateSlice.reducer;
