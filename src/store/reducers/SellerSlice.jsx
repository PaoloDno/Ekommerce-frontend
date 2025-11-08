import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  createStoreAction,
  getStoreIdAction,
  getUserStoreAction,
  getStoresAction,
} from "../actions/SellerThunks";

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    store: "",
    stores: [],
    pagination: {},
    isPending: false,
    isRejected: false,
    isSuccess: false,
    error: null,
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
      .addCase(getStoreIdAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.store = action.payload.store;
      })
      .addCase(getStoresAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.stores = action.payload.stores;
      })

      .addMatcher(
        isPending(
          createStoreAction,
          getStoresAction,
          getStoreIdAction,
          getUserStoreAction
        ),
        (state) => {
          state.isPending = true;
          state.isRejected = false;
          state.isSuccess = false;
          state.error = null;
        }
      )

      .addMatcher(
        isRejected(
          createStoreAction,
          getStoresAction,
          getStoreIdAction,
          getUserStoreAction
        ),
        (state) => {
          state.isPending = false;
          state.isRejected = true;
          state.isSuccess = false;
          state.error = action.payload || "Something Went Wrong";
        }
      );
  },
});

export default sellerSlice.reducer;
