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
        `/order/seller/${orderId}/ship-item/${itemId}`,
        { courierId: "12345123API" }, // future
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


export const patchSellerCancelItemAction = createAsyncThunk(
  "order/PatchSellerCancelItemAction",
  async (putParamaeters, thunkAPI) => {
    try {
      const { orderId, itemId, sellerId } = putParamaeters;
      const token = thunkAPI.getState().auth.token;
      const response = await api.put(
        `/order/seller/${sellerId}/order/${orderId}/cancel-item/${itemId}/`,
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

export const patchSellerHandleRefundAction = createAsyncThunk(
  "order/PatchSellerHandleRefundAction",
  async (putParamaeters, thunkAPI) => {
    try {
      const { orderId, itemId, sellerId, action } = putParamaeters;
      const token = thunkAPI.getState().auth.token;
      const response = await api.put(
        `/order/seller/${sellerId}/order/${orderId}/handle-refund/${itemId}/`,
        { action },
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


// USER ORDERS

export const fetchUserOrdersAction = createAsyncThunk(
  "order/FetchUserOrdersAction",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(
        `/order/user-order/`,
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


export const cancelUserOrdersAction = createAsyncThunk(
  "order/CancelUserOrdersAction",
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.put(
        `/order/user-cancel/${orderId}`,
        {placeholder: "a"},
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


export const requstRefundUserOrderAction = createAsyncThunk(
  "order/RequstRefundUserOrderAction",
  async (itemId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.put(
        `/order/user-refund/${itemId}`,
        {placeholder: "a"},
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

// ------
// View
// -----

export const getOrderByIdAction = createAsyncThunk(
  "order/GetOrderByIdAction",
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(
        `/order/${orderId}`, {
         headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("response: ", response.data);
      return response.data;
    } catch (error) {
      next(error);
    }
  }
);


export const getItemByIdAction = createAsyncThunk(
  "order/GetItemByIdAction",
  async (itemId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(
        `/order/item/${itemId}`, {
         headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("response: ", response.data);
      return response.data;
    } catch (error) {
      next(error);
    }
  }
);