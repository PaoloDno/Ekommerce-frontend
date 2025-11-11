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
                 p-3 w-full min-h-[250px] max-h-[330px] overflow-hidden"
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
        <span className="flex items-center gap-1 text-stylep3">
          <span>{averageRating || 0}</span>
          <FaStar className="text-yellow-400 w-3 h-3" />
          <span className="text-gray-500 text-[0.75rem]">
            ({numOfReviews || 0})
          </span>
        </span>

        {/* Price */}
        <span className="text-skin-colorContent text-stylep2 font-bold">
          ₱{price}
        </span>

        {/* Store + Category */}
        <span className="truncate text-stylep3 text-gray-500">
          {seller?.storeName} • {category?.name}
        </span>
      </div>
    </div>
  );
};

export default ProductCards;
