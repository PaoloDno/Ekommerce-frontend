import React, { useState } from "react";
import { useDispatch } from "react-redux";

const ReviewForm = ({ onClose, onSubmit, productId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const CLEAN_TEXT = /^[^&<>"'/]*$/;
  const validateInput = () => CLEAN_TEXT.test(comment.trim());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    const numericRating = Number(rating);
    if (numericRating < 1 || numericRating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    if (!validateInput()) {
      setError("Invalid characters detected.");
      return;
    }

    onSubmit({ productId, rating: numericRating, comment });
    setRating("");
    setComment("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setRating("");
    setComment("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed font-Montserrat inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-skin-colorContent rounded-lg p-5 w-[90%] md:w-[400px] shadow-lg relative">
        <h2 className="text-styleh3 font-semibold mb-3 text-center text-gray-800">
          Leave a Review
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-stylep1">
          <div>
            <label htmlFor="rating" className="block text-skin-colorContent mb-1">
              Rating (1–5):
            </label>
            <input
              id="rating"
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border border-skin-colorBorder1 rounded-md w-full p-2 shadow-md"
            />
          </div>

          <div>
            <label htmlFor="comment" className="block text-skin-colorContent mb-1">
              Comment:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-skin-colorBorder1 rounded-md w-full p-2 h-24 shadow-md resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
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
