import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  loginAction,
  signUpAction,
  logoutAction } from "../actions/AuthThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
  user: null,
  token: localStorage.getItem("token") || null,
  isPending: false,
  isRejected: false,
  isSuccess: false,
  error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loginAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
      })

      .addCase(signUpAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.user = null;
        state.token = null;
      })

      .addMatcher(isPending(loginAction, signUpAction, logoutAction), (state) => {
        state.isPending = true;
        state.isRejected = false;
        state.isSuccess = false;
        state.error = null;
      })

      .addMatcher(isRejected(loginAction, signUpAction, logoutAction), (state, action) => {
        state.isPending = false;
        state.isRejected = true;
        state.isSuccess = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default authSlice.reducer;