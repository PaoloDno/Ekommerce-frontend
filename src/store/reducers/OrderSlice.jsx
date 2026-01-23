import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  createOrderAction,
  getSellerOrdersAction,
  getSellerOrderByIdAction,
  patchSellerAcceptItemOrderAction,
  patchSellerAcceptOrderAction,
  patchShipItemAction,
  patchShipOrderAction,
} from "../actions/OrderThunks";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    orders: [],
    storeOrders: [],
    item: {},
    lastStoreOrderFetchedAt: null,
    isPending: false,
    isRejected: false,
    isSuccess: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --------------------
      // Create Order
      // --------------------
      .addCase(createOrderAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.order = action.payload.order;
      })

      // --------------------
      // Seller Orders
      // --------------------
      .addCase(getSellerOrdersAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.storeOrders = action.payload.storeOrders;
        state.lastStoreOrderFetchedAt = Date.now();
      })

      .addCase(getSellerOrderByIdAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.order = action.payload.order;
      })

      // --------------------
      // Accept (item / all)
      // --------------------
      .addCase(patchSellerAcceptItemOrderAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.order = action.payload.order;
      })

      .addCase(patchSellerAcceptOrderAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.order = action.payload.order;
      })

      // --------------------
      // Ship (item / all)
      // --------------------
      .addCase(patchShipItemAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.order = action.payload.order;
      })

      .addCase(patchShipOrderAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.order = action.payload.order;
      })

      // --------------------
      // Pending matcher
      // --------------------
      .addMatcher(
        isPending(
          createOrderAction,
          getSellerOrdersAction,
          getSellerOrderByIdAction,
          patchSellerAcceptItemOrderAction,
          patchSellerAcceptOrderAction,
          patchShipItemAction,
          patchShipOrderAction
        ),
        (state) => {
          state.isPending = true;
          state.isSuccess = false;
          state.isRejected = false;
          state.error = null;
        }
      )

      // --------------------
      // Rejected matcher
      // --------------------
      .addMatcher(
        isRejected(
          createOrderAction,
          getSellerOrdersAction,
          getSellerOrderByIdAction,
          patchSellerAcceptItemOrderAction,
          patchSellerAcceptOrderAction,
          patchShipItemAction,
          patchShipOrderAction
        ),
        (state, action) => {
          state.isPending = false;
          state.isSuccess = false;
          state.isRejected = true;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export default orderSlice.reducer;
