import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../features/api";

export const createReviewAction = createAsyncThunk(
  "review/CreateReviewAction",
  async ( formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.post("/review/", formData, {
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

export const getProductReviewsAction = createAsyncThunk(
  "review/GetProductReviewsAction",
  async ( productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(`/review/${productId}`, {
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