import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../features/api";



export const getProductIdAction = createAsyncThunk(
  "product/GetProductIdAction",
  async ( productId, thunkAPI ) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(`/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("data", response.data);
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
      const response = await api.post(`/product/`, productData, {
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
      const response = await api.put(`/product/${productId}`, {
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

export const fetchProductsAction = createAsyncThunk(
  "product/FetchProductsAction",
  async (queryParams, thunkAPI) => {
    try {
      console.log(queryParams);
      const response = await api.get(`/product`, {params: queryParams});
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
)