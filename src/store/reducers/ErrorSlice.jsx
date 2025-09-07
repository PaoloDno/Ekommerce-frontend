import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  status: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    clearError: (state) => {
      state.message = null;
      state.status = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;