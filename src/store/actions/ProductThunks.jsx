import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../features/api";

export const getProductsAction = createAsyncThunk(
  "product/GetProductAction",
  async (_ , thunkAPI) => {
    try {
      const response = await api.get("/product/", {
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

export const getProductIdAction = createAsyncThunk(
  "product/GetProductIdAction",
  async ( productId, thunkAPI ) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(`product/${productId}`, {
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

export const createProductAction = createAsyncThunk(
  "product/CreateProductAction",
  async ( productData, thunkAPI ) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.post(`product/`, productData, {
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

export const updateProductAction = createAsyncThunk(
  "product/UpdateProductAction",
  async ( productId, thunkAPI) => {
    try {
      const response = await api.put(`product/${productId}`, {
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

export const deleteProductAction = createAsyncThunk(
  "product/DeleteProductAction",
  async (productId, thunkAPI) => {
    try {
      const response = await api.delete(`product/${productId}`, {
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