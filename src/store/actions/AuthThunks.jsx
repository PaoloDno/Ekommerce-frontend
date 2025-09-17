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
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);

export const getUserProfileAction = createAsyncThunk(
  "auth/GetUserProfileAction",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      console.log(token);

      const response = await api.get("/user/get-user-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/LogoutAction",
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem("token");
      return { message: "Logged out successfully" };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

export const themeToggleAction = createAsyncThunk(
  "auth/ThemeToggle",
  async (theme, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      console.log("theme: ", token);
      console.log(theme);
      const response = await api.put("/user/theme", {theme}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "theme toggle failed "
      );
    }
  }
);
