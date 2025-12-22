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
      console.log("auth: ", response.data);
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
      
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      console.log("auth-sign: ", response.data);
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
      console.log("auth-profile: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }, {
    condition: (_, { getState }) => {
      const { lastProfileFetchedAt } = getState().auth;

      // ⛔ block if fetched within last 5 minutes
      if (
        lastProfileFetchedAt &&
        Date.now() - lastProfileFetchedAt < 5 * 60 * 1000
      ) {
        return false; // thunk will NOT run
      }

      return true;
    },
  }
);

export const logoutAction = createAsyncThunk(
  "auth/LogoutAction",
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("app_state");
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
