import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getProductsForAdminAction,
  getOrdersForAdminAction,
  getSellersForAdminAction,
  getUsersForAdminAction,
  getAdminDashboardsAction
} from "../actions/AdminThunks";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    dashboard: {},
    
    products: [],
    orders: [],
    sellers: [],
    users: [],

    productPagination: null,
    orderPagination: null,
    sellerPagination: null,
    userPagination: null,

    isPending: false,
    isRejected: false,
    isSuccess: false,
    error: null,

    lastProfileFetchedAt: null,
  },

  reducers: {
    resetAdminState(state) {
      state.isPending = false;
      state.isRejected = false;
      state.isSuccess = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProductsForAdminAction.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.productPagination = action.payload.pagination;
        state.isPending = false;
        state.isSuccess = true;
      })
      .addCase(getOrdersForAdminAction.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.orderPagination = action.payload.pagination;
        state.isPending = false;
        state.isSuccess = true;
      })
      .addCase(getSellersForAdminAction.fulfilled, (state, action) => {
        state.sellers = action.payload.sellers;
        state.sellerPagination = action.payload.pagination;
        state.isPending = false;
        state.isSuccess = true;
      })
      .addCase(getUsersForAdminAction.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.userPagination = action.payload.pagination;
        state.isPending = false;
        state.isSuccess = true;
      })
      .addCase(getAdminDashboardsAction.fulfilled, (state, action) => {
        state.dashboard = action.payload.dashboard;
        state.isPending = false;
        state.isSuccess = true;
      })
      .addMatcher(isPending, (state) => {
        state.isPending = true;
        state.isRejected = false;
        state.isSuccess = false;
        state.error = null;
      })
      .addMatcher(isRejected, (state, action) => {
        state.isPending = false;
        state.isRejected = true;
        state.error = action.error?.message || "Something went wrong";
      });
  },
});

export const { resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;