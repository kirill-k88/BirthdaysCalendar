import { createSlice } from '@reduxjs/toolkit';

const isAddPopupVisibleSlice = createSlice({
  name: 'isAddPopupVisible',
  initialState: {
    isAddPopupVisible: false
  },
  reducers: {
    setIsAddPopupVisible(state, action) {
      state.isAddPopupVisible = action.payload.isAddPopupVisible;
    }
  }
});

export const { setIsAddPopupVisible } = isAddPopupVisibleSlice.actions;

export const isAddPopupVisibleReducer = isAddPopupVisibleSlice.reducer;
