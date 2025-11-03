import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../features/api";

export const createStoreAction = createAsyncThunk(
  "seller/CreateStoreAction",
  async (storeData, thunkAPI) => {
    try {
      console.log(storeData);
      const token = thunkAPI.getState().auth.token;
      const response = await api.post("/store/create", storeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

export const getUserStoreAction = createAsyncThunk(
  "seller/GetUsetStoreAction",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.get("/store/get-owner-store", {
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

export const getStoreIdAction = createAsyncThunk(
  "seller/GetStoreIdAction",
  async (storeId, thunkAPI) => {
    try {
      const response = await api.get(`/store/${storeId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
)