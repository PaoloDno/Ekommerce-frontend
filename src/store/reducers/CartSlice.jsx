import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getCartAction,
  addToCartAction,
  removeFromCartAction,
  clearCartAction,
} from "../actions/CartThunks";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    isPending: false,
    isRejected: false,
    isSuccess: false,
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }

      state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = state.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = state.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.items = action.payload.items;
        state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalPrice = state.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
      })
      .addCase(addToCartAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.items = action.payload.items;
        state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalPrice = state.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
      })
      .addCase(removeFromCartAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.items = action.payload.items;
        state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalPrice = state.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
      })
      .addCase(clearCartAction.fulfilled, (state) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      })
      .addMatcher(
        isPending(getCartAction, addToCartAction, clearCartAction, removeFromCartAction),
        (state) => {
          state.isPending = true;
          state.isRejected = false;
          state.isSuccess = false;
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(getCartAction, addToCartAction, clearCartAction, removeFromCartAction),
        (state, action) => {
          state.isPending = false;
          state.isRejected = true;
          state.isSuccess = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
