import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../features/api";

export const createStoreAction = createAsyncThunk(
  "seller/CreateStoreAction",
  async (storeData, thunkAPI) => {
    try {
    const response = await api.post("/store/create", storeData);
    if (response) {
      const {token} = response.data;
      localStorage.setItem("token", token);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response?.data.message);
  }
}
);