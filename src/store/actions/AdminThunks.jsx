import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../features/api";


export const getAdminDashboardsAction = createAsyncThunk(
  "admin/GetAdminDashboardsAction",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const { data } = await api.get("/admin/get-dashboard-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("DATA FOR ADMIN-Prod: ", data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);

export const getProductsForAdminAction = createAsyncThunk(
  "admin/GetProductsForAdminAction",
  async ( queryParams, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const { data } = await api.get("/admin/users", {params: queryParams}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("DATA FOR ADMIN-Prod: ", data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);


export const getOrdersForAdminAction = createAsyncThunk(
  "admin/GetOrdersForAdminAction",
  async ( queryParams, thunkAPI) => {
try {
      const token = thunkAPI.getState().auth.token;
      const { data } = await api.get("/admin/orders", {params: queryParams}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("DATA FOR ADMIN-Orders: ", data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);

export const getSellersForAdminAction = createAsyncThunk(
  "admin/GetSellersForAdminAction",
  async ( queryParams, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const { data } = await api.get("/admin/sellers", {params: queryParams}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("DATA FOR ADMIN-Store: ", data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);

export const getUsersForAdminAction = createAsyncThunk(
  "admin/GetUserForAdminAction",
  async (queryParams, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const { data } = await api.get("/admin/users", {params: queryParams}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("DATA FOR ADMIN-Store: ", data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);