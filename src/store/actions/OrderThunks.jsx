import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../features/api";

export const createOrderAction = createAsyncThunk(
  "order/CreateOrderAction",
  async ( orderData , thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      console.log("ORDERDATA", orderData);
      const response = await api.post(`/order/`, orderData, {
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

export const getUserOrdersAction = createAsyncThunk(
  "order/GetUserOrdersAction",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(`/order/users-orders`, {
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

export const getOrdersByIdAction = createAsyncThunk(
  "order/GetOrdersByIdAction",
  async (ordersId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(`/order/${ordersId}`, {
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
