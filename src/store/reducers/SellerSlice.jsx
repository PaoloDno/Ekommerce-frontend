// store/slices/sellerSlice.js
import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  createStoreAction,
  getStoreIdAction,
  getUserStoreAction,
  getStoresAction,
} from "../actions/SellerThunks";

const initialState = {
  store: null,       // single store data
  stores: [],        // list of stores
  seller: null,      // owner info
  pagination: {},
  isPending: false,
  isRejected: false,
  isSuccess: false,
  error: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.isPending = false;
      state.isSuccess = false;
      state.isRejected = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fulfilled cases
      .addCase(createStoreAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.store = action.payload.data || null;
      })
      .addCase(getUserStoreAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.seller = action.payload.data || null;
      })
      .addCase(getStoreIdAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.store = action.payload.data || null;
      })
      .addCase(getStoresAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.stores = action.payload.stores || [];
        state.pagination = action.payload.pagination || {};
      })

      // Pending matcher
      .addMatcher(
        isPending(createStoreAction, getStoresAction, getStoreIdAction, getUserStoreAction),
        (state) => {
          state.isPending = true;
          state.isRejected = false;
          state.isSuccess = false;
          state.error = null;
        }
      )

      // Rejected matcher
      .addMatcher(
        isRejected(createStoreAction, getStoresAction, getStoreIdAction, getUserStoreAction),
        (state, action) => {
          state.isPending = false;
          state.isRejected = true;
          state.isSuccess = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export const { resetStatus } = sellerSlice.actions;
export default sellerSlice.reducer;
