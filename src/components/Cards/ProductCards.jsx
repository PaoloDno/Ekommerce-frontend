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
      className="flex flex-col rounded-xl bg-white shadow-sm 
                 hover:shadow-md transition cursor-pointer
                 p-3 w-full min-h-[320px] max-h-[380px] overflow-hidden"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* Image */}
      <div className="w-full h-[140px] flex justify-center items-center overflow-hidden">
        <ProductImages productImages={productImage} />
      </div>

      {/* Content */}
      <div className="mt-2 space-y-1 flex flex-col gap-1 text-gray-800">
        {/* Product Name */}
        <span className="truncate font-semibold text-stylep2 leading-tight">
          {name}
        </span>

        {/* Rating Row */}
        <span className="grid grid-cols-[1fr_2fr_2fr] items-center gap-1 text-stylep3">
          <span className="flex flex-row items-center justify-start">{averageRating || 0}
          <FaStar className="text-yellow-400 w-3 h-3" />
          </span>
          <span className="text-gray-500 text-[0.75rem]">
            ({numOfReviews || 0}) reviews
          </span>
        </span>

        {/* Price */}
        <span className="text-skin-colorContent text-stylep2 font-bold">
          ₱{price}
        </span>

        {/* Store + Category */}
        <span className="truncate text-stylep3 text-gray-600">
          {seller?.storeName} • {category?.name}
        </span>

        
        <span className="truncate text-stylep3 text-gray-700">
          In stocks - {stock}
        </span>
      </div>
    </div>
  );
};

export default ProductCards;
