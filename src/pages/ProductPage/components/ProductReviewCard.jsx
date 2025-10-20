import React from "react"

const ProductReviewCardComponent = ( reviewId, comment, rating, user ) => {
  return (
    <div className="flex w-full flex-col items-start gap-8">
      <div className="flex relative w-full p-1 h-[120px] bg-inherit">
        <span className="banner">

        </span>
        <span></span>
        <div className="image"></div>
        <span>{/* rating */}</span>
      </div>
      <div>
        {/*comment */}
      </div>
      <span>

      </span>
    </div>
  )
};

export default ProductReviewCardComponent;