import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../features/api";

export const loginAction = createAsyncThunk(
  "auth/LoginAction",
  async (loginData, thunkAPI) => {
    try {
      console.log("a");
      const response = await api.post("/user/login", loginData);
      console.log("b");
      if (response) {
        const { token } = response.data;
        localStorage.setItem("token", token);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

export const signUpAction = createAsyncThunk(
  "auth/SignUpAction", 
  async (signUpData, thunkAPI) => {
    try {
      const response = await api.post("/user/signup", signUpData);
    // Optionally store token if API returns one
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/LogoutAction",
  async (_, thunkAPI) => {
    try {
      // Clear token from localStorage
      localStorage.removeItem("token");
      return { message: "Logged out successfully" };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);
