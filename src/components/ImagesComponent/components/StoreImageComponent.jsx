import S1 from "../images/stores/storeImage1.jpg";
import S2 from "../images/stores/storeImage2.jpg";
import S3 from "../images/stores/storeImage3.jpg";
import S4 from "../images/stores/storeImage4.jpg";
import S5 from "../images/stores/storeImage5.jpg";

const StoreImage = ({ storeImage }) => {
  let storeSrc;

  switch (storeImage) {
    case "S1":
      storeSrc = S1;
      break;
    case "S2":
      storeSrc = S2;
      break;
    case "S3":
      storeSrc = S3;
      break;
    case "S4":
      storeSrc = S4;
      break;
    case "S5":
      storeSrc = S5;
      break;
    default:
      storeSrc = S1;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <img src={storeSrc} alt="store-image" className="w-full h-full object-cover" />
    </div>
  )
}

export default StoreImage;