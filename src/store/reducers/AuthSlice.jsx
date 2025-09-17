import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  loginAction,
  signUpAction,
  logoutAction,
  getUserProfileAction,
  themeToggleAction,
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
        state.theme = action.payload.data.userTheme;
      })

      .addCase(themeToggleAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.theme = action.payload.data;
      })

      .addMatcher(
        isPending(
          loginAction, signUpAction, logoutAction, getUserProfileAction, themeToggleAction),
        (state) => {
          state.isPending = true;
          state.isRejected = false;
          state.isSuccess = false;
          state.error = null;
        }
      )

      .addMatcher(
        isRejected(
          loginAction, signUpAction, logoutAction, getUserProfileAction, themeToggleAction),
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
