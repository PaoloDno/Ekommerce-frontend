import A1 from "../images/products/productImage.jpg";
import A2 from "../images/products/productImageA2.jpg";
import A3 from "../images/products/productImageA3.jpg";
import A4 from "../images/products/productImageA4.jpg";

import B1 from "../images/otherProductsImages/productImagesA1.jpg";
import B2 from "../images/otherProductsImages/productImagesA2.jpg";
import B3 from "../images/otherProductsImages/productImagesA3.jpg";
import C1 from "../images/otherProductsImages/productImagesB1.jpg";
import C2 from "../images/otherProductsImages/productImagesB2.jpg";
import C3 from "../images/otherProductsImages/productImagesB3.jpg";

const ProductImages = ({ productImages }) => {
  let productSrc = "";

  switch ( productImages ) {
    case "A1":
      productSrc = A1;
      break;
    case "A2":
      productSrc = A2;
      break;
    case "A3":
      productSrc = A3;
      break;
    case "A4":
      productSrc = A4;
      break;
    case "B1":
      productSrc = B1;
      break;
    case "B2":
      productSrc = B2;
      break;
    case "B3":
      productSrc = B3;
      break;
    case "C1":
      productSrc = C1;
      break;
    case "C2":
      productSrc = C2;
      break;
    case "C3":
      productSrc = C3;
      break;
    default:
      productSrc = A1;
      break;
  }


  return (
    <div className="w-full h-full flex justify-center items-center">
      <img src={productSrc} alt="product-avatar" className="w-full h-full object-cover" />
    </div>
  )
}

export default ProductImages;