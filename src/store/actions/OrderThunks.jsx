import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../features/api";

export const createOrderAction = createAsyncThunk(
  "order/CreateOrderAction",
  async (orderData, thunkAPI) => {
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
  },
);

export const getSellerOrdersAction = createAsyncThunk(
  "order/GetSellerOrdersAction",
  async (sellerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      console.log("SELLERID", sellerId);
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
  },
  {
    condition: (_, { getState }) => {
      const { lastStoreOrderFetchedAt } = getState().order;

      // block if fetched within last
      if (
        lastStoreOrderFetchedAt &&
        Date.now() - lastStoreOrderFetchedAt < 5000
      ) {
        return false; // thunk will NOT run
      }

      return true;
    },
  },
);

export const getSellerOrderByIdAction = createAsyncThunk(
  "order/GetSellerOrderAction",
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      console.log("OrderID", orderId);
      const response = await api.get(`/order/seller-order/${orderId}`, {
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
  },
);

export const patchSellerAcceptItemOrderAction = createAsyncThunk(
  "order/PatchSellerAcceptItemAction",
  async (putParameters, thunkAPI) => {
    try {
      const { orderId, itemId } = putParameters;
      const token = thunkAPI.getState().auth.token;
      console.log("order", orderId);
      console.log("item", itemId);
      const response = await api.put(
        `/order/seller/${orderId}/accept-item/${itemId}`,
        { optional: token },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("response: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  },
);

export const patchSellerAcceptOrderAction = createAsyncThunk(
  "order/PatchSellerAcceptOrderAction",
  async (putParameters, thunkAPI) => {
    try {
      const { orderId, sellerId } = putParameters;
      const token = thunkAPI.getState().auth.token;
      console.log("order", orderId);
      console.log("sellerId", sellerId);
      console.log("token", token);
      console.log(token);
      const response = await api.put(
        `/order/seller/${orderId}/accept-all/${sellerId}`,
        { token },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("response: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  },
);

export const patchShipItemAction = createAsyncThunk(
  "/order/PatchShipItemAction",
  async (putParameters, thunkAPI) => {
    try {
      const { orderId, itemId } = putParameters;
      const token = thunkAPI.getState().auth.token;
      const response = await api.put(
        `/order/seller/${orderId}/accept-item/${itemId}`,
        { optional: "placeholder" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("response: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  },
);

export const patchShipOrderAction = createAsyncThunk(
  "order/PatchShipOrderAction",
  async (putParamaeters, thunkAPI) => {
    try {
      const { orderId, sellerId } = putParamaeters;
      const token = thunkAPI.getState().auth.token;
      const response = await api.put(
        `/order/seller/${orderId}/ship-all/${sellerId}`,
        { optional: "placeholder" },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("response: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  },
);

/** 
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
*/
