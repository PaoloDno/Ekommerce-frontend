import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  loginAction,
  signUpAction,
  logoutAction,
  getUserProfileAction,
} from "../actions/AuthThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: "",
    profile: null,
    username: "",
    theme: null,
    totalItems: 0,
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
        state.userId = action.payload.userId;
        state.username = action.payload.username || null;
        state.token = action.payload.token || null;
        state.totalItems = action.payload.cartSummary.totalItems;
      })

      .addCase(signUpAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.userId = action.payload.userId;
        state.username = action.payload.username || null;
        state.token = action.payload.token || null;
        state.totalItems = action.payload.cartSummary.totalItems;
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.userId = null;
        state.username = null;
        state.token = null;
        state.totalItems = null;
      })

      .addCase(getUserProfileAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.profile = action.payload.data;
      })

      .addMatcher(
        isPending(
          loginAction, signUpAction, logoutAction, getUserProfileAction),
        (state) => {
          state.isPending = true;
          state.isRejected = false;
          state.isSuccess = false;
          state.error = null;
        }
      )

      .addMatcher(
        isRejected(
          loginAction, signUpAction, logoutAction, getUserProfileAction),
        (state, action) => {
          state.isPending = false;
          state.isRejected = true;
          state.isSuccess = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export default authSlice.reducer;
