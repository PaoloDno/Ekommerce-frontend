// store/actions/SellerThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../features/api";

export const createStoreAction = createAsyncThunk(
  "seller/CreateStoreAction",
  async (storeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.post("/store/create", storeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getUserStoreAction = createAsyncThunk(
  "seller/GetUserStoreAction",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.get("/store/get-owner-store", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("SELLER", response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getStoreIdAction = createAsyncThunk(
  "seller/GetStoreByIdAction",
  async (storeId, thunkAPI) => {
    try {
      const response = await api.get(`/store/${storeId}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getStoresAction = createAsyncThunk(
  "seller/GetStoresAction",
  async (queryParams = {}, thunkAPI) => {
    try {
      const response = await api.get("/store", { params: queryParams });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch stores");
    }
  }
);
