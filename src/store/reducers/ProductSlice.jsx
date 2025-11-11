import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  createProductAction,
  getProductIdAction,
  updateProductAction,
  deleteProductAction,
  fetchProductsAction,
} from "../actions/ProductThunks";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    products: [],
    pagination: {},
    isPending: false,
    isRejected: false,
    isSuccess: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(createProductAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.product = action.payload.product;
      })
      .addCase(getProductIdAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.product = action.payload.product;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(updateProductAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.product = action.payload.product;
      })
      .addCase(deleteProductAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.product = action.payload.product;
      })
      .addMatcher(
        isPending(
          createProductAction,
          fetchProductsAction,
          getProductIdAction,
          updateProductAction,
          deleteProductAction
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
          createProductAction,
          fetchProductsAction,
          getProductIdAction,
          updateProductAction,
          deleteProductAction
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

export default productSlice.reducer;