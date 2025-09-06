import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../features/api";

export const createLinkCategoryAction = createAsyncThunk(
  "category/CreateLinkCategoryAction",
  async (categoryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.post("/category/", categoryData, {
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

export const getCategoriesAction = createAsyncThunk(
  "category/GetCategoriesAction",
  async ( _ , thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.get("/category/", {
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

export const getCategoriesIdAction = createAsyncThunk(
  "category/GetCategoryIdAction",
  async ( CategoryID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(`/category/${CategoryID}`, {
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

export const deleteCategoryAction = createAsyncThunk(
  "category/DeleteCategoryAction",
  async ( CategoryID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.delete(`/category/${CategoryID}`, {
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