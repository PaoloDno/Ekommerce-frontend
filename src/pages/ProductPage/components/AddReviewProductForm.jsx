import React, { useState } from "react";

const ReviewForm = ({ onClose, onSubmit, productId }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const CLEAN_TEXT = /^[^&<>"'/]*$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      return setError("Please fill out all fields.");
    }

    const numericRating = Number(rating);
    if (numericRating < 1 || numericRating > 5) {
      return setError("Rating must be between 1 and 5.");
    }

    if (!CLEAN_TEXT.test(comment.trim())) {
      return setError("Invalid characters detected.");
    }

    onSubmit({ productId, rating: numericRating, comment: comment.trim() });
    handleClose();
  };

  const handleClose = () => {
    setRating("");
    setComment("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 font-display">
      <div className="bg-skin-colorContent text-skin-colorContent rounded-lg p-4 w-[90%] max-w-[400px] shadow-lg">
        <h2 className="text-styleh4 font-semibold text-center mb-2">
          Leave a Review
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-stylep2">
          <div>
            <label className="block mb-1">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 rounded-md border bg-skin-buttonColor-1 text-skin-color1"
            >
              <option value="">Select rating</option>
              <option value="1">1 - Very poor</option>
              <option value="2">2 - Poor</option>
              <option value="3">3 - Average</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-24 p-2 rounded-md border bg-skin-buttonColor-1 text-skin-color1 resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-3 py-1 rounded-md bg-skin-red w-[120px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded-md bg-skin-green w-[120px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
