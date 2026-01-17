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
      console.log("data orders", response.data);
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


export const getSellerOrdersAction = createAsyncThunk(
  "order/GetSellerOrdersAction",
  async (sellerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      console.log("SELLERID", sellerId)
      const response = await api.get(`/order/seller/${sellerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("data-seller-orfders", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  },{
    condition: (_, { getState }) => {
      const { lastStoreOrderFetchedAt } = getState().order;

      // ⛔ block if fetched within last 1 minutes
      if (
        lastStoreOrderFetchedAt &&
        Date.now() - lastStoreOrderFetchedAt < 5000
      ) {
        return false; // thunk will NOT run
      }

      return true;
    },
  }
);

/**
 * theres some different name for controllers its bevause i cannot code everything in a day yet
 * or have a reference
 * i just make tstuff rn and what is missing I ADD.
 */

export const getSellerOrderAction = createAsyncThunk(
  "order/GetSellerOrderAction",
  async (orderId, thunkAPI) => {
    try {
    const token = thunkAPI.getState().auth.token;
      console.log("OrderID", orderId);
      const response = await api.get(`/order/store-order-item/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("data", response.data);
      console.log("call");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

export const getStoreOrderItemByIdAction = createAsyncThunk(
  "order/GetStoreOrderItemByIdAction",
  async (itemId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const cachedItem = thunkAPI.getState().order.item;

      console.log("ItemID", itemId);
      console.log("cached item", cachedItem);

      if (cachedItem && cachedItem._id === itemId) {
        return { success: true, item: cachedItem };
      }

      const response = await api.get(`/order/store-order-item/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("data-item-by-id", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);
