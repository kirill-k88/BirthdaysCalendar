import { createSlice } from '@reduxjs/toolkit';

const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: {
    isLoading: false
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    }
  }
});

export const { setIsLoading } = isLoadingSlice.actions;

export const isLoadingReducer = isLoadingSlice.reducer;
