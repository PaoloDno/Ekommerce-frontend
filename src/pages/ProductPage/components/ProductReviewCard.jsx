import React from "react";
import ProfileImage from "../../../components/ImagesComponent/components/ProfileImageComponent";
import { FaStar, FaRegStar } from "react-icons/fa";

const ProductReviewCardComponent = ({ reviewId, comment, rating, user }) => {
  const renderStars = (ratingValue) => {
    const stars = [];
    const roundedRating = Math.floor(ratingValue);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= roundedRating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
  };

  return (
    <div
      key={reviewId}
      className="flex flex-col w-full p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
    >
      {/* User Info + Rating */}
      <div className="flex items-center flex-row gap-4 mb-2 text-skin-colorContent">
        <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
          <ProfileImage profileImage={user?.userAvatar || "A1"} />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-skin-colorContent">{user?.username || "Anonymous"}</span>
          <div className="flex items-center">{renderStars(rating)}</div>
        </div>
      </div>

      {/* Comment */}
      <p className="text-gray-700 text-sm border-t pt-2">{comment}</p>
    </div>
  );
};

export default ProductReviewCardComponent;
