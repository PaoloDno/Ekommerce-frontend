import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductImages from "../../../components/ImagesComponent/components/ProductImageComponent";
import { addToCartAction } from "../../../store/actions/CartThunks";

const AddCartForm = ({ onClose, product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const {
    _id,
    name,
    productImage,
    stock,
    seller,
    averageRating,
    description,
    price,
  } = product;

  const { storeName } = seller || " - ";

  const handleSubmit = async (e) => {
    e.preventDefault();
    let productId = _id;
    try {
    const resultAction = await dispatch(addToCartAction({productId, quantity}));
     if (addToCartAction.fulfilled.match(resultAction)) {
      console.log("Add to cart successful!", resultAction.payload);
    } else {
      console.log("Add to cart failed:", resultAction.error);
      return; 
    }

  } catch (error) {
    console.error("Unexpected error:", error);

  } finally {
    onClose();
  }
};

  const AddQuantity = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const SubsQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const validateQuantityInput = (value, stock) => {
    let val = Number(value);

    if (value === "") return "";
    if (isNaN(val)) return 1;

    if (val > stock) return stock;
    if (val < 1) return 1;

    return val;
  };

  return (
    <div className="fixed font-Montserrat inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-skin-colorContent text-skin-colorContent rounded-lg p-5 w-[90%] md:w-[400px] shadow-lg relative">
        <h2 className="text-styleh3 font-semibold mb-3 text-center text-skin-colorContent">
          Add Product to Cart
        </h2>

        <div className="flex flex-col gap-4">
       
          <div className="flex gap-3 items-center border p-3 rounded-lg bg-white shadow">
            <span className="h-[150px] w-[150px]">
              <ProductImages
                productImage={productImage}
              />
            </span>
            <div className="flex flex-col h-full text-stylep3">
              <p className="font-semibold text-stylep2">{name}</p>
              <p className="font-semibold opacity-90">{description}</p>
              <p className="font-semibold opacity-90">₱ {price}</p>
              <p className="font-semibold opacity-90">Stock: {stock}</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 text-stylep2"
          >
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={SubsQuantity}
                className="px-3 py-1 bg-skin-primary w-10 h-10 border-2 text-stylep1
                 border-skin-colorBorder1 text-skin-color1 rounded hover:bg-gray-300 hover:text-black hover:border-green-600"
              >
                -
              </button>

              <input
                type="number"
                className="w-16 text-center border rounded border-black py-1 text-stylep1"
                value={quantity}
                onChange={(e) => {
                  const newValue = validateQuantityInput(e.target.value, stock);
                  setQuantity(newValue);
                }}
              />

              <button
                type="button"
                onClick={AddQuantity}
                className="px-3 py-1 bg-skin-primary w-10 h-10 border-2 text-stylep1
                 border-skin-colorBorder1 text-skin-color1 rounded hover:bg-gray-300 hover:text-black hover:border-green-600"
              >
                +
              </button>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-2"
            >
              ADD TO CART
            </button>
          </form>

          <span className="flex w-full items-center">
         
            <button
              onClick={onClose}
              className="text-gray-600 mt-2 hover:text-gray-800 mx-auto text-sm"
            >
              CANCEL
            </button>
            <Link
              to={`/store/${seller._id}`}
              className="text-gray-600 mt-2 hover:text-gray-800 mx-auto text-sm truncate"
            >
              VISIT STORE
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddCartForm;
