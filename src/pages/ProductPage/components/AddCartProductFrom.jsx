import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductImages from "../../../components/ImagesComponent/components/ProductImageComponent";
import { addToCartAction } from "../../../store/actions/CartThunks";

const AddCartForm = ({ onClose, product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);

  const {
    _id: productId,
    name,
    productImage,
    stock,
    seller,
    description,
    price,
  } = product || {};

  const handleClose = () => {
    setQuantity(1);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const result = await dispatch(addToCartAction({ productId, quantity }));
      if (addToCartAction.fulfilled.match(result)) {
        navigate("/cart-user");
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
    } finally {
      handleClose();
    }
  };

  const changeQty = (delta) => {
  if (!stock) return;
  setQuantity((q) => {
    const next = q + delta;
    if (next < 1) return 1;
    if (next > stock) return stock;
    return next;
  });
};

const handleInput = (e) => {
  if (!stock) return;

  let val = Number(e.target.value);

  if (isNaN(val) || val < 1) val = 1;
  if (val > stock) val = stock;

  setQuantity(val);
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-40 font-display w-full h-full">
      <div className="flex flex-col bg-skin-colorContent text-skin-colorContent items-start justify-start rounded-lg p-5 w-[90%] max-w-[400px] shadow-lg">
        <h2 className="text-styleh4 font-semibold text-center mb-3 w-full">
          Add Product to Cart
        </h2>

          <div className="flex flex-row gap-1 items-center border h-[120px] py-2 px-1 rounded-lg bg-skin-buttonColor-1 text-skin-color1 w-full">
            <div className="w-[120px] h-[120px]">
              <ProductImages productImage={productImage} />
            </div>
            <div className="flex flex-col text-stylep4">
              <p className="font-semibold">{name}</p>
              <p className="opacity-90 line-clamp-2">{description}</p>
              <p className="opacity-90">₱ {price * quantity} - {"("}₱ {price}/item{")"}</p>
              <p className="opacity-90">Stock: {stock}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full py-2">
            <div className="flex justify-center items-center gap-3 text-stylep2">
              <button type="button" onClick={() => changeQty(-1)} className="bg-skin-buttonColor-1 text-skin-color1 in-center w-[20px] h-[20px] p-2 box-content">−</button>
              <input
                type="number"
                value={quantity}
                onChange={handleInput}
                className="w-[90px] text-center border rounded py-1 bg-skin-fill-4 text-skin-colorHigh in-center"
              />
              <button type="button" onClick={() => changeQty(1)} className="bg-skin-buttonColor-1 text-skin-color1 in-center w-[20px] h-[20px] p-2 box-content">+</button>
            </div>

            <button type="submit" className="bg-skin-cart text-skin-color1 py-2 rounded-md">
              ADD TO CART
            </button>
          </form>

          <div className="flex flex-row in-center text-stylep3 w-full gap-2">
            <button onClick={handleClose} className="opacity-80 in-center hover:opacity-100 rounded-sm bg-skin-red text-skin-color1 min-w-[110px]">
              CANCEL
            </button>
            <Link to={`/store/${seller?._id}`} className="flex opacity-70 hover:opacity-100 rounded-sm bg-skin-fill-3 text-skin-colorContent truncate min-w-[110px] in-center">
              VISIT STORE
            </Link>
          </div>
        </div>
    </div>
  );
};

export default AddCartForm;
