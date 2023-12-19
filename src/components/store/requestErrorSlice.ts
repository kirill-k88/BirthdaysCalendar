import { createSlice } from '@reduxjs/toolkit';

const requestErrorSlice = createSlice({
  name: 'requestError',
  initialState: {
    requestError: ''
  },
  reducers: {
    setRequestError(state, action) {
      state.requestError = action.payload.requestError;
    }
  }
});

export const { setRequestError } = requestErrorSlice.actions;

export const requestErrorReducer = requestErrorSlice.reducer;
