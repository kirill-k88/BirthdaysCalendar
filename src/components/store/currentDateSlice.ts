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
  name: 'curentDate',
  initialState: {
    curentDate: myDate
  },
  reducers: {
    setCurentDate(state, action) {
      state.curentDate = action.payload.curentDate;
    },
    setCurentDateNextMonth(state) {
      state.curentDate = getNextMonthDate(state.curentDate.date);
    },
    setCurentDatePreviousMonth(state) {
      state.curentDate = getPreviousMonthDate(state.curentDate.date);
    },
    setCurentDateNextYear(state) {
      state.curentDate = getNextYearDate(state.curentDate.date);
    },
    setCurentDatePreviousYear(state) {
      state.curentDate = getPreviousYearDate(state.curentDate.date);
    }
  }
});

export const {
  setCurentDate,
  setCurentDateNextMonth,
  setCurentDatePreviousMonth,
  setCurentDateNextYear,
  setCurentDatePreviousYear
} = currentDateSlice.actions;

export const currentDateReducer = currentDateSlice.reducer;
