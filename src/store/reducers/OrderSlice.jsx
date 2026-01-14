import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  createOrderAction,
  getUserOrdersAction,
  getOrdersByIdAction,
  getSellerOrderAction,
} from "../actions/OrderThunks";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {}, 
    orders: [],
    storeOrders: {},      
    isPending: false,
    isRejected: false,
    isSuccess: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(createOrderAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.order = action.payload.order;
      })
      .addCase(getUserOrdersAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.orders = action.payload.orders;
      })

      .addCase(getOrdersByIdAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.order = action.payload.order;
      })

      
      .addCase(getSellerOrderAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.storeOrders = action.payload.storeOrders;
      })

      .addMatcher(
        isPending(
          createOrderAction,
          getUserOrdersAction,
          getOrdersByIdAction,
          getSellerOrderAction,
        ),
        (state) => {
          state.isPending = true;
          state.isSuccess = false;
          state.isRejected = false;
          state.error = null;
        }
      )

      .addMatcher(
        isRejected(
          createOrderAction,
          getUserOrdersAction,
          getOrdersByIdAction,
          getSellerOrderAction,
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
