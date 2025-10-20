import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  createReviewAction,
  getProductReviewsAction,
} from "../actions/ReviewThunks";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    review: {},
    reviews: [],
    isPending: false,
    isRejected: false,
    isSuccess: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(createReviewAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.review = action.payload.data;
      })
      .addCase(getProductReviewsAction.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.isRejected = false;
        state.reviews = action.payload.data;
      })
      .addMatcher(
        isPending(
          createReviewAction,
          getProductReviewsAction,
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
          createReviewAction,
          getProductReviewsAction,
        ),
        (state) => {
          state.isPending = false;
          state.isRejected = true;
          state.isSuccess = false;
          state.error = action.payload || "Something went wrong";
        }
      )
  }
});

export default reviewSlice.reducer;