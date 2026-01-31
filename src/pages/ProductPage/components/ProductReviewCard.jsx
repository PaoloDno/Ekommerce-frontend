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
      className="flex flex-col w-full px-2 py-1 bg-skin-colorContent 
      text-skin-colorContent/40 text-stylep4 rounded-lg border-opacity-40 opacity-90
      border shadow-sm hover:shadow-md transition"
    >
      
      {/* Comment */}
      <p className="text-skin-colorContent text-stylep4 line-clamp-2 justify-start items-start min-h-[10vh]
        overflow-hidden border-2 border-gray-500 rounded-lg p-2 m-1">{comment}</p>
      {/* User Info + Rating */}
      <div className="flex items-start justify-start flex-row gap-1 bg-opacity-95">
        <div className="h-[30px] w-[30px] rounded-full overflow-hidden">
          <ProfileImage profileImage={user?.userAvatar || "A1"} />
        </div>
          <span className="font-semibold text-stylep3 text-skin-colorContent">{user?.username || "Anonymous"}</span>
          <div className="flex ml-auto items-center bg-black bg-opacity-30 px-2 py-1 rounded-full">{renderStars(rating)}</div>
      </div>

      
    </div>
  );
};

export default ProductReviewCardComponent;
