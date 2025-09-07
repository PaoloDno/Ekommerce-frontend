import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  createLinkCategoryAction,
  getCategoriesAction,
  getCategoriesIdAction,
  deleteCategoryAction,
} from "../actions/CategoryThunks";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    category,
    isPending: false,
    isRejected: false,
    isSuccess: false,
    error: null,
  },
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(createLinkCategoryAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.category = action.payload.category;
      })
      .addCase(getCategoriesAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.category = action.payload.category;
      })
      .addCase(getCategoriesIdAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.category = action.payload.category;
      })
      .addCase(deleteCategoryAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.category = action.payload.category;
      })
      .addMatcher(
        isPending(
          createLinkCategoryAction,
          getCategoriesAction,
          getCategoriesIdAction,
          deleteCategoryAction
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
          createLinkCategoryAction,
          getCategoriesAction,
          getCategoriesIdAction,
          deleteCategoryAction
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

export default categorySlice.reducer;