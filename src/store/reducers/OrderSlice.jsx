import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  createOrderAction,
  getUserOrdersAction,
  getOrdersByIdAction,
} from "../actions/OrderThunks";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {}, 
    orders: [],      
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

      .addMatcher(
        isPending(
          createOrderAction,
          getUserOrdersAction,
          getOrdersByIdAction
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
          getOrdersByIdAction
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
