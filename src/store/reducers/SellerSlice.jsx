import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  createStoreAction,
  getUserStoreAction
} from "../actions/SellerThunks";

const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
    store: {},
    isPending: false,
    isRejected: false,
    isSuccess: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createStoreAction.fulfilled, (state, action) => {
      state.isPending = false;
      state.isSuccess = true;
      state.isRejected = false;
    })
    .addCase(getUserStoreAction.fulfilled, (state, action) => {
      state.isPending = false;
      state.isSuccess = true;
      state.isRejected = false;
      state.store = action.payload.store;
    })
    .addMatcher(isPending(createStoreAction), (state) => {
      state.isPending = true;
      state.isRejected = false;
      state.isSuccess = false;
      state.error = null;
    })
    .addMatcher(isRejected(createStoreAction), (state) => {
      state.isPending = false;
      state.isRejected = true;
      state.isSuccess = false;
      state.error = action.payload || "Something Went Wrong";
    })
  }
});

export default sellerSlice.reducer;