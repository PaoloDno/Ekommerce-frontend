import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../features/api";

export const getCartAction = createAsyncThunk(
  "cart/GetCartAction",
  async (__, thunkAPI) => {
    try {
      const response = await api.get("/cart/", {
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

export const addToCartAction = createAsyncThunk(
  "cart/AddToCartAction",
  async (productData, thunkAPI) => {
    try {
      const response = await api.post("cart/", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch(error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    } 
  }
);

export const removeFromCartAction = createAsyncThunk(
  "cart/RemoveFromCartAction",
  async (productId, thunkAPI) => {
    try {
      const response = await api.delete(`cart/${productId}`,{
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

export const clearCartAction = createAsyncThunk(
  "cart/ClearCartACtion",
  async (_, thunkAPI) => {
    try {
      const response = await api.delete(`cart/clear`, {
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
)