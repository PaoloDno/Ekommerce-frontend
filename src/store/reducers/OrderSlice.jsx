import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  createOrderAction,
  getSellerOrdersAction,
  getSellerOrderByIdAction,
  patchSellerAcceptItemOrderAction,
  patchSellerAcceptOrderAction,
  patchShipItemAction,
  patchShipOrderAction,
  // cancel seller
  patchSellerCancelItemAction,
  patchSellerHandleRefundAction,
  // users
  fetchUserOrdersAction,
  cancelUserOrdersAction,
  requstRefundUserOrderAction,
  // view
  getOrderByIdAction,
  getItemByIdAction,
} from "../actions/OrderThunks";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    orders: [],
    storeOrders: [],
    userOrders: [],
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
      // Seller
      // --------------------

      .addCase(patchSellerCancelItemAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.order = action.payload.order;
      })

      .addCase(patchSellerHandleRefundAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.order = action.payload.order;
      })

      // -----
      // User Order
      // -----
      .addCase(fetchUserOrdersAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.userOrders = action.payload.userOrders;
      })

      .addCase(cancelUserOrdersAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.order = action.payload.order;
      })

      .addCase(requstRefundUserOrderAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.order = action.payload.order;
      })

      // view order
      .addCase(getOrderByIdAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.order = action.payload.order;
      })

      .addCase(getItemByIdAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.item = action.payload.item;
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
          patchShipOrderAction,
          patchSellerCancelItemAction,
          patchSellerHandleRefundAction,
          fetchUserOrdersAction,
          cancelUserOrdersAction,
          requstRefundUserOrderAction,
          getOrderByIdAction,
          getItemByIdAction,
        ),
        (state) => {
          state.isPending = true;
          state.isSuccess = false;
          state.isRejected = false;
          state.error = null;
        },
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
          patchShipOrderAction,
          patchSellerCancelItemAction,
          patchSellerHandleRefundAction,
          fetchUserOrdersAction,
          cancelUserOrdersAction,
          requstRefundUserOrderAction,
          getOrderByIdAction,
          getItemByIdAction,
        ),
        (state, action) => {
          state.isPending = false;
          state.isSuccess = false;
          state.isRejected = true;
          state.error = action.payload || "Something went wrong";
        },
      );
  },
});

export default orderSlice.reducer;
