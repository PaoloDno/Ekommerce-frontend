import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getCartAction,
  addToCartAction,
  removeFromCartAction,
  clearCartAction,
  checkOutCartAction,
} from "../actions/CartThunks";

const cartSlice = createSlice({
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
      const existingItem = state.items.find((i) => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }

      state.totalQuantity = state.items.reduce(
        (sum, i) => sum + i.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, i) => sum + i.quantity * i.price,
        0
      );
    },

    minusItem: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i._id === itemId);

      if (existingItem) {
        existingItem.quantity = Math.max(existingItem.quantity - 1, 0); // ✅ cannot go below 0
        if (existingItem.quantity === 0) {
          state.items = state.items.filter((i) => i._id !== itemId);
        }
      }

      state.totalQuantity = state.items.reduce(
        (sum, i) => sum + i.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, i) => sum + i.quantity * i.price,
        0
      );
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((i) => i._id !== itemId);
      state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = state.items.reduce(
        (sum, i) => sum + i.quantity * i.price,
        0
      );
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

        const { cart, totalPrice, totalItems } = action.payload;

        state.items = cart.items || [];
        state.totalQuantity = totalItems || 0;
        state.totalPrice = totalPrice || 0;
      })

      .addCase(addToCartAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;

        const { cart } = action.payload;
        state.items = cart.items || [];
        state.totalQuantity = state.items.reduce(
          (sum, i) => sum + i.quantity,
          0
        );
        state.totalPrice = state.items.reduce(
          (sum, i) => sum + i.quantity * i.product?.price,
          0
        );
      })

      .addCase(removeFromCartAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;

        const { cart } = action.payload;
        state.items = cart.items || [];
        state.totalQuantity = state.items.reduce(
          (sum, i) => sum + i.quantity,
          0
        );
        state.totalPrice = state.items.reduce(
          (sum, i) => sum + i.quantity * i.product?.price,
          0
        );
      })

      .addCase(clearCartAction.fulfilled, (state) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      })

      .addCase(checkOutCartAction.fulfilled, (state) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      })

      .addMatcher(
        isPending(
          getCartAction,
          addToCartAction,
          removeFromCartAction,
          clearCartAction,
          checkOutCartAction
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
          getCartAction,
          addToCartAction,
          removeFromCartAction,
          clearCartAction,
          checkOutCartAction
        ),
        (state, action) => {
          state.isPending = false;
          state.isRejected = true;
          state.isSuccess = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export const { addItem, minusItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;