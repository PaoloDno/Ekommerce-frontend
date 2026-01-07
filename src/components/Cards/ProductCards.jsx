import { useNavigate } from "react-router-dom";
import ProductImages from "../ImagesComponent/components/ProductImageComponent";
import { FaStar } from "react-icons/fa";

const ProductCards = ({ product }) => {
  const {
    name,
    price,
    stock,
    brand,
    averageRating,
    numOfReviews,
    seller,
    category,
    productImage,
  } = product;

  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col rounded-xl bg-skin-colorContent shadow-sm text-skin-colorContent font-display
                 transition cursor-pointer pt-0 px-0 pb-2 w-full min-h-[320px] max-h-[380px] overflow-hidden"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* Image */}
      <div className="w-full h-[212px] flex justify-center items-center overflow-hidden">
        <ProductImages productImages={productImage} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 px-2 pt-1 h-[105px] overflow-hidden">
        {/* Product Name */}
        <span className="truncate font-semibold text-stylep3 leading-tight">
          {name}
        </span>

        {/* Rating Row */}
        <span className="grid grid-cols-[1fr_1.5fr] items-center space-x-1 text-stylep3 w-full px-1">
          <span className="flex flex-row items-center justify-start w-full">
            {averageRating || 0}
            <FaStar className="text-yellow-400 w-3 h-3" />
          </span>
          <span className="flex flex-row text-[0.75rem] items-center justify-end w-full text-end">
            ({numOfReviews || 0}) reviews
          </span>
        </span>

        <span className="grid grid-cols-[2fr_1fr] items-center space-x-1 text-stylep3 px-1">
          {/* Price */}
          <span className="text-skin-colorContent text-stylep3 font-bold w-full font-accent">
            ₱{price}
          </span>
          <span className="truncate text-stylep4 w-full justify-center items-center text-end">{category?.name}</span>
        </span>

        <span className="grid grid-cols-2 items-center space-x-1 text-stylep3 px-1">
          {/* Store + Category */}
          <span className="truncate text-stylep4 w-full">{seller?.storeName}</span>

          <span className="truncate text-stylep4 w-full text-end">{stock} -stocks</span>
        </span>
      </div>
    </div>
  );
};

export default ProductCards;